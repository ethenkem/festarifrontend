import Header from '@/components/layout/Header';
import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-foreground font-sans py-12">
      <Header />
      <div className="container pt-[10%] md:pt-[5%]">
        <h1 className="text-4xl font-display font-bold mb-2 text-festari-accent">
          Privacy Policy for Festari Group Ltd.
        </h1>
        <p className="text-sm text-muted-foreground mb-1">
          Effective Date: November 26, 2024
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          Last Updated: May 05, 2025
        </p>

        {sections.map(({ number, title, content }, i) => (
          <Section key={i} number={number} title={title} content={content} />
        ))}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">8. Contact Us</h2>
          <p className="mb-3">
            For any privacy-related inquiries, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Email:</strong> info@festarigroup.com</li>
            <li><strong>Phone:</strong> +233 20 770 2157 / +233 54 160 3237 / +233 26 100 7835</li>
            <li><strong>Address:</strong> Office No. 4, Estate Hills Street, Tamso, Tarkwa, Ghana</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Section = ({
  number,
  title,
  content,
}: {
  number: string | number;
  title: string;
  content: React.ReactNode;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-festari-700">
      {number}. {title}
    </h2>
    <div className="text-base leading-relaxed space-y-2">{content}</div>
  </div>
);

export default PrivacyPolicy;

const sections = [
  {
    number: 1,
    title: 'Information We Collect',
    content: (
      <>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Personal Information:</strong>
            <ul className="list-disc list-inside ml-5">
              <li>Full name, contact address, phone number, email address</li>
              <li>ID documents or educational certificates</li>
              <li>Payment or billing information</li>
            </ul>
          </li>
          <li><strong>Automated Information:</strong>
            <ul className="list-disc list-inside ml-5">
              <li>IP address, browser type, device type</li>
              <li>Usage data from our websites, portals, forms, or apps</li>
            </ul>
          </li>
          <li><strong>Third-Party Information:</strong>
            <ul className="list-disc list-inside ml-5">
              <li>Information exchanged or stored via our secure collaboration and communication systems</li>
            </ul>
          </li>
        </ul>
      </>
    ),
  },
  {
    number: 2,
    title: 'How We Use Your Information',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Register you for training or consulting services</li>
        <li>Issue certificates, credentials, and communication</li>
        <li>Process payments and generate invoices</li>
        <li>Send you updates, newsletters, and offers</li>
        <li>Comply with legal and regulatory obligations</li>
        <li>Improve our digital systems and services</li>
      </ul>
    ),
  },
  {
    number: 3,
    title: 'Sharing of Information',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>With authorized service providers and partners supporting our operations</li>
        <li>With regulatory bodies when legally required</li>
        <li>Within Festari Group Ltd. and its subsidiaries</li>
      </ul>
    ),
  },
  {
    number: 4,
    title: 'Data Security',
    content: (
      <p>
        We implement appropriate security measures including encryption, secure servers,
        and limited access controls to protect your personal information from unauthorized
        access, alteration, or disclosure.
      </p>
    ),
  },
  {
    number: 5,
    title: 'Your Rights',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Access or update your personal information</li>
        <li>Withdraw consent to marketing communication</li>
        <li>Request deletion of your data, subject to legal obligations</li>
      </ul>
    ),
  },
  {
    number: 6,
    title: 'Third-Party Links',
    content: (
      <p>
        Our platforms may contain links to external sites not operated by us. We are not
        responsible for the privacy practices of those sites.
      </p>
    ),
  },
  {
    number: '7',
    title: 'Cookies and Tracking',
    content: (
      <p>
        Our websites may use cookies and similar tracking technologies for functionality
        and analytics. You can manage cookie preferences through your browser settings.
      </p>
    ),
  },
  {
    number: '7A',
    title: 'Compliance with GDPR and CPRA',
    content: (
      <>
        <p>
          We are committed to complying with data protection laws including the GDPR (EU)
          and CPRA (California). If you are a resident of those jurisdictions, you are
          entitled to:
        </p>
        <ul className="list-disc list-inside space-y-1">
          <li>Access, correct, or delete your data</li>
          <li>Data portability</li>
          <li>Object to or restrict processing</li>
          <li>Withdraw consent at any time</li>
          <li>Lodge complaints with appropriate authorities</li>
        </ul>
        <p>To exercise your rights, contact us using the details below.</p>
      </>
    ),
  },
];
