/** Форматирует ввод в маску +7 (___) ___-__-__ */
export function formatRuPhoneInput(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("8")) {
    digits = "7" + digits.slice(1);
  }
  if (digits.length > 0 && !digits.startsWith("7")) {
    digits = "7" + digits;
  }
  digits = digits.slice(0, 11);
  const n = digits.slice(1);
  if (n.length === 0) {
    return "+7 ";
  }
  let out = "+7 (";
  out += n.slice(0, 3);
  if (n.length >= 4) {
    out += ") " + n.slice(3, 6);
  }
  if (n.length >= 7) {
    out += "-" + n.slice(6, 8);
  }
  if (n.length >= 9) {
    out += "-" + n.slice(8, 10);
  }
  return out;
}

/** true, если введён полный номер: +7 и 10 цифр после */
export function isRuPhoneComplete(formatted: string): boolean {
  const digits = formatted.replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("7");
}
