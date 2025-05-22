// Import regular (non-lazy) components
import { useState } from 'react';
import { Helmet } from "react-helmet"
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ArrowRight, ExternalLink, Import } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';
import { log } from 'console';

const Contact = () => {
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await axios.post(`${BACKEND_URL}/v1/consultations/contact/`, formData)

      toast({
        title: "Message Sent",
        description: "Thank you for your inquiry. We'll respond shortly.",
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 1500);

    } catch (error) {
      toast({
        title: "Message Failed",
        description: "Submission failed please try again later and We'll respond shortly.",
      });
    }
  };

  // Contact info
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Our Location',
      details: ['Festari Group, Tamso Estates', 'Tarkwa, Ghana'],
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+233 (0)54 160 3237'],
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['info@festarigroup.com'],
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 9AM - 6PM', 'Saturday: 10AM - 2PM'],
    },
  ];

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Festari Group</title>
        <meta
          name="description"
          content="Get in touch with Festari Group for any inquiries. Find our location, phone numbers, email addresses, and business hours here."
        />
        <meta
          name="keywords"
          content="contact, address, phone, email, business hours, Festari Group"
        />
        <meta property="og:title" content="Contact Us - Festari Group" />
        <meta
          property="og:description"
          content="Need assistance or want to learn more? Contact Festari Group today. Find our location, phone number, email, and hours of operation."
        />
        <meta property="og:image" content="https://www.festarigroup.com/logo-icon-black.png" />
        <meta property="og:url" content="https://www.festarigroup.com/contact" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-20">
          {/* Hero section */}
          <section className="relative py-20 bg-gradient-to-br from-festari-900 to-festari-accent text-white overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.0.3&auto=format&fit=crop&w=1153&q=80')] bg-no-repeat bg-cover"></div>

            <div className="container-custom relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <Badge className="mb-6 bg-mikado/20 hover:bg-mikado/30 text-mikado border-mikado/20">Get In Touch</Badge>
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 leading-tight">Let's Connect</h1>
                <p className="text-xl text-white/80 mb-8">
                  Have questions about our services, properties, or educational offerings?
                  We're here to help you find the perfect solution for your needs.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#contact-form" className="inline-flex items-center gap-2 bg-mikado text-festari-900 px-5 py-2.5 rounded-lg font-medium hover:bg-mikado/90 transition-colors">
                    Send us a message <ArrowRight size={16} />
                  </a>
                  <a href="#contact-info" className="inline-flex items-center gap-2 bg-white/10 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-white/20 transition-colors">
                    View contact information
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Decorative waves */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor" className="text-white"></path>
              </svg>
            </div>
          </section>

          {/* Contact section */}
          <section className="py-20 bg-white">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Contact form */}
                <motion.div
                  id="contact-form"
                  className="lg:col-span-7"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl border border-festari-100/30">
                    <h2 className="text-2xl font-display font-bold text-festari-900 mb-6 flex items-center">
                      <Mail className="mr-3 text-festari-accent" size={24} />
                      Send Us a Message
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-festari-800 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-festari-800 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                            placeholder="john.doe@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-festari-800 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full p-3 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                          placeholder="+233 XX XXX XXXX"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-festari-800 mb-1">
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full p-3 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="Property Inquiry">Property Inquiry</option>
                          <option value="Course Information">Course Information</option>
                          <option value="Research Collaboration">Research Collaboration</option>
                          <option value="Mining Consultancy">Mining Consultancy</option>
                          <option value="Agribusiness Inquiry">Agribusiness Inquiry</option>
                          <option value="Enterprise Solutions">Enterprise Solutions</option>
                          <option value="Speaking Engagement">Speaking Engagement</option>
                          <option value="Partnership Opportunity">Partnership Opportunity</option>
                          <option value="General Inquiry">General Inquiry</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-festari-800 mb-1">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full p-3 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                          placeholder="How can we help you today?"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || isSubmitted}
                        className={cn(
                          "w-full p-4 rounded-md font-medium flex items-center justify-center gap-2 transition-all",
                          isSubmitted
                            ? "bg-green-600 text-white hover:bg-green-700"
                            : "bg-festari-accent text-white hover:bg-festari-accent/90"
                        )}
                      >
                        {isSubmitting ? (
                          <span>Sending...</span>
                        ) : isSubmitted ? (
                          <>
                            <CheckCircle size={18} />
                            <span>Message Sent</span>
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </form>
                  </div>
                </motion.div>

                {/* Contact info */}
                <motion.div
                  id="contact-info"
                  className="lg:col-span-5"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={staggerChildren}
                >
                  <div className="bg-festari-50 p-8 rounded-2xl shadow-lg border border-festari-100/30 h-full">
                    <h2 className="text-2xl font-display font-bold text-festari-900 mb-6 flex items-center">
                      <Phone className="mr-3 text-festari-accent" size={24} />
                      Contact Information
                    </h2>

                    <div className="space-y-8">
                      {contactInfo.map((info, index) => (
                        <motion.div
                          key={index}
                          className="flex gap-4"
                          variants={fadeIn}
                        >
                          <div className="bg-white p-3 rounded-xl shadow-sm">
                            <info.icon size={24} className="text-festari-accent" />
                          </div>
                          <div>
                            <h3 className="font-medium text-festari-900 mb-1">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-festari-600">{detail}</p>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <Separator className="my-8 bg-festari-200" />

                    <div>
                      <h3 className="font-medium text-festari-900 mb-3 flex items-center">
                        <Globe className="mr-2 text-festari-accent" size={18} />
                        Follow Us
                      </h3>
                      <div className="flex gap-4">
                        <a
                          href="#"
                          className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                          aria-label="Facebook"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                          aria-label="Twitter"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                          </svg>
                        </a>
                        <a
                          href="https://www.linkedin.com/in/festus-kunkyin-saadaari-98462267/"
                          className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                          aria-label="LinkedIn"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect x="2" y="9" width="4" height="12"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                        </a>
                        <a
                          href="#"
                          className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-all flex items-center justify-center"
                          aria-label="Instagram"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                          </svg>
                        </a>
                      </div>
                    </div>

                    <div className="mt-8 p-5 bg-white rounded-xl border border-festari-100/30">
                      <h3 className="font-medium text-festari-900 mb-3">Looking for our offices?</h3>
                      <p className="text-festari-700 text-sm mb-4">Visit us in Tarkwa, Ghana or schedule a virtual meeting at your convenience.</p>
                      <a
                        href="https://maps.app.goo.gl/example123"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-festari-accent hover:underline font-medium"
                      >
                        Get directions <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Map section */}
          <section className="py-0">
            <div className="h-96 w-full bg-festari-100 relative overflow-hidden">
              {/* Replace with actual map implementation */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d662.8930928749102!2d-2.001098389400483!3d5.283137049719374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d5.2832837999999995!2d-2.0010411!4m5!1s0xfdd6f0fa1c75cab%3A0x709cee7b8c3008f4!2sTamso%20Estates%2C%20Tarkwa!3m2!1d5.2832694!2d-2.0010217999999997!5e0!3m2!1sen!2sgh!4v1747745157106!5m2!1sen!2sgh"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              {/* Map overlay */}
              <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-lg max-w-sm">
                <h3 className="font-bold text-festari-900 mb-2">Festari Group Limited</h3>
                <p className="text-festari-700">University of Mines and Technology, Tarkwa, Ghana</p>
                <Button className="mt-4 bg-festari-accent hover:bg-festari-accent/90 w-full">
                  <Link target='_blank' className="flex items-center" to={"https://www.google.com/maps/dir//Tamso+Estates,+Tarkwa/@5.283264,-2.0834238,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0xfdd6f0fa1c75cab:0x709cee7b8c3008f4!2m2!1d-2.0010218!2d5.2832694?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDUxNS4wIKXMDSoASAFQAw%3D%3D"}>
                    <MapPin size={16} className="mr-2" /> Get Directions
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* FAQ or Additional Info Section */}
          <section className="py-20 bg-gradient-to-br from-gray-50 to-festari-50/20">
            <div className="container-custom">
              <div className="max-w-3xl mx-auto text-center mb-12">
                <Badge className="mb-4 bg-festari-accent/10 text-festari-accent border-festari-accent/20">Quick Links</Badge>
                <h2 className="text-3xl font-display font-bold text-festari-900 mb-4">How Else Can We Help?</h2>
                <p className="text-festari-700">
                  Explore our diverse services and opportunities across our subsidiaries.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Link to="/research-and-consultancy" className="group">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-festari-100/20 group-hover:border-festari-accent/30">
                    <School className="w-10 h-10 text-festari-accent mb-4" />
                    <h3 className="text-xl font-bold text-festari-900 mb-2 group-hover:text-festari-accent transition-colors">Research & Consultancy</h3>
                    <p className="text-festari-600 text-sm">Expert advisory services for mining and technical sectors.</p>
                  </div>
                </Link>

                <Link to="/estates-agency" className="group">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-festari-100/20 group-hover:border-festari-accent/30">
                    <Building className="w-10 h-10 text-festari-accent mb-4" />
                    <h3 className="text-xl font-bold text-festari-900 mb-2 group-hover:text-festari-accent transition-colors">Estates Agency</h3>
                    <p className="text-festari-600 text-sm">Premium property listings and real estate solutions.</p>
                  </div>
                </Link>

                <Link to="/agri-business" className="group">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-festari-100/20 group-hover:border-festari-accent/30">
                    <Trees className="w-10 h-10 text-festari-accent mb-4" />
                    <h3 className="text-xl font-bold text-festari-900 mb-2 group-hover:text-festari-accent transition-colors">Agribusiness</h3>
                    <p className="text-festari-600 text-sm">Sustainable farming and agricultural initiatives.</p>
                  </div>
                </Link>

                <Link to="/enterprise" className="group">
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all h-full border border-festari-100/20 group-hover:border-festari-accent/30">
                    <Factory className="w-10 h-10 text-festari-accent mb-4" />
                    <h3 className="text-xl font-bold text-festari-900 mb-2 group-hover:text-festari-accent transition-colors">Enterprise</h3>
                    <p className="text-festari-600 text-sm">Trading, distribution and commercial services.</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

// Make sure to import these icons
const Globe = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const School = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m4 6 8-4 8 4" />
    <path d="m18 10 4 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l4-2" />
    <path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4" />
    <path d="M18 5v17" />
    <path d="M6 5v17" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);

const Trees = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10 10v.2A3 3 0 0 1 8.9 16v0H5v0h0a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z" />
    <path d="M7 16v6" />
    <path d="M13 19v3" />
    <path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-4 4.3" />
  </svg>
);

const Factory = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M17 18h1" />
    <path d="M12 18h1" />
    <path d="M7 18h1" />
  </svg>
);

const Building = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

const Handshake = ({ size, className }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
  </svg>
);

export default Contact;
