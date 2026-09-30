import { mailto, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";
import { EmailAddress } from "@/components/ui/EmailAddress";

/*
 * Starting document describing how this website currently works technically.
 * It is not legal advice; have it reviewed by counsel before relying on it,
 * and update it whenever analytics, forms or other data processing change.
 */

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.legalName} handles information in connection with this website and email inquiries.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy" updated="September 30, 2026">
      <p>
        This policy explains how {site.legalName} (&ldquo;Red Rocks Technology Group,&rdquo; &ldquo;we&rdquo; or
        &ldquo;us&rdquo;) handles information in connection with this website and with inquiries you send us. We aim to
        collect as little personal information as possible.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you send us.</strong> This website does not have user accounts or newsletter sign-ups.
        If you submit the project inquiry form on our Contact page or email us, we receive the information you choose
        to include, such as your name, email address, company, phone number and details about your project.
      </p>
      <p>
        <strong>Inquiry form.</strong> When you voluntarily submit the project inquiry form, the information you enter
        is transmitted to Web3Forms, a third-party form delivery service, for the purpose of delivering your inquiry to
        us by email. Submitting the form does not subscribe you to any mailing list. Please do not include passwords,
        payment card details or other sensitive information in the form.
      </p>
      <p>
        <strong>Technical information.</strong> Like most websites, our hosting and content delivery provider
        processes technical information needed to deliver pages and protect the site, such as IP address, browser
        type, the pages requested and the time of the request. This information is used for operating and securing
        the website.
      </p>
      <p>
        <strong>Cookies and analytics.</strong> We do not use advertising or cross-site tracking cookies. If we use
        website analytics, we use privacy-focused, cookieless tools that report aggregate information such as page
        views and referring sites, without identifying individual visitors.
      </p>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiry and communicate with you about a potential or active project.</li>
        <li>To provide, maintain and secure this website.</li>
        <li>To understand, in aggregate, how the website is used so we can improve it.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We share information only with service providers that help us
        operate, such as our website hosting and email providers and the form delivery service described above, and only as needed for them to provide those
        services. We may also disclose information when required by law or to protect our rights and the security of
        our systems.
      </p>

      <h2>Retention</h2>
      <p>
        We keep correspondence for as long as it is useful for the relationship or project it relates to, or as
        required for legal, accounting or security purposes. You may ask us to delete correspondence that we are not
        required to retain.
      </p>

      <h2>Your choices</h2>
      <p>
        You can contact us to ask what personal information we hold about you, to request corrections or to request
        deletion. Depending on where you live, you may have additional rights under applicable privacy law, and we
        will respond to requests as those laws require.
      </p>

      <h2>Children</h2>
      <p>This website is intended for businesses and is not directed to children under 13.</p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as the website or our practices change. The date at the top of this page shows when
        it was last revised.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={mailto("Privacy Question - Red Rocks Technology Group")}><EmailAddress /></a>.
      </p>
    </LegalPage>
  );
}
