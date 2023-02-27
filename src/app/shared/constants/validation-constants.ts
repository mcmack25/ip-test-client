export class ValidationConstants {
  static readonly REQUIRED_MESSAGE = `Required.`;
  static readonly INCORRECT_EMAIL_MESSAGE = `Invalid email format.`;
  static readonly maxCharLimitMessage = (limit: number): string =>
    `Exceeds character limit (${limit}).`;
}
