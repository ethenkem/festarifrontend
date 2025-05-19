import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import Logo from '@/components/common/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-festari-900 text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <Logo variant="white-text" theme="light" size="lg" className="mb-3" />
            </Link>
            <p className="text-festari-100 max-w-xs">
              A premier platform connecting real estate, education, research, and professional excellence across Ghana and beyond.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.facebook.com/share/1BuqGC4GQ3/?mibextid=qi2Omg" className="text-festari-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="" className="text-festari-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a target='_blank' href="https://www.linkedin.com/company/festari-group-ltd/" className="text-festari-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              {/*
              <a href="https://www.instagram.com/festarigroup?igsh=aTA3aWFwYjFpaTN0" className="text-festari-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a> */}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-festari-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-festari-300 hover:text-white transition-colors">Real Estate</Link>
              </li>
              <li>
                <Link to="/frci" className="text-festari-300 hover:text-white transition-colors">Research</Link>
              </li>
              <li>
                <Link to="/about" className="text-festari-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-festari-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/properties" className="text-festari-300 hover:text-white transition-colors">Property Listings</Link>
              </li>
              <li>
                <Link to="/frci" className="text-festari-300 hover:text-white transition-colors">Educational Courses</Link>
              </li>
              <li>
                <Link to="/frci" className="text-festari-300 hover:text-white transition-colors">Academic Publications</Link>
              </li>
              <li>
                <Link to="/agriculture" className="text-festari-300 hover:text-white transition-colors">Agribusiness</Link>
              </li>
              <li>
                <Link to="/contact" className="text-festari-300 hover:text-white transition-colors">Consultations</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-festari-300">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="mt-0.5 shrink-0 text-mikado" />
                <div>
                  <p className="text-white">Festari Group Limited</p>
                  <p>Estate Hills, Tamso - Tarkwa</p>
                  <p>P. O. Box 657, Tarkwa</p>
                  <p>Ghana</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="shrink-0 text-mikado" />
                <a href="tel:+233541603237" className="hover:text-white transition-colors">
                  +233 (0)54 160 3237
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={16} className="shrink-0 text-mikado" />
                <a href="mailto:info@festarigroup.com" className="hover:text-white transition-colors">
                  info@festarigroup.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Linkedin size={16} className="shrink-0 text-mikado" />
                <a href="https://www.linkedin.com/company/festari-group-ltd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo variant="icon" theme="light" size="sm" />
          <div className="text-festari-300 text-sm text-center md:text-left">
            &copy; {currentYear} Festari Group Limited. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-festari-300 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-festari-300 hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/impressum" className="text-festari-300 hover:text-white transition-colors">Impressum</Link>
            <Link to="/refund-and-cookies-policy" className="text-festari-300 hover:text-white transition-colors">Refund and Cookies Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
