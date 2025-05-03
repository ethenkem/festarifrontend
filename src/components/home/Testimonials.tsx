
import { useRef, useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Investor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&q=80&auto=format&fit=crop",
    content: "Festari Group helped me find the perfect investment property. Their research resources were invaluable in making an informed decision.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Real Estate Developer",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&h=300&q=80&auto=format&fit=crop",
    content: "The educational courses offered by Festari have completely transformed how I approach property development. Highly recommend!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Agriculture Entrepreneur",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&q=80&auto=format&fit=crop",
    content: "The agricultural marketplace connected me with suppliers I never would have found otherwise. My business has grown exponentially.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Williams",
    role: "First-time Home Buyer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&q=80&auto=format&fit=crop",
    content: "As someone new to real estate, I found the perfect first home thanks to Festari's detailed listings and helpful advice.",
    rating: 5,
  },
];

const Testimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={containerRef} className="section-padding bg-festari-50 overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-festari-600">
            Join thousands of satisfied clients who have found success with Festari Group's comprehensive services.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-accent/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className={cn(
                  "bg-white rounded-xl shadow-md p-6 transition-all duration-500 transform",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  isVisible && `transition-all duration-700 ease-out delay-${index * 150}ms`
                )}
              >
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 bg-accent rounded-full p-1">
                        <Quote size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-festari-900">{testimonial.name}</h3>
                    <p className="text-festari-600 text-sm">{testimonial.role}</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < testimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-festari-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-8">
          <div className="flex space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  activeIndex === index ? "bg-accent" : "bg-gray-300"
                )}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
