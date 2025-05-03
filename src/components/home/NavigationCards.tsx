import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, BookOpen, User, ArrowRight, Leaf, MapPin, School } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define an explicit type for better code readability and type safety.
interface NavigationCard {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  delay: number;
}

// Updated array with explicit type
const navigationCards: NavigationCard[] = [
  {
    title: 'Real Estate',
    description: 'Discover premier properties available for sale and rent in top locations across major cities.',
    icon: Building,
    path: '/real-estate',
    color: 'bg-gradient-to-br from-blue-500 to-blue-700',
    delay: 0,
  },
  {
    title: 'Research & Education',
    description: 'Access cutting-edge research papers and educational courses led by industry experts.',
    icon: BookOpen,
    path: '/research',
    color: 'bg-gradient-to-br from-purple-500 to-purple-700',
    delay: 100,
  },
  {
    title: 'Agriculture',
    description: 'Explore sustainable farming solutions and agricultural products for modern cultivation.',
    icon: Leaf,
    path: '/agriculture',
    color: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    delay: 200,
  },
  {
    title: 'About the Founder',
    description: 'Learn about Dr. Festus Kunkyin-Saadaari, the visionary behind Festari Group.',
    icon: User,
    path: '/founder',
    color: 'bg-gradient-to-br from-amber-500 to-amber-700',
    delay: 300,
  },
  {
    title: 'Academic Achievements',
    description: 'Browse through publications, research papers, and academic contributions.',
    icon: School,
    path: '/research/publications',
    color: 'bg-gradient-to-br from-slate-500 to-slate-700',
    delay: 400,
  },
  {
    title: 'Contact Us',
    description: 'Get in touch with our team for inquiries, partnerships, or consultation.',
    icon: MapPin,
    path: '/contact',
    color: 'bg-gradient-to-br from-rose-500 to-rose-700',
    delay: 500,
  },
];

const NavigationCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use IntersectionObserver to trigger animations when component enters view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Debug log: flag section visibility.
          console.log("NavigationCards section is now visible");
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    // Cleanup observer when component unmounts.
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="section-padding bg-gradient-to-b from-white to-festari-50">
      {/* Container for section content */}
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {/* Section category label */}
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Explore Festari
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
            Discover Our Comprehensive Services
          </h2>
          <p className="text-festari-600">
            Festari Group brings together a unique blend of real estate opportunities, educational resources, 
            agricultural innovation, and professional expertise in one seamless platform.
          </p>
        </div>
        
        {/* Grid layout for navigation cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationCards.map((card, index) => (
            // Each card is a link with transition delays for staggered animation.
            <Link
              key={card.title}
              to={card.path}
              className={cn(
                "group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                isVisible && `transition-all duration-700 ease-out delay-[${card.delay}ms]`
              )}
            >
              <div className={cn("p-8 h-full text-white", card.color)}>
                <div className="flex items-center justify-between mb-6">
                  {/* Render icon if available */}
                  {card.icon && <card.icon size={32} className="text-white/90" />}
                  <ArrowRight 
                    size={20} 
                    className="text-white transform translate-x-0 opacity-100 group-hover:translate-x-1 transition-all duration-300" 
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-white/90 text-sm">{card.description}</p>
              </div>
              {/* Hover overlay for additional visual effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NavigationCards;
