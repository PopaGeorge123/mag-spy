import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR TERMS & SERVICES — replace with your own data 👇

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple Terms & Services for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Contact information: marc@shipfa.st
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - Ownership: when buying a package, users can download code to create apps. They own the code but they do not have the right to resell it. They can ask for a full refund within 7 day after the purchase.
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Link to privacy-policy: https://shipfa.st/privacy-policy
// - Governing Law: France
// - Updates to the Terms: users will be updated by email

// Please write a simple Terms & Services for my site. Add the current date. Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Terms and Conditions | ${config.appName}`,
  canonicalUrlRelative: "/tos",
});

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <a href="/" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </a>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: September 11, 2024

Welcome to MagSpy. These Terms and Conditions ("Terms") govern your use of our website and services ("Service"). By accessing or using MagSpy, you agree to be bound by these Terms. If you do not agree with these Terms, you should not use our Service.

1. Acceptance of Terms
By accessing or using our Service, you confirm that you are at least 18 years of age or have legal parental consent to use the Service. If you represent a business, you agree that you have the authority to bind the business to these Terms.

2. Description of Services
MagSpy offers a web-based service that allows users to track product prices and receive notifications about price changes. We provide the ability to customize alerts, view price trends, and access other features for individual and business use.

3. Account Registration
To use certain features of MagSpy, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.

4. Subscription Plans and Payments
MagSpy offers free and paid subscription plans. If you subscribe to a paid plan, you agree to provide accurate payment information and authorize us to charge you for any recurring subscription fees. Failure to provide accurate information may result in the termination of your account.

4.1. Billing Cycle
Paid subscriptions are billed on a monthly or annual basis, depending on the plan chosen. By subscribing, you agree that all fees are non-refundable, except as expressly provided in these Terms or required by law.

4.2. Cancellations
You may cancel your subscription at any time, but cancellation will not result in a refund of any fees paid. Upon cancellation, you will retain access to paid features until the end of your current billing cycle.

5. License to Use
We grant you a limited, non-exclusive, non-transferable license to access and use MagSpy for personal or business use in compliance with these Terms. This license does not allow you to:

Resell or redistribute the Service or any portion thereof.
Reverse-engineer or attempt to derive the source code of the Service.
Use MagSpy in any unlawful manner.
6. User Responsibilities
You agree to use MagSpy in compliance with all applicable laws and regulations. You will not:

Use the Service for fraudulent or unauthorized purposes.
Interfere with or disrupt the Service's functionality.
Collect data from the Service without consent or permission.
Engage in activities that harm the operation, integrity, or security of MagSpy.
7. Intellectual Property
All content, trademarks, logos, and software on MagSpy are the property of MagSpy or its licensors and are protected by intellectual property laws. You agree not to copy, modify, distribute, or create derivative works of any content available through the Service without our express written consent.

8. Third-Party Links
MagSpy may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of these third parties. You acknowledge and agree that MagSpy shall not be liable for any loss or damage caused by your use of or reliance on such third-party content.

9. Termination
We reserve the right to suspend or terminate your account and access to the Service at any time for any reason, including if you violate these Terms. Upon termination, your license to use MagSpy will immediately cease, and any remaining fees owed will become due.

10. Disclaimer of Warranties
MagSpy is provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or free from viruses or other harmful components.

To the maximum extent permitted by law, we disclaim all warranties, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.

11. Limitation of Liability
To the fullest extent permitted by law, MagSpy and its affiliates, officers, employees, and licensors will not be liable for any indirect, incidental, special, consequential, or punitive damages, including, but not limited to, loss of profits, data, or goodwill, arising out of or related to your use or inability to use the Service.

Our liability in connection with any claim related to the Service will be limited to the amount you paid for the Service in the 12 months preceding the claim.

12. Indemnification
You agree to indemnify, defend, and hold harmless MagSpy, its officers, directors, employees, and agents from any claims, liabilities, damages, losses, or expenses, including reasonable attorney's fees, arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.

13. Changes to the Terms
We reserve the right to modify these Terms at any time. Any changes will be posted on this page with an updated effective date. If the changes significantly affect your rights, we will notify you via email or platform notices. Your continued use of MagSpy after the changes are made constitutes your acceptance of the new Terms.

14. Governing Law
These Terms are governed by and construed in accordance with the laws of Romania, without regard to its conflict of law principles. Any disputes arising out of or relating to these Terms shall be resolved in the courts of Romania.

15. Dispute Resolution
In the event of a dispute, you agree to first attempt to resolve the issue informally by contacting us at [Insert Contact Information]. If the issue cannot be resolved within 30 days, you agree to submit the dispute to binding arbitration, except where prohibited by law.

16. Miscellaneous
Entire Agreement: These Terms constitute the entire agreement between you and MagSpy and supersede any prior agreements.
Severability: If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions will remain in full force and effect.
Waiver: Failure to enforce any provision of these Terms will not be considered a waiver of our rights.
17. Contact Us
If you have any questions about these Terms, please contact us at:

${config.appName}
Email: support@mail.MagSpy.app
`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
