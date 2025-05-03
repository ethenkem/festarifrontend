import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-indigo/90 to-indigo/80 text-white">
      {/* Main content container with responsive layout */}
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-2/3">
            {/* Headline section */}
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Transform Your Business with Festari?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl">
              Whether you're looking for expert consultancy, premium real estate, agricultural solutions, 
              or comprehensive enterprise services, our team is ready to help you achieve your goals.
            </p>
          </div>
          
          {/* Button group for primary actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary contact button */}
            <Button asChild className="bg-white text-indigo hover:bg-white/90 px-6 py-6" size="lg">
              <Link to="/contact">
                Contact Us
              </Link>
            </Button>
            {/* Secondary button leading to more information */}
            <Button
              asChild
              variant="outline"
              className="border-white text-white font-semibold hover:bg-white/20 bg-black/50 px-6 py-6"
              size="lg"
            >
              <Link to="/about" className="flex items-center">
                Learn More <ArrowRight size={18} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
