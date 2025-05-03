import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * JavaScript version of the Hero component
 */
const HeroJS = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getAnimationClasses = (delay = 0) => {
    const baseClasses = "transform transition-all duration-700 ease-out";
    const visibilityClasses = isVisible 
      ? "opacity-100 translate-y-0" 
      : "opacity-0 translate-y-4";
    const delayClass = delay ? `delay-${delay}` : '';
    
    return `${baseClasses} ${visibilityClasses} ${delayClass}`;
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-festari-900/90 to-festari-800/80 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&q=80"
          alt="Festari"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20">
        <div className="max-w-3xl mx-auto">
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 ${getAnimationClasses(100)}`}>
            Premiere Business Solutions <br /> Under One Umbrella
          </h1>
          <p className={`text-lg md:text-xl text-festari-100 mb-8 ${getAnimationClasses(200)}`}>
            Discover a world of opportunities through our diverse business divisions: access cutting-edge research, explore premier real estate listings, connect with agricultural expertise, and leverage our comprehensive enterprise solutions.
          </p>
          <div className={`flex flex-col sm:flex-row gap-4 justify-center ${getAnimationClasses(300)}`}>
            <Link 
              to="/divisions" 
              className="btn-primary bg-accent hover:bg-accent/90 px-6 py-3 text-base"
            >
              Discover Our Divisions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroJS;
