const PLACEHOLDERS = Object.freeze({
  phone: "[phone number hidden]",
  email: "[email hidden]",
  address: "[address hidden]",
  link: "[link hidden]",
  payment: "[payment details hidden]"
});

const EMAIL_REGEX = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const URL_REGEX = /\b(?:https?:\/\/|www\.)[^\s]+/gi;
const SHORT_LINK_REGEX = /\b(?:bit\.ly|t\.co|tinyurl\.com|goo\.gl|ow\.ly|is\.gd|buff\.ly|rebrand\.ly)\/[^\s]+/gi;
const DOMAIN_REGEX = /\b(?![A-Z0-9._%+-]+@)[a-z0-9.-]+\.(?:com|co\.uk|org|net|io|app|me|ly|dev|uk)(?:\/[^\s]*)?/gi;
const SOCIAL_PLATFORM_REGEX = /\b(?:facebook|instagram|whatsapp|telegram|snapchat|tiktok|x|twitter|messenger)\b/gi;
const PHONE_CANDIDATE_REGEX = /(?<!\w)(?:\+?\d[\d\s().-]{7,}\d)(?!\w)/g;
const UK_POSTCODE_REGEX = /\b(?:GIR\s?0AA|[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})\b/gi;
const ADDRESS_VALUE_REGEX = /(\b(?:my\s+)?address\s*(?:is|:)\s*)([^.!?\n]+)/gi;
const STREET_ADDRESS_REGEX = /\b\d{1,4}[A-Z0-9\s,'-]{0,40}\b(?:street|st\.?|road|rd\.?|avenue|ave|lane|ln|drive|dr\.?|close|court|crescent|place|way)\b(?:,\s*[A-Z\s'-]{2,30})?(?:\s+[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})?/gi;
const IBAN_REGEX = /\b[A-Z]{2}\d{2}[A-Z0-9]{11,30}\b/gi;
const PAYMENT_KEYWORD_REGEX = /\b(?:paypal|revolut|bank transfer|wire transfer|sort code|account number|account no\.?|iban)\b/gi;
const SORT_CODE_REGEX = /\b\d{2}[- ]?\d{2}[- ]?\d{2}\b/g;
const ACCOUNT_NUMBER_REGEX = /\b\d{6,10}\b/g;

function createFlags() {
  return {
    phone: false,
    email: false,
    address: false,
    link: false,
    payment: false
  };
}

function looksLikePhone(candidate) {
  const digits = candidate.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function replacePhones(text, flags) {
  return text.replace(PHONE_CANDIDATE_REGEX, (match) => {
    if (!looksLikePhone(match)) {
      return match;
    }
    flags.phone = true;
    return PLACEHOLDERS.phone;
  });
}

function replaceAddresses(text, flags) {
  let next = text.replace(ADDRESS_VALUE_REGEX, (_, prefix) => {
    flags.address = true;
    return `${prefix}${PLACEHOLDERS.address}`;
  });

  next = next.replace(STREET_ADDRESS_REGEX, () => {
    flags.address = true;
    return PLACEHOLDERS.address;
  });

  next = next.replace(UK_POSTCODE_REGEX, (postcode, offset, source) => {
    const windowStart = Math.max(0, offset - 40);
    const windowEnd = Math.min(source.length, offset + postcode.length + 40);
    const context = source.slice(windowStart, windowEnd);
    const hasAddressCue = /\b(?:address|flat|house|street|st\.?|road|rd\.?|avenue|ave|lane|ln|drive|dr\.?|close|court|crescent|place|way)\b/i.test(context);

    if (!hasAddressCue) {
      return postcode;
    }

    flags.address = true;
    return PLACEHOLDERS.address;
  });

  return next;
}

function replacePaymentDetails(text, flags) {
  let next = text.replace(IBAN_REGEX, () => {
    flags.payment = true;
    return PLACEHOLDERS.payment;
  });

  next = next.replace(PAYMENT_KEYWORD_REGEX, () => {
    flags.payment = true;
    return PLACEHOLDERS.payment;
  });

  next = next.replace(SORT_CODE_REGEX, (match, offset, source) => {
    const context = source.slice(Math.max(0, offset - 20), Math.min(source.length, offset + match.length + 30));
    if (!/\bsort\s*code\b/i.test(context)) {
      return match;
    }
    flags.payment = true;
    return PLACEHOLDERS.payment;
  });

  next = next.replace(ACCOUNT_NUMBER_REGEX, (match, offset, source) => {
    const context = source.slice(Math.max(0, offset - 30), Math.min(source.length, offset + match.length + 30));
    if (!/\baccount\s*(?:number|no\.?)\b/i.test(context)) {
      return match;
    }
    flags.payment = true;
    return PLACEHOLDERS.payment;
  });

  return next;
}

export function sanitizeMessage(text) {
  const source = String(text ?? "");
  const flags = createFlags();
  let sanitizedText = source;

  sanitizedText = sanitizedText.replace(EMAIL_REGEX, () => {
    flags.email = true;
    return PLACEHOLDERS.email;
  });
  sanitizedText = sanitizedText.replace(URL_REGEX, () => {
    flags.link = true;
    return PLACEHOLDERS.link;
  });
  sanitizedText = sanitizedText.replace(SHORT_LINK_REGEX, () => {
    flags.link = true;
    return PLACEHOLDERS.link;
  });
  sanitizedText = sanitizedText.replace(DOMAIN_REGEX, () => {
    flags.link = true;
    return PLACEHOLDERS.link;
  });
  sanitizedText = sanitizedText.replace(SOCIAL_PLATFORM_REGEX, () => {
    flags.link = true;
    return PLACEHOLDERS.link;
  });
  sanitizedText = replacePhones(sanitizedText, flags);
  sanitizedText = replaceAddresses(sanitizedText, flags);
  sanitizedText = replacePaymentDetails(sanitizedText, flags);

  return {
    sanitizedText,
    flags
  };
}

export function hasProtectionHit(text) {
  return Object.values(sanitizeMessage(text).flags).some(Boolean);
}
