import type { Metadata } from "next";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-bg text-fg p-8 lg:p-12">
      <div className="container max-w-2xl mx-auto">
        <h1 className="font-display font-bold text-2xl lg:text-3xl text-fg mb-8">
          Terms of Service
        </h1>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Acceptance of Terms</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            These Terms of Service ("Terms") govern your use of the portfolio website
            accessible at https://ankitdeshpande.dev (the "Site"), owned and operated by
            Ankit Deshpande. By accessing the Site, you accept these Terms. If you do
            not accept any part of these Terms, you may not access the Site.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Intellectual Property</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            All content included on this Site, such as but not limited to text, graphics,
            logos, images, and software, is the property of Ankit Deshpande or its content
            providers and is protected by applicable intellectual property laws. The
            compilation of all content on this Site is the exclusive property of
            Ankit Deshpande and is protected by applicable intellectual property laws.
          </p>
          <p className="text-fg-muted text-base leading-relaxed mt-4">
            You may not modify, publish, transmit, participate in the transfer or sale,
            create derivative works, or in any way exploit any of the content, in whole
            or in part, without express written permission from Ankit Deshpande.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">User Conduct</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            You are responsible for any content you post, upload, or transmit on or
            through the Site. By posting or transmitting any content, you represent that
            you have the right to do so and that such content does not violate any
            applicable law or the rights of any third party. Prohibited content includes,
            but is not limited to: content that is defamatory, obscene, offensive, or
            hateful; content that infringes on any patent, trademark, trade secret,
            copyright, or other proprietary rights; and content that contains software
            viruses, political campaigning, commercial solicitation, spam, or any other
            form of solicitation.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Limitation of Liability</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            To the maximum extent permitted by applicable law, Ankit Deshpande shall not
            be liable for any indirect, incidental, special, consequential, or punitive
            damages, or any loss of profits or revenues, whether incurred directly or
            indirectly, or any loss of data, use, goodwill, or other intangible losses,
            resulting from (i) your access to or use of the Site; (ii) any conduct or
            content on the Site of any third party; (iii) any content obtained from the
            Site; and (iv) unauthorized access, use, or alteration of your transmissions or
            content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Changes to Terms</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            Ankit Deshpande reserves the right, at its sole discretion, to modify or
            replace these Terms at any time. What constitutes a change will be
            determined at Ankit Deshpande's sole discretion. By continuing to access or
            use the Site after those changes become effective, you agree to be bound by
            the modified Terms. We will post notice of any changes on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-display font-semibold text-xl text-fg mb-4">Contact Us</h2>
          <p className="text-fg-muted text-base leading-relaxed">
            If you have any questions about these Terms, please contact us at
            {siteConfig.email}.
          </p>
        </section>
      </div>
    </main>
  );
}