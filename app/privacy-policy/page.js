import Link from "next/link";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

// CHATGPT PROMPT TO GENERATE YOUR PRIVACY POLICY — replace with your own data

// 1. Go to https://chat.openai.com/
// 2. Copy paste bellow
// 3. Replace the data with your own (if needed)
// 4. Paste the answer from ChatGPT directly in the <pre> tag below

// You are an excellent lawyer.

// I need your help to write a simple privacy policy for my website. Here is some context:
// - Website: https://shipfa.st
// - Name: ShipFast
// - Description: A JavaScript code boilerplate to help entrepreneurs launch their startups faster
// - User data collected: name, email and payment information
// - Non-personal data collection: web cookies
// - Purpose of Data Collection: Order processing
// - Data sharing: we do not share the data with any other parties
// - Children's Privacy: we do not collect any data from children
// - Updates to the Privacy Policy: users will be updated by email
// - Contact information: marc@shipfa.st

// Please write a simple privacy policy for my site. Add the current date.  Do not add or explain your reasoning. Answer:

export const metadata = getSEOTags({
  title: `Privacy Policy | ${config.appName}`,
  canonicalUrlRelative: "/privacy-policy",
});

const PrivacyPolicy = () => {
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
          </svg>{" "}
          Back
        </a>
        <h1 className="text-3xl font-extrabold pb-6">
          Privacy Policy for {config.appName}
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap"
          style={{ fontFamily: "sans-serif" }}
        >
          {`Last Updated: September 11, 2024

At Datapick ("we," "our," "us"), we prioritize your privacy and are committed to protecting any personal information you share with us. This Privacy Policy outlines the types of data we collect, how we use it, and the steps we take to safeguard your data. By accessing or using our services, you consent to this Privacy Policy.

1. Information We Collect
We collect and process various types of data to provide and improve our services. The types of information we collect include:

1.1. Personal Information
This is information that identifies you as an individual or relates to an identifiable person. Examples include:

Contact Information: Name, email address, and phone number (if provided).
Account Information: Username, password, and preferences related to your account.
Payment Information: Credit card or bank details for processing payments.
We collect personal information when you register for our services, subscribe to our email alerts, or make payments for premium features.

1.2. Non-Personal Information
Non-personal information cannot be used to identify you and includes:

Browser Data: IP address, browser type, and language preferences.
Usage Data: Details about how you interact with our website and services, such as page visits, clicks, and time spent on the site.
Cookies and Tracking Technologies: Cookies, web beacons, and similar technologies that allow us to recognize your browser and device.
2. How We Use Your Information
We use the information we collect in the following ways:

2.1. Service Delivery
To provide, maintain, and improve the Datapick services.
To track product prices and notify you when a price drops, as per your preferences.
To manage your account and provide customer support.
2.2. Communication
To send service-related communications, including alerts, updates, and notifications.
To inform you about new features, offers, or promotions (you can opt out of marketing communications at any time).
2.3. Payment Processing
We use your payment information strictly for billing purposes and to process transactions related to your subscription plan or purchases.

2.4. Analytics and Improvements
We analyze user data to:

Improve the functionality, design, and content of our website.
Develop new services or features.
Monitor and enhance security on our platform.
3. Sharing Your Information
We take privacy seriously and limit the sharing of your data to trusted partners only when necessary.

3.1. Service Providers
We may share your information with third-party service providers that assist in delivering our services (e.g., payment processors, hosting providers). These third parties are required to maintain the confidentiality of your data and use it only for purposes of providing the agreed-upon services.

3.2. Legal Obligations
We may disclose your information if required to do so by law or in response to valid legal requests, such as court orders, subpoenas, or regulatory obligations.

3.3. Business Transfers
In the event of a merger, acquisition, or sale of all or part of our business, your information may be transferred to the acquiring entity. You will be notified of any such transfer and your rights regarding your information.

4. Data Security
We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These include:

Encryption: We use SSL encryption to protect data transmitted during payment transactions.
Access Control: We restrict access to your personal information to employees and contractors who need it to perform their job functions.
Data Storage: We store your personal data on secure servers.
However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.

5. Cookies and Tracking Technologies
We use cookies and similar tracking technologies to collect information about your browsing activities over time and across different websites. This helps us improve our services and personalize your experience. You can choose to disable cookies through your browser settings, though this may impact the functionality of our services.

6. Data Retention
We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law. Once your data is no longer needed, we will securely delete or anonymize it.

7. International Data Transfers
As Datapick is a global service, your personal data may be transferred to, stored, and processed in countries other than your own. By using our services, you consent to the transfer of your data to countries that may have different privacy regulations than your home jurisdiction. We will ensure that any such transfers comply with applicable data protection laws.

8. Your Rights
You have specific rights regarding your personal information, including:

Right to Access: You may request a copy of the personal data we hold about you.
Right to Rectification: You can ask us to correct any inaccurate or incomplete data.
Right to Deletion: You can request that we delete your personal information, subject to legal or contractual obligations.
Right to Restrict Processing: You can ask us to limit how we process your data under certain circumstances.
Right to Data Portability: You can request your personal data in a machine-readable format and transfer it to another service.
Right to Withdraw Consent: Where consent is required, you can withdraw it at any time, though this may impact your use of our services.
9. Children’s Privacy
Datapick is not intended for use by children under the age of 18. We do not knowingly collect personal information from children. If we discover that we have collected data from a child without proper parental consent, we will promptly delete that information.

10. Changes to This Privacy Policy
We reserve the right to update or modify this Privacy Policy at any time. If significant changes are made, we will notify you via email or through a prominent notice on our platform. Your continued use of Datapick after such changes constitutes your acceptance of the revised policy.

11. Contact Us
If you have any questions about this Privacy Policy or your data privacy, please contact us at:

${config.appName}
Email: support@mail.datapick.app

`}
        </pre>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
