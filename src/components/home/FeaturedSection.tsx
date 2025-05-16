import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, GraduationCap, DollarSign, User, ChevronRight, BuildingIcon, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

//const featuredProducts = [
//  {
//    id: 'agri1',
//    title: 'Organic Vegetable Seeds Pack',
//    image: 'https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&q=80',
//    price: '$24.99',
//    category: 'Seeds',
//    location: 'Farm-Fresh Market',
//    rating: 4.8,
//    path: '/agriculture/product/organic-seeds',
//  },
//  {
//    id: 'agri2',
//    title: 'Smart Irrigation System',
//    image: 'https://images.unsplash.com/photo-1621886292650-720c1d5ba9f8?auto=format&q=80',
//    price: '$149.99',
//    category: 'Equipment',
//    location: 'AgriTech Store',
//    rating: 4.7,
//    path: '/agriculture/product/smart-irrigation',
//  },
//];

const FeaturedSection = () => {
  // Reference for the container element for intersection observer
  const containerRef = useRef<HTMLDivElement>(null);
  // State to toggle visibility for animation purposes
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('properties');
  const [featuredProperties, setFeaturedProperties] = useState<any[]>([])
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([])


  const fetchFeaturedEntities = async () => {
    const [featuredPropertiesResponse, featuredCoursesResponse] = await Promise.all([
      axios.get(`${BACKEND_URL}/v1/real-estates/featured/`),
      axios.get(`${BACKEND_URL}/v1/education/courses/featured`)
    ])

    setFeaturedProperties(featuredPropertiesResponse.data)
    setFeaturedCourses(featuredCoursesResponse.data)
  }

  // Effect: Set up IntersectionObserver to trigger animation when element is in view
  useEffect(() => {
    // Create the observer with threshold 0.1
    fetchFeaturedEntities()
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

    // Cleanup: disconnect the observer on unmount
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="section-padding bg-gradient-to-b from-white to-festari-50">
      <div className="container-custom">
        {/* Header area: Title and subtitle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
          <div>
            {/* Tagline badge */}
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Featured at Festari
            </span>
            {/* Main title */}
            <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900">Explore Our Offerings</h2>
          </div>

          {/* Tab buttons for switching between properties, courses, and agriculture */}
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button
              variant={activeTab === 'properties' ? "default" : "outline"}
              onClick={() => setActiveTab('properties')}
              className="flex items-center gap-1"
            >
              <BuildingIcon size={16} />
              Properties
            </Button>
            <Button
              variant={activeTab === 'courses' ? "default" : "outline"}
              onClick={() => setActiveTab('courses')}
              className="flex items-center gap-1"
            >
              <GraduationCap size={16} />
              Courses
            </Button>
            {/*<Button
              variant={activeTab === 'agriculture' ? "default" : "outline"}
              onClick={() => setActiveTab('agriculture')}
              className="flex items-center gap-1"
            >
              <Leaf size={16} />
              Agriculture
            </Button>*/}
          </div>
        </div>

        {/* Properties Tab */}
        <div className={activeTab === 'properties' ? 'block' : 'hidden'}>
          {/* Grid presentation of featured properties */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property, index) => (
              <Card
                key={property.id}
                className={cn(
                  "overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  isVisible && `transition-all duration-500 ease-out delay-${index * 150}`
                )}
              >
                {/* Card image with hover zoom effect */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge indicating property type */}
                  <Badge className="absolute top-4 right-4">
                    {property.type}
                  </Badge>
                </div>
                {/* Card header: Title and other details */}
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festari-900 group-hover:text-accent transition-colors">
                    {property.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Home size={14} className="mr-1 text-festari-500" />
                      {property.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm text-festari-500">{property.features}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <span className="text-lg font-bold text-accent">{property.price}</span>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link to={property.path}>
                      View Details <ChevronRight size={14} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {/* Button to view all properties */}
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="gap-1">
              <Link to="/properties">
                View All Properties <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Courses Tab */}
        <div className={activeTab === 'courses' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredCourses.map((course, index) => (
              <Card
                key={course.id}
                className={cn(
                  "overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  isVisible && `transition-all duration-500 ease-out delay-${index * 150}`
                )}
              >
                <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
                  <img
                    src={course.course_flyer}
                    alt={course.course_name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-accent text-white">
                    {course.level}
                  </Badge>
                </div>
                <div className="md:w-3/5 p-6 flex flex-col">
                  <CardTitle className="text-lg text-festari-900 group-hover:text-accent transition-colors mb-2">
                    {course.course_name}
                  </CardTitle>
                  <div className="flex items-center gap-2 mb-3">
                    <User size={14} className="text-festari-500" />
                    <span className="text-sm text-festari-600">{course.instructor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <Badge variant="outline" className="bg-festari-50 font-normal">
                      {course.duration}
                    </Badge>
                    <Badge variant="outline" className="bg-festari-50 font-normal">
                      <GraduationCap size={12} className="mr-1" /> 1,250+ Students
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-lg font-bold text-accent">{course.price}</span>
                    <Button asChild variant="ghost" size="sm" className="gap-1">
                      <Link to={course.path}>
                        View Course <ChevronRight size={14} />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="gap-1">
              <Link to="/research">
                View All Courses <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>

        {/* Agriculture Tab */}
        {/* <div className={activeTab === 'agriculture' ? 'block' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProducts.map((product, index) => (
              <Card
                key={product.id}
                className={cn(
                  "overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  isVisible && `transition-all duration-500 ease-out delay-${index * 150}`
                )}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 right-4">
                    {product.category}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-festari-900 group-hover:text-accent transition-colors">
                    {product.title}
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <Leaf size={14} className="mr-1 text-festari-500" />
                      {product.location}
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex items-center">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i} className={`text-${i < Math.floor(product.rating) ? 'amber-400' : 'gray-300'}`}>★</span>
                    ))}
                    <span className="ml-1 text-sm text-festari-600">{product.rating}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between pt-0">
                  <span className="text-lg font-bold text-accent">{product.price}</span>
                  <Button asChild variant="ghost" size="sm" className="gap-1">
                    <Link to={product.path}>
                      View Details <ChevronRight size={14} />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="gap-1">
              <Link to="/agriculture">
                View All Products <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedSection;
