import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import FeaturedSection from '@/components/home/FeaturedSection';
import NavigationCards from '@/components/home/NavigationCards';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import Testimonials from '@/components/home/Testimonials';
import AnimatedStats from '@/components/home/AnimatedStats';
import Features from '@/components/home/Features';
import BusinessDivisions from '@/components/home/BusinessDivisions';
import CoreValues from '@/components/home/CoreValues';
import MissionVision from '@/components/home/MissionVision';
import CallToAction from '@/components/home/CallToAction';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  // Page load animation state
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set page as loaded after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        {/* Basic SEO */}
        <title>Festari Group Ltd - Innovating Africa’s Future</title>
        <meta
          name="description"
          content="Festari Group Ltd delivers innovative, multidisciplinary business solutions across real estate, agriculture, education, and strategic trade in Ghana and Africa."
        />
        <meta
          name="keywords"
          content="Festari Group, real estate, agriculture, education, trade, Ghana, Africa, sustainable business, innovation"
        />
        <meta name="author" content="Festari Group Ltd" />
        <link rel="canonical" href="https://www.festarigroup.com" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (Facebook/LinkedIn/WhatsApp) */}
        <meta property="og:title" content="Festari Group Ltd - Innovating Africa’s Future" />
        <meta
          property="og:description"
          content="Discover Festari Group’s expertise in real estate, agribusiness, trade, and education. Driving sustainable innovation across Africa."
        />
        <meta property="og:image" content="https://www.festarigroup.com/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content="https://www.festarigroup.com" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:site_name" content="Festari Group Ltd" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Festari Group Ltd - Innovating Africa’s Future" />
        <meta
          name="twitter:description"
          content="Explore Festari Group’s business solutions in real estate, agriculture, education, and trade — transforming Africa’s economy sustainably."
        />
        <meta name="twitter:image" content="https://www.festarigroup.com/og-image.jpg" />
        <meta name="twitter:site" content="@festari" />
        <meta name="twitter:url" content="https://www.festarigroup.com" />
      </Helmet>
      <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header component */}
        <Header />
        <main>
          <Hero />
          <BusinessDivisions />
          <AnimatedStats />
          <Features />
          <MissionVision />
          <CoreValues />
          <FeaturedSection />
          <NavigationCards />
          <Testimonials />

          {/* Added consultation CTA section */}
          <section className="py-16 bg-gradient-to-r from-festari-900 via-festari-900 to-indigo text-white">
            <div className="container-custom text-center">
              <h2 className="text-3xl font-display font-bold mb-4">
                Need Expert Consultation?
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Our team of professionals is ready to provide specialized consultation services
                across all our business divisions. Request a consultation today!
              </p>
              <Button asChild size="lg" className="bg-white text-festari-900 hover:bg-white/90">
                <Link to="/consultation" className="flex items-center gap-2">
                  Request Consultation <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
          </section>

          <CallToAction />
          <NewsletterSignup />
        </main>
        {/* Footer component */}
        <Footer />
      </div>
    </>
  );
};

export default Index;
