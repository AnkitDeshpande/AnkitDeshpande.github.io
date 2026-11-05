import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-bg text-fg p-8 lg:p-12">
      <div className="container max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-8">
          Privacy Policy
        </h1>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Information We Collect</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            I do not collect any personally identifiable information ("PII") through this
            website. The Site is a static portfolio with no analytics trackers, cookies
            beyond essential functionality, or data collection mechanisms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Cookies</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            The Site uses only essential, session-based cookies necessary for the dark/light
            theme toggle and navigation state. These cookies are strictly necessary for the
            Site to function and do not track browsing activity across other websites.
            You can disable cookies in your browser settings, though certain features of the
            Site may not function correctly without them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">External Links</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            The Site contains links to third-party websites, including GitHub, LinkedIn, and
            email clients. These third-party sites have their own privacy policies and data
            collection practices. I encourage you to review the privacy policies of any
            third-party websites you visit.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Data Retention</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            As I do not collect any personal data, there is no data retention policy to
            disclose. No information is stored, logged, or retained by this Site unless you
            voluntarily provide it through the contact form, in which case it is processed
            solely for the purpose of responding to your message and then deleted.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Security</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            I implement appropriate data collection, storage, and processing practices and
            security measures to protect against unauthorized access, alteration, disclosure,
            or destruction of personal data. However, no method of transmission over the
            Internet, or method of electronic storage, is 100% secure. While I strive to
            use commercially acceptable means to protect your personal data, I cannot
            guarantee its absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Children's Privacy</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            The Site does not address anyone under the age of 13. I do not knowingly collect
            personal identifiable information from children under 13. If you are a parent or
            guardian and you are aware that your child has provided us with personal data,
            please contact me at {siteConfig.email} so that I can take the necessary steps.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Changes to this Privacy Policy</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            I may update our Privacy Policy from time to time. I will post any changes on
            this page and will notify you of any material changes by updating the "Last
            updated" date at the top of this page. You are advised to review this Privacy
            Policy periodically for any changes. Changes to this Privacy Policy are
            effective when they are posted on this page.
          </p>
        </section>

        <section>
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Last Updated</h2>
          <p className="text-fg-muted text-sm">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        </section>
      </div>
    </main>
  );
}