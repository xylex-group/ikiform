/** Better Auth `error.message` may be a string or a structured RawError — normalize for UI. */
export function authErrorMessage(message: unknown, fallback: string): string {
  return typeof message === "string" ? message : fallback;
}
