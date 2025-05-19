import Header from '@/components/layout/Header';
import React from 'react';

const RefundAndCookies = () => {
  return (
    <div className="bg-background text-foreground font-sans py-12">
      <Header />
      <div className="container pt-[10%] md:pt-[5%]">
        <h1 className="text-4xl font-display font-bold mb-2 text-festari-accent">
          Refund & Cookie Policies – Festari Group Ltd.
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          These policies apply across all Festari Group Ltd services and platforms.
        </p>

        <Section title="1. Refund & Cancellation Policy">
          <p>
            Festari Group Ltd is committed to ensuring client satisfaction across all services
            and subsidiaries. This policy applies to all services provided by:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Festari Research & Consultancy Institute (FRCI)</li>
            <li>Festari International Academy (FIA)</li>
            <li>Festari Enterprise (FEnt)</li>
            <li>Festari Farms & Agribusiness (FFA)</li>
            <li>Festari Estates Agency (FEA)</li>
          </ul>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>All payments made are subject to the terms stated at the point of service engagement or registration.</li>
            <li>Refund requests must be submitted in writing within 7 days of service commencement.</li>
            <li>Administrative fees (if stated) are non-refundable.</li>
            <li>Refunds are not granted for completed services, digital products delivered, or late cancellations.</li>
            <li>Custom or personalized orders (e.g., plasma designs, custom training programs, printing services) are non-refundable once production or delivery has started.</li>
            <li>In the case of course cancellations by Festari, a full refund or alternative arrangement will be offered.</li>
          </ul>
        </Section>

        <Section title="2. Cookie Policy">
          <p>
            Festari Group Ltd uses cookies and similar technologies on our websites and platforms
            to improve user experience, analyze traffic, and offer personalized content.
          </p>
          <p>Cookies may include:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li><strong>Essential cookies</strong> – for site functionality and security</li>
            <li><strong>Analytical cookies</strong> – for usage tracking and service improvement</li>
            <li><strong>Third-party cookies</strong> – from tools like Google Analytics or embedded forms</li>
          </ul>
          <p>
            You can control or disable cookies through your browser settings. By continuing to use
            our site, you consent to our use of cookies in accordance with this policy.
          </p>
        </Section>

        <Section title="Contact">
          <p>If you have any questions about these policies, contact us:</p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Email:</strong> info@festarigroup.com</li>
            <li><strong>Phone:</strong> +233 20 770 2157 / +233 54 160 3237 / +233 26 100 7835</li>
            <li><strong>Address:</strong> Office No. 4, Estate Hills Street, Tamso, Tarkwa, Ghana</li>
          </ul>
        </Section>
      </div>
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-8">
    <h2 className="text-xl font-semibold mb-2 text-festari-700">{title}</h2>
    <div className="text-base leading-relaxed space-y-2">{children}</div>
  </div>
);

export default RefundAndCookies;
