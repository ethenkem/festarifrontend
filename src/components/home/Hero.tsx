import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const carouselItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=2073&auto=format&fit=cover",
    video: "https://videos.pexels.com/video-files/2818546/2818546-uhd_2560_1440_24fps.mp4",
    isVideo: true,
    title: "Premier Business Solutions",
    subtitle: "Under One Umbrella",
    description: "Discover a world of opportunities through our diverse business divisions",
    buttonText: "Explore Properties",
    buttonLink: "/properties",
    buttonVariant: "chili" as const,
    secondaryButtonText: "Research Hub",
    secondaryButtonLink: "/research",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&q=80",
    video: "https://videos.pexels.com/video-files/7579340/7579340-uhd_2732_1440_25fps.mp4",
    isVideo: true,
    title: "Research & Consultancy",
    subtitle: "Expert Knowledge",
    description: "Access cutting-edge research and professional consultancy services",
    buttonText: "Learn More",
    buttonLink: "/research",
    buttonVariant: "mikado" as const,
    secondaryButtonText: "Our Expertise",
    secondaryButtonLink: "/about",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&q=80",
    title: "Agricultural Excellence",
    subtitle: "Farm to Future",
    description: "Sustainable farming practices and agricultural initiatives for community growth",
    buttonText: "Agribusiness",
    buttonLink: "/agriculture",
    buttonVariant: "indigo" as const,
    secondaryButtonText: "Our Products",
    secondaryButtonLink: "/agriculture#products",
  },
  {
    id: 4,
    image: "https://media.istockphoto.com/id/998992048/photo/men-who-are-trying-to-contract-the-new-house.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ieq3jUthkM9kaNa3ybGWPM5Ou5vzU_YPcXTs7AbeIAw=",
    title: "Estate Agency Services",
    subtitle: "Premier Properties",
    description: "Find your dream property with our exclusive real estate listings",
    buttonText: "View Properties",
    buttonLink: "/estates",
    buttonVariant: "accent" as const,
    secondaryButtonText: "Request Tour",
    secondaryButtonLink: "/contact",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=3000&auto=format&fit=crop",
    video: "https://videos.pexels.com/video-files/7989709/7989709-hd_1920_1080_25fps.mp4",
    isVideo: true,
    title: "Enterprise Solutions",
    subtitle: "Business Growth",
    description: "Comprehensive enterprise solutions to support your business objectives",
    buttonText: "Our Services",
    buttonLink: "/enterprise",
    buttonVariant: "mikado" as const,
    secondaryButtonText: "Get Started",
    secondaryButtonLink: "/consultation",
  }
];

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoplay) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
      }, 6000); // Change slide every 6 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handlePrevious = () => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleDotClick = (index: number) => {
    setAutoplay(false); // Pause autoplay when manually navigating
    setActiveIndex(index);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Carousel background images/videos with animated transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {carouselItems.map((item, index) => (
            activeIndex === index && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                {item.isVideo ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover object-center"
                  >
                    <source src={item.video} type="video/mp4" />
                    {/* Fallback to image if video fails to load */}
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center" />
                  </video>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-festari-900/80 to-festari-800/70 z-10"></div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        className="absolute left-4 z-30 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all"
        onClick={handlePrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        className="absolute right-4 z-30 bg-white/10 hover:bg-white/20 p-2 rounded-full text-white transition-all"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Content */}
      <div className="container-custom relative z-20 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <span className={cn(
              "inline-block py-1 px-3 rounded-full bg-mikado/20 text-mikado text-sm font-medium mb-6",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              Welcome to Festari Group Limited
            </span>

            <h1 className={cn(
              "text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              {carouselItems[activeIndex].title} <span className="text-mikado">{carouselItems[activeIndex].subtitle}</span>
            </h1>

            <p className={cn(
              "text-lg md:text-xl text-festari-100 mb-8",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              {carouselItems[activeIndex].description}
            </p>

            <div className={cn(
              "flex flex-col sm:flex-row gap-4 justify-center",
              isVisible ? "opacity-100" : "opacity-0"
            )}>
              <Button
                asChild
                className={`hover:bg-${carouselItems[activeIndex].buttonVariant}/90 text-white border-2 border-transparent px-6 py-6 text-base`}
                variant={carouselItems[activeIndex].buttonVariant}
                size="lg"
              >
                <Link to={carouselItems[activeIndex].buttonLink}>
                  {carouselItems[activeIndex].buttonText}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-transparent text-white border-2 border-white hover:bg-white/10 px-6 py-6 text-base flex items-center"
                size="lg"
              >
                <Link to={carouselItems[activeIndex].secondaryButtonLink}>
                  {carouselItems[activeIndex].secondaryButtonText} <ChevronRight size={16} className="ml-1" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 mt-10 text-white/70 justify-center">
              <Link to="/about" className="flex items-center gap-1 hover:text-mikado transition-colors">
                Our Story <ArrowRight size={14} />
              </Link>
              <span className="text-white/30">•</span>
              <Link to="/founder" className="flex items-center gap-1 hover:text-mikado transition-colors">
                Meet Our Founder <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center z-30 space-x-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${activeIndex === index ? "w-8 bg-mikado" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
            />
          ))}
        </div>
      </div>

      {/* Motion graphics element - animated shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10 opacity-30">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
          <motion.path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
            className="text-white"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 3
            }}
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
