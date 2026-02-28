const URL_REGEX = /\b(?:https?:\/\/|www\.)[^\s]+/gi;
const DOMAIN_REGEX = /\b[a-z0-9.-]+\.(?:com|co\.uk|org|net|io|app|me|ly|dev)(?:\/[^\s]*)?/gi;
const SHORT_LINK_REGEX = /\b(?:bit\.ly|t\.co|tinyurl\.com|goo\.gl)\/[^\s]+/gi;
const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const PHONE_CANDIDATE_REGEX = /(?<!\w)(?:\+?\d[\d\s().-]{6,}\d)(?!\w)/g;
const UK_POSTCODE_REGEX = /\b(?:GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})\b/gi;
const ADDRESS_LINE_REGEX = /\b(?:flat|house|street|st\.|road|rd\.|avenue|ave|lane|ln|drive|dr|postcode|address|adres)\b[^,\n]*/gi;
const SOCIAL_REGEX = /\b(?:whatsapp|telegram|facebook|instagram|dm me|message me on|my number is|call me)\b/gi;
const PAYMENT_REGEX = /\b(?:paypal|revolut|bank transfer|sort code|account number|iban|pay me directly|wire transfer|cash)\b/gi;

function uniqueFlags(flags) {
  return Object.fromEntries(Object.entries(flags).map(([key, value]) => [key, Boolean(value)]));
}

function looksLikePhone(candidate) {
  const digits = candidate.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function maskPhones(text) {
  return text.replace(PHONE_CANDIDATE_REGEX, (match) => {
    if (!looksLikePhone(match)) {
      return match;
    }
    return "[telefon ukryty]";
  });
}

function hasAddressSignal(text) {
  const hasKeyword = /\b(?:flat|house|street|st\.|road|rd\.|avenue|ave|lane|ln|drive|dr|postcode|address|adres)\b/i.test(text);
  const hasPostcode = UK_POSTCODE_REGEX.test(text);
  UK_POSTCODE_REGEX.lastIndex = 0;
  return hasKeyword && hasPostcode;
}

export function sanitizeMessage(text) {
  const source = String(text ?? "");
  const phoneCandidates = source.match(PHONE_CANDIDATE_REGEX) || [];
  const hasPhone = phoneCandidates.some(looksLikePhone);
  PHONE_CANDIDATE_REGEX.lastIndex = 0;

  const flags = uniqueFlags({
    phone: hasPhone,
    email: EMAIL_REGEX.test(source),
    address: hasAddressSignal(source),
    link: URL_REGEX.test(source) || DOMAIN_REGEX.test(source) || SHORT_LINK_REGEX.test(source),
    payment: PAYMENT_REGEX.test(source),
    social: SOCIAL_REGEX.test(source)
  });

  EMAIL_REGEX.lastIndex = 0;
  URL_REGEX.lastIndex = 0;
  DOMAIN_REGEX.lastIndex = 0;
  SHORT_LINK_REGEX.lastIndex = 0;
  PAYMENT_REGEX.lastIndex = 0;
  SOCIAL_REGEX.lastIndex = 0;

  let sanitizedText = source;
  sanitizedText = sanitizedText.replace(EMAIL_REGEX, "[email ukryty]");
  sanitizedText = sanitizedText.replace(URL_REGEX, "[link ukryty]");
  sanitizedText = sanitizedText.replace(SHORT_LINK_REGEX, "[link ukryty]");
  sanitizedText = sanitizedText.replace(DOMAIN_REGEX, "[link ukryty]");
  sanitizedText = maskPhones(sanitizedText);
  sanitizedText = sanitizedText.replace(UK_POSTCODE_REGEX, "[adres ukryty]");
  sanitizedText = sanitizedText.replace(ADDRESS_LINE_REGEX, "[adres ukryty]");
  sanitizedText = sanitizedText.replace(PAYMENT_REGEX, "[dane płatności ukryte]");
  sanitizedText = sanitizedText.replace(SOCIAL_REGEX, "[kontakt poza platformą ukryty]");

  return {
    sanitizedText,
    flags,
    blocked: Object.values(flags).some(Boolean)
  };
}

export function hasProtectionHit(text) {
  return sanitizeMessage(text).blocked;
}
