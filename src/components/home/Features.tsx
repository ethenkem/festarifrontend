
import { useRef, useState, useEffect } from 'react';
import { Shield, Award, LineChart, Users, BookOpen, BarChart3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: <Shield className="h-10 w-10 text-chili" />,
    title: 'Trusted Expertise',
    description: 'Backed by years of experience across multiple industries, providing reliable solutions you can count on.',
    delay: 0
  },
  {
    icon: <Award className="h-10 w-10 text-mikado" />,
    title: 'Award-Winning Services',
    description: 'Recognized for excellence in research, real estate, and agricultural innovations that drive results.',
    delay: 100
  },
  {
    icon: <LineChart className="h-10 w-10 text-indigo" />,
    title: 'Data-Driven Approach',
    description: 'Leveraging advanced analytics and research methodologies to deliver optimal outcomes for our clients.',
    delay: 200
  },
  {
    icon: <Users className="h-10 w-10 text-chili" />,
    title: 'Client-Centered Focus',
    description: 'Your goals and needs are at the heart of everything we do, ensuring tailored solutions that work for you.',
    delay: 300
  },
  {
    icon: <BookOpen className="h-10 w-10 text-mikado" />,
    title: 'Continuous Learning',
    description: 'Staying at the forefront of industry developments through ongoing research and professional development.',
    delay: 400
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-indigo" />,
    title: 'Measurable Results',
    description: 'Delivering tangible outcomes with clear metrics so you can see the impact of our services.',
    delay: 500
  }
];

const Features = () => {
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
    <section ref={containerRef} className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Why Choose Festari
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
            Excellence Across Industries
          </h2>
          <p className="text-festari-600">
            At Festari Group, we combine specialized expertise with a comprehensive approach 
            to deliver exceptional value in everything we do.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={cn(
                "bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-festari-100 transform",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                isVisible && `transition-all duration-700 ease-out delay-[${feature.delay}ms]`
              )}
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-festari-900">{feature.title}</h3>
              <p className="text-festari-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
