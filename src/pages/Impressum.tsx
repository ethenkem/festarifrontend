import Header from '@/components/layout/Header';
import React from 'react';

const Impressum = () => {
  return (
    <div className="bg-background text-foreground font-sans py-12">
      <Header />
      <div className="container pt-[10%] md:pt-[5%]">
        <h1 className="text-4xl font-display font-bold mb-2 text-festari-accent">
          Impressum (Legal Notice)
        </h1>
        <p className="text-sm text-muted-foreground mb-10">
          This legal notice is provided in accordance with applicable laws and regulations.
        </p>

        <div className="space-y-6 text-base leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold mb-1">Festari Group Ltd</h2>
            <p><strong>Registered Office:</strong><br />
              Office No. 4, Estate Hills Street,<br />
              Tamso, Tarkwa, Western Region, Ghana
            </p>
            <p><strong>Postal Address:</strong><br />
              P.O. Box TK 657, Tarkwa, Ghana
            </p>
            <p><strong>Company Registration:</strong><br />
              Registered under the laws of the Republic of Ghana
            </p>
            <p><strong>Managing Director / CEO:</strong><br />
              Dr. Festus Kunkyin-Saadaari
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Contact Information</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Email:</strong> info@festarigroup.com</li>
              <li><strong>Phone:</strong> +233 20 770 2157 / +233 54 160 3237 / +233 26 100 7835</li>
              <li><strong>Website:</strong> <a href="https://www.festarigroup.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">www.festarigroup.com</a></li>
              <li><strong>Company TIN:</strong> C0063454408</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Disclaimer</h2>
            <p>
              Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-1">Copyright Notice</h2>
            <p>
              All content, graphics, and media on this site are the property of Festari Group Ltd. or its partners, unless otherwise stated. Unauthorized use or reproduction is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Impressum;
