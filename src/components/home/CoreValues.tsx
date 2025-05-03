
import { useRef, useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Lightbulb, 
  GraduationCap, 
  Target, 
  Globe 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValueProps {
  icon: React.ReactNode;
  color: string;
  title: string;
  description: string;
  delay: number;
}

const values: ValueProps[] = [
  {
    icon: <Shield size={40} />,
    color: "chili",
    title: "Integrity",
    description: "We uphold the highest ethical standards in all our operations, ensuring transparency and accountability in every interaction.",
    delay: 0
  },
  {
    icon: <Users size={40} />,
    color: "mikado",
    title: "Client-Centered",
    description: "Our clients' success is our priority. We build lasting relationships through attentive service and tailored solutions.",
    delay: 100
  },
  {
    icon: <Lightbulb size={40} />,
    color: "indigo",
    title: "Innovation",
    description: "We continually seek new approaches and technologies to deliver cutting-edge solutions across all our business divisions.",
    delay: 200
  },
  {
    icon: <GraduationCap size={40} />,
    color: "chili",
    title: "Excellence",
    description: "We strive for excellence in every endeavor, maintaining the highest quality standards in our products and services.",
    delay: 300
  },
  {
    icon: <Target size={40} />,
    color: "mikado",
    title: "Reliability",
    description: "Dependable and consistent in our delivery, we build trust through meeting and exceeding expectations.",
    delay: 400
  },
  {
    icon: <Globe size={40} />,
    color: "indigo",
    title: "Sustainability",
    description: "We are committed to sustainable practices that benefit communities and preserve resources for future generations.",
    delay: 500
  }
];

const ValueCard = ({ value }: { value: ValueProps }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "bg-white rounded-xl p-8 transition-all duration-700 ease-out hover:shadow-lg border border-festari-100 group",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        isVisible && `delay-[${value.delay}ms]`
      )}
    >
      <div className={`p-4 rounded-full bg-${value.color}/10 w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <div className={`text-${value.color}`}>{value.icon}</div>
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-festari-900 group-hover:text-indigo transition-colors duration-300">{value.title}</h3>
      <p className="text-festari-600">{value.description}</p>
    </div>
  );
};

const CoreValues = () => {
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
    <section ref={containerRef} className="py-24 bg-gradient-to-b from-festari-50 to-white">
      <div className="container-custom">
        <div className={cn(
          "text-center max-w-3xl mx-auto mb-16 transition-all duration-500",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="inline-block py-1 px-3 rounded-full bg-chili/10 text-chili text-sm font-medium mb-4">
            Our Core Values
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
            The Principles That Guide Us
          </h2>
          <p className="text-festari-600">
            At Festari Group, our values define who we are and how we operate. They are the foundation of our commitment to excellence across all our business divisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
