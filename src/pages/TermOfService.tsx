import Header from '@/components/layout/Header';
import React from 'react';

const TermsOfService = () => {
  return (
    <>
    <div className="bg-background text-foreground font-sans py-12">
    <Header />
      <div className="container pt-[10%] md:pt-[5%]">
        <h1 className="text-4xl font-display font-bold mb-2 text-festari-accent">
          Terms of Service
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          Effective Date: November 26, 2024
        </p>

        {sections.map(({ number, title, content }, i) => (
          <Section key={i} number={number} title={title} content={content} />
        ))}

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p className="mb-3">
            If you have any questions regarding these Terms of Service, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Email:</strong> info@festarigroup.com
            </li>
            <li>
              <strong>Phone:</strong> +233 20 770 2157 / +233 54 160 3237 / +233 26 100 7835
            </li>
            <li>
              <strong>Address:</strong> Office No. 4, Estate Hills Street, Tamso, Tarkwa, Ghana
            </li>
          </ul>
        </div>
      </div>
    </div>

    </>
  );
};

const Section = ({
  number,
  title,
  content,
}: {
  number: number;
  title: string;
  content: string;
}) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-festari-700">
      {number}. {title}
    </h2>
    <p className="text-base leading-relaxed">{content}</p>
  </div>
);

export default TermsOfService;

// Content broken into a separate structure for maintainability
const sections = [
  {
    number: 1,
    title: 'Introduction',
    content:
      'Welcome to Festari Group Ltd. By accessing or using our websites, platforms, or services, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services.',
  },
  {
    number: 2,
    title: 'Scope of Services',
    content:
      'Festari Group Ltd. provides consultancy, training, education, professional development, product sales, and related services through its subsidiaries, including Festari Research & Consultancy Institute (FRCI), Festari International Academy (FIA), Festari Enterprise (FEnt), Festari Farms & Agribusinesses (FFA), and Festari Estates Agency (FEA).',
  },
  {
    number: 3,
    title: 'User Responsibilities',
    content:
      'Users agree to use our platforms and services lawfully and respectfully. Any misuse, unauthorized access, or attempt to disrupt operations may result in account suspension or legal action.',
  },
  {
    number: 4,
    title: 'Payment and Refund Policy',
    content:
      'All service fees must be paid in full as invoiced. Refunds are only processed under clearly communicated policies stated at the point of registration or purchase. Late payments may incur additional charges or service denial.',
  },
  {
    number: 5,
    title: 'Account Access and Security',
    content:
      'Users may be required to create accounts on platforms like OnlineExamMaker, CertifyMe, SuiteDash or Nextcloud. You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized access.',
  },
  {
    number: 6,
    title: 'Intellectual Property',
    content:
      'All content, materials, logos, training modules, and tools developed by Festari Group Ltd. are protected by intellectual property laws. You may not reproduce, distribute, or sell any content without our written permission.',
  },
  {
    number: 7,
    title: 'Limitation of Liability',
    content:
      "Festari Group Ltd. is not liable for any indirect, incidental, or consequential damages arising from the use or inability to use our services. We provide services 'as is' without warranties of any kind.",
  },
  {
    number: 8,
    title: 'Termination of Services',
    content:
      'We reserve the right to suspend or terminate access to our services for any user who violates these terms, engages in fraudulent activity, or disrupts operations.',
  },
  {
    number: 9,
    title: 'Governing Law and Jurisdiction',
    content:
      'These Terms of Service are governed by the laws of the Republic of Ghana. Any disputes shall be resolved under Ghanaian jurisdiction.',
  },
];
