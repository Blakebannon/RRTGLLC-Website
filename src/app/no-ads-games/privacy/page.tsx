import Link from "next/link";
import { mailto, site } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";
import { LegalPage } from "@/components/sections/LegalPage";
import { EmailAddress } from "@/components/ui/EmailAddress";

const path = "/no-ads-games/privacy";

export const metadata = pageMetadata({
  title: "NO-ADS GAMES Privacy Policy",
  description: `Privacy policy for NO-ADS GAMES Android apps by ${site.legalName}. Learn about local game saves, offline play, purchases, and data practices.`,
  path,
});

export default function NoAdsGamesPrivacyPage() {
  return (
    <LegalPage title="NO-ADS GAMES Privacy Policy" path={path} updated="November 4, 2026" dateLabel="Effective date">
      <p>
        <strong>Operated by {site.legalName}.</strong> This policy applies to our NO-ADS GAMES Android applications,
        including Solitaire, Sudoku, Chess, Minesweeper, Mahjong, and future NO-ADS GAMES titles that follow the same
        practices. Our <Link href="/privacy">website privacy policy</Link> separately covers visits to this website
        and inquiries sent to us.
      </p>

      <h2>Our privacy commitment</h2>
      <p>NO-ADS GAMES creates simple, premium mobile games that respect your privacy.</p>
      <p>Our philosophy is straightforward: You purchase a game, you play the game, and your personal information remains yours.</p>
      <p>Our mobile games do not collect, transmit, sell, or share your personal information.</p>

      <h2>Information we collect</h2>
      <p>Our mobile games do not collect personal information.</p>
      <p>
        We do not collect your name, email address, phone number, location, contacts, device identifiers, advertising
        identifiers, or gameplay analytics through the games.
      </p>
      <p>We do not use advertising networks, tracking technologies, or analytics services within our games.</p>

      <h2>Game progress and local storage</h2>
      <p>
        Our games may save your progress, preferences, difficulty settings, completion statistics, or saved games
        locally on your device. The games do not send that information to {site.legalName} or our servers.
      </p>
      <p>
        You can remove locally stored game data using the applicable options provided by your device or application.
        Your Android device may also offer operating-system backup of app data under your device settings; this is
        separate from any cloud synchronization by our games.
      </p>

      <h2>Internet access</h2>
      <p>Our games are designed to function entirely offline. No internet connection is required to play.</p>
      <p>We do not operate gameplay servers or require accounts or registration.</p>

      <h2>Advertising and purchases</h2>
      <p>Our games contain no advertisements, subscriptions, or in-app purchases.</p>
      <p>
        Games are purchased through Google Play. Google independently processes purchases, downloads, and related
        store activity under its own terms and privacy policy. We do not receive payment card information through our
        games.
      </p>

      <h2>Data sharing and sale</h2>
      <p>
        We do not sell, rent, trade, or share personal information collected through our games because our games do
        not collect personal information.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>Our games do not knowingly collect personal information from children or adults.</p>
      <p>Our games do not contain advertising, social networking, or user-to-user communications.</p>

      <h2>Data security and retention</h2>
      <p>
        Because our games do not transmit personal information to our systems, we do not maintain databases of
        players&apos; personal information or gameplay activity. Locally stored game information is managed through
        your device and operating system, as described above.
      </p>

      <h2>Changes to this policy</h2>
      <p>If our games&apos; privacy practices change, we will update this policy and its effective date.</p>
      <p>
        We will not introduce personal data collection or tracking without first updating applicable disclosures and
        complying with relevant requirements.
      </p>

      <h2>Contact</h2>
      <p>
        For questions about this policy, contact {site.legalName} at{" "}
        <a href={mailto("NO-ADS GAMES Privacy Question")}><EmailAddress /></a>.
      </p>
    </LegalPage>
  );
}
