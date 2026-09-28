import { mailto, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";
import { EmailAddress } from "@/components/ui/EmailAddress";

/*
 * Starting document covering use of this marketing website only. Client
 * engagements are governed by separate written agreements. This is not legal
 * advice; have it reviewed by counsel, who should also confirm governing law.
 */

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms governing use of the ${site.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="September 28, 2026">
      <p>
        These terms govern your use of this website, operated by {site.legalName} (&ldquo;Red Rocks Technology
        Group,&rdquo; &ldquo;we&rdquo; or &ldquo;us&rdquo;). By using the website, you agree to these terms. If you do
        not agree, please do not use the website.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content on this website is provided for general information about our company and services. We work to
        keep it accurate and current, but it may not reflect every detail of our services at any given time.
      </p>

      <h2>Pricing and proposals</h2>
      <p>
        Prices shown on this website are starting points intended to indicate typical scale. They are not quotes or
        offers. The scope, price and terms of any project are established in a written proposal or agreement, and
        that agreement governs the engagement.
      </p>

      <h2>Client engagements</h2>
      <p>
        Services we provide to clients are governed by separate written agreements. Nothing on this website creates a
        client relationship, and sending us an email does not create any obligation for either party.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The website&apos;s design, text, graphics and code are owned by {site.legalName} or used with permission, and
        are protected by applicable intellectual property laws. You may view and share pages for personal or internal
        business reference, but you may not copy, modify or republish the website&apos;s content or design without
        our written permission.
      </p>

      <h2>Acceptable use</h2>
      <p>
        You agree not to misuse the website, including by attempting to gain unauthorized access, interfering with its
        operation, or using automated means to extract content in a way that burdens the site.
      </p>

      <h2>Third-party links</h2>
      <p>
        The website may link to websites operated by others. We are not responsible for their content or practices.
      </p>

      <h2>Disclaimer</h2>
      <p>
        The website is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the extent permitted by law, we
        disclaim warranties of any kind regarding the website, including implied warranties of merchantability,
        fitness for a particular purpose and non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, {site.legalName} is not liable for indirect, incidental, special or
        consequential damages arising from your use of, or inability to use, this website.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top of this page shows when they were last
        revised. Continued use of the website after changes means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={mailto("Terms Question - Red Rocks Technology Group")}><EmailAddress /></a>.
      </p>
    </LegalPage>
  );
}
