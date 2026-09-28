import { site } from "@/data/site";

/**
 * The business email address, with a line-break opportunity before "@" so
 * narrow screens wrap it cleanly instead of mid-word.
 */
export function EmailAddress({ email = site.email }: { email?: string }) {
  const at = email.indexOf("@");
  return (
    <>
      {email.slice(0, at)}
      <wbr />
      {email.slice(at)}
    </>
  );
}
