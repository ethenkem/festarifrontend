
import { useRef, useState, useEffect } from 'react';
import { Building, GraduationCap, Users, Award, BadgeCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const Stat = ({ icon, value, label, delay }: StatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  
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

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  return (
    <div 
      ref={elementRef}
      className={cn(
        "flex flex-col items-center transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        isVisible && `delay-${delay}`
      )}
    >
      <div className="mb-4 bg-accent/10 p-4 rounded-full">
        {icon}
      </div>
      <h3 className="text-3xl md:text-4xl font-bold text-festari-900 mb-2">{value}</h3>
      <p className="text-festari-600 text-center">{label}</p>
    </div>
  );
};

const AnimatedStats = () => {
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
  
  const stats = [
    { icon: <Building size={24} className="text-accent" />, value: "500+", label: "Properties Listed", delay: 0 },
    { icon: <GraduationCap size={24} className="text-accent" />, value: "50+", label: "Professional Courses", delay: 100 },
    { icon: <Users size={24} className="text-accent" />, value: "10K+", label: "Satisfied Clients", delay: 200 },
    { icon: <Award size={24} className="text-accent" />, value: "15+", label: "Years of Experience", delay: 300 },
    { icon: <BadgeCheck size={24} className="text-accent" />, value: "25+", label: "Industry Awards", delay: 400 },
  ];

  return (
    <section ref={containerRef} className="py-16 bg-white">
      <div className="container-custom">
        <div className={cn(
          "p-8 md:p-12 bg-gradient-to-br from-festari-50 to-white rounded-2xl shadow-lg relative overflow-hidden transition-all duration-500",
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        )}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
              Transforming Real Estate &amp; Education
            </h2>
            <p className="text-festari-600">
              Our numbers speak for themselves. Discover why thousands trust Festari Group for their real estate, research, and agricultural needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 relative z-10">
            {stats.map((stat, index) => (
              <Stat key={index} {...stat} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;
