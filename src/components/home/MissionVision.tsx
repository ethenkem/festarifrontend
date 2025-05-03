
import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const MissionVision = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Mission */}
          <div className={cn(
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          )}>
            <span className="inline-block py-1 px-3 rounded-full bg-chili/10 text-chili text-sm font-medium mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-6">
              Empowering Growth Through Integrated Solutions
            </h2>
            <p className="text-festari-600 mb-6">
              Festari Group is committed to providing comprehensive, high-quality services across diverse sectors. 
              We aim to empower individuals and businesses through innovative solutions tailored to their unique needs, 
              fostering sustainable growth and development in every community we serve.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-chili mt-2.5"></div>
                <p className="flex-1 text-festari-700">Deliver exceptional service and expertise across all our business divisions</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-chili mt-2.5"></div>
                <p className="flex-1 text-festari-700">Foster innovation and continuous improvement in our operations</p>
              </div>
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-chili mt-2.5"></div>
                <p className="flex-1 text-festari-700">Create sustainable value for our clients, communities, and stakeholders</p>
              </div>
            </div>
            
            <Button asChild className="bg-chili hover:bg-chili/90">
              <Link to="/about" className="flex items-center gap-2">
                Learn About Our Company <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          {/* Vision */}
          <div className={cn(
            "relative transition-all duration-700 delay-300 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          )}>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-mikado/5 rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo/5 rounded-full"></div>
            
            <div className="relative bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-festari-100">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo/10 text-indigo text-sm font-medium mb-4">
                Our Vision
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-festari-900 mb-6">
                Building a Better Future Together
              </h2>
              <p className="text-festari-600 mb-8">
                We envision a future where Festari Group stands as a global leader in integrated services, 
                recognized for excellence, innovation, and positive impact. Our vision is to transform 
                industries, empower communities, and create sustainable solutions that address the evolving 
                needs of our diverse client base.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-mikado/10 flex items-center justify-center text-mikado">
                    <span className="text-xl font-bold">01</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-festari-900 mb-1">Industry Leadership</h3>
                    <p className="text-festari-600">Become the benchmark for excellence across our diverse business sectors</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-indigo/10 flex items-center justify-center text-indigo">
                    <span className="text-xl font-bold">02</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-festari-900 mb-1">Global Expansion</h3>
                    <p className="text-festari-600">Extend our reach to serve clients across international markets</p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-chili/10 flex items-center justify-center text-chili">
                    <span className="text-xl font-bold">03</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-festari-900 mb-1">Sustainable Impact</h3>
                    <p className="text-festari-600">Create lasting positive change in communities through our operations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
