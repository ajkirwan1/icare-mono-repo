const STORAGE_KEY = "icare:e2ee:keys:v1";

function bytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function loadKeyMap() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveKeyMap(map) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function hasConversationKey(conversationId) {
  const map = loadKeyMap();
  return Boolean(map[conversationId]);
}

export async function generateConversationKey(conversationId) {
  const key = await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );

  const raw = await crypto.subtle.exportKey("raw", key);
  const keyBase64 = bytesToBase64(new Uint8Array(raw));
  const map = loadKeyMap();
  map[conversationId] = keyBase64;
  saveKeyMap(map);

  return keyBase64;
}

async function importConversationKey(conversationId) {
  const map = loadKeyMap();
  const keyBase64 = map[conversationId];
  if (!keyBase64) {
    throw new Error("MISSING_LOCAL_KEY");
  }

  const rawBytes = base64ToBytes(keyBase64);
  return crypto.subtle.importKey(
    "raw",
    rawBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(conversationId, plaintext) {
  const key = await importConversationKey(conversationId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintextBytes = new TextEncoder().encode(plaintext);
  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    plaintextBytes
  );

  // TODO: Replace local per-device key storage with proper key exchange
  // (e.g. Signal Protocol) so each participant gets the same conversation key.
  return {
    bodyEncrypted: bytesToBase64(new Uint8Array(encryptedBuffer)),
    iv: bytesToBase64(iv)
  };
}

export async function decryptMessage(conversationId, bodyEncrypted, ivBase64) {
  const key = await importConversationKey(conversationId);
  const encryptedBytes = base64ToBytes(bodyEncrypted);
  const iv = base64ToBytes(ivBase64);
  const plaintextBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedBytes
  );

  return new TextDecoder().decode(plaintextBuffer);
}

export function containsOffPlatformContact(text) {
  if (!text) {
    return false;
  }

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  const phoneRegex = /(?:\+?\d[\d\s().-]{7,}\d)/;
  const addressKeywordRegex = /\b(address|street|st\.|road|rd\.|avenue|ave|postcode|zip)\b/i;
  const socialRegex = /\b(facebook|instagram|whatsapp|telegram|snapchat|tiktok|x|twitter|messenger)\b/i;

  return emailRegex.test(text) || phoneRegex.test(text) || addressKeywordRegex.test(text) || socialRegex.test(text);
}

export function maskOffPlatformContact(text) {
  if (!text) {
    return text;
  }

  const maskedEmail = text.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email hidden]");
  const maskedPhone = maskedEmail.replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[phone number hidden]");
  const maskedAddress = maskedPhone.replace(
    /\b(?:address|street|st\.|road|rd\.|avenue|ave|postcode|zip)\b[^\n,]*/gi,
    "[address hidden]"
  );
  return maskedAddress.replace(
    /\b(?:facebook|instagram|whatsapp|telegram|snapchat|tiktok|x|twitter|messenger)\b/gi,
    "[link hidden]"
  );
}
