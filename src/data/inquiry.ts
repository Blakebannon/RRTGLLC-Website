/**
 * Project inquiry form on /contact, delivered by Web3Forms (https://web3forms.com).
 *
 * The browser posts directly to Web3Forms, which emails each submission to the
 * address the form was created with (blake.bannon@redrockstechnologygroup.com).
 * There is no server of our own involved.
 *
 * `accessKey` is a Web3Forms *public* form access key. It is designed to be
 * embedded in client-side code and is not a secret: it can only submit to this
 * one form. To rotate it or move delivery to another address, create or reset
 * the form in the Web3Forms dashboard and replace the value here.
 */
export const inquiryForm = {
  endpoint: "https://api.web3forms.com/submit",
  accessKey: "71e4e78a-a2c6-48b4-b1ac-191dc1a03cf4",
  /** Sender name shown in the notification email. */
  fromName: "RRTG Website Inquiry",
  subjectPrefix: "New RRTG Inquiry",
  /** Abandon a submission that has not completed after this long. */
  timeoutMs: 15000,
  maxLength: { name: 100, company: 150, email: 254, phone: 40, message: 5000 },
} as const;

/** Values are sent as-is, so they read clearly in the notification email. */
export const inquiryServices = [
  "Custom Software",
  "Artificial Intelligence",
  "Workflow Automation",
  "Web Development",
  "Ongoing Technology Support",
  "Not Sure Yet",
] as const;

export const inquiryBudgets = [
  "Under $2,500",
  "$2,500–$5,000",
  "$5,000–$10,000",
  "$10,000–$25,000",
  "$25,000+",
  "Not Sure Yet",
] as const;

/**
 * Email subject for a submission. Built only from the fixed service list, never
 * from free text, so visitors cannot inject arbitrary or oversized subjects.
 */
export function inquirySubject(service: unknown): string {
  const known = inquiryServices.find((s) => s === service);
  return known ? `${inquiryForm.subjectPrefix} — ${known}` : `${inquiryForm.subjectPrefix}`;
}
