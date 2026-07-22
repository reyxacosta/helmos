export type AuthFormState = {
  error?: string;
  fieldErrors?: Record<string, string[] | undefined>;
  success?: boolean;
  message?: string;
  /** Non-sensitive submitted values, echoed back so a failed submission
   * doesn't force the user to retype their email/name. Never include a
   * password here. */
  values?: Record<string, string>;
};

export const initialAuthFormState: AuthFormState = {};
