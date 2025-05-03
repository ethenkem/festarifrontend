import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Clock, GraduationCap, PlayCircle, CheckCircle, 
  Star, StarHalf, BarChart, FileText, Download, Globe, Award, User
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { useToast } from '@/hooks/use-toast';

// Mock course data
const courseData = {
  id: "course1",
  title: "Real Estate Investment Fundamentals",
  subtitle: "Master the essentials of successful real estate investment",
  description: `This comprehensive course covers the fundamental principles of real estate investment, providing you with the knowledge and tools needed to make informed investment decisions. From property valuation and market analysis to financing strategies and risk management, you'll gain a solid foundation in all aspects of real estate investing.

  Designed for both beginners and those looking to refine their investment approach, this course combines theoretical concepts with practical applications, case studies, and real-world examples.`,
  instructor: "Dr. James Wilson",
  instructorTitle: "Professor of Real Estate Finance, University of Economics",
  instructorBio: "Dr. Wilson has over 15 years of experience in real estate investment and finance. He has authored numerous publications on real estate economics and has consulted for major property development firms.",
  instructorImage: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&q=80",
  price: 199,
  currency: "USD",
  duration: "6 weeks",
  level: "Beginner",
  rating: 4.7,
  ratingCount: 243,
  enrollmentCount: 1250,
  lastUpdated: "2024-01-15",
  language: "English",
  certificate: true,
  featured: true,
  image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&q=80",
  preview: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  modules: [
    {
      id: "mod1",
      title: "Introduction to Real Estate Investment",
      description: "Understanding the fundamentals of real estate as an investment class",
      duration: "45 minutes",
      lectures: [
        { id: "lec1", title: "Course Overview", duration: "5 minutes", type: "video" },
        { id: "lec2", title: "What is Real Estate Investment?", duration: "12 minutes", type: "video" },
        { id: "lec3", title: "Types of Real Estate Investments", duration: "15 minutes", type: "video" },
        { id: "lec4", title: "Key Market Concepts", duration: "13 minutes", type: "video" },
        { id: "lec5", title: "Module Quiz", type: "quiz" }
      ]
    },
    {
      id: "mod2",
      title: "Property Valuation Methods",
      description: "Learn different approaches to valuing real estate assets",
      duration: "1 hour 20 minutes",
      lectures: [
        { id: "lec6", title: "Comparative Market Analysis", duration: "18 minutes", type: "video" },
        { id: "lec7", title: "Income Approach to Valuation", duration: "22 minutes", type: "video" },
        { id: "lec8", title: "Cost Approach to Valuation", duration: "15 minutes", type: "video" },
        { id: "lec9", title: "Practical Valuation Exercise", duration: "25 minutes", type: "exercise" },
        { id: "lec10", title: "Module Quiz", type: "quiz" }
      ]
    },
    {
      id: "mod3",
      title: "Financing Real Estate Investments",
      description: "Explore various financing options and strategies for real estate",
      duration: "1 hour 35 minutes",
      lectures: [
        { id: "lec11", title: "Mortgage Fundamentals", duration: "20 minutes", type: "video" },
        { id: "lec12", title: "Commercial Financing Options", duration: "18 minutes", type: "video" },
        { id: "lec13", title: "Creative Financing Strategies", duration: "22 minutes", type: "video" },
        { id: "lec14", title: "Leverage and Risk", duration: "15 minutes", type: "video" },
        { id: "lec15", title: "Financing Case Studies", duration: "20 minutes", type: "video" },
        { id: "lec16", title: "Module Quiz", type: "quiz" }
      ]
    },
    {
      id: "mod4",
      title: "Market Analysis and Investment Strategy",
      description: "Learn to analyze markets and develop effective investment strategies",
      duration: "1 hour 50 minutes",
      lectures: [
        { id: "lec17", title: "Macro and Micro Market Analysis", duration: "25 minutes", type: "video" },
        { id: "lec18", title: "Demographic and Economic Indicators", duration: "20 minutes", type: "video" },
        { id: "lec19", title: "Investment Strategy Development", duration: "25 minutes", type: "video" },
        { id: "lec20", title: "Risk Management", duration: "18 minutes", type: "video" },
        { id: "lec21", title: "Strategy Implementation", duration: "22 minutes", type: "video" },
        { id: "lec22", title: "Module Quiz", type: "quiz" }
      ]
    },
    {
      id: "mod5",
      title: "Due Diligence and Property Management",
      description: "Essential processes for property evaluation and management",
      duration: "1 hour 40 minutes",
      lectures: [
        { id: "lec23", title: "Due Diligence Process", duration: "22 minutes", type: "video" },
        { id: "lec24", title: "Legal and Regulatory Considerations", duration: "18 minutes", type: "video" },
        { id: "lec25", title: "Property Management Fundamentals", duration: "20 minutes", type: "video" },
        { id: "lec26", title: "Tenant Relations and Leasing", duration: "15 minutes", type: "video" },
        { id: "lec27", title: "Property Maintenance and Improvement", duration: "25 minutes", type: "video" },
        { id: "lec28", title: "Module Quiz", type: "quiz" }
      ]
    },
    {
      id: "mod6",
      title: "Advanced Investment Strategies and Exit Plans",
      description: "Explore sophisticated strategies and plan for investment exits",
      duration: "1 hour 30 minutes",
      lectures: [
        { id: "lec29", title: "Portfolio Diversification", duration: "18 minutes", type: "video" },
        { id: "lec30", title: "Value-Add Strategies", duration: "20 minutes", type: "video" },
        { id: "lec31", title: "Real Estate Syndication", duration: "15 minutes", type: "video" },
        { id: "lec32", title: "Exit Strategy Planning", duration: "17 minutes", type: "video" },
        { id: "lec33", title: "Final Case Study", duration: "20 minutes", type: "video" },
        { id: "lec34", title: "Final Course Assessment", type: "quiz" }
      ]
    }
  ],
  learningOutcomes: [
    "Understand the fundamentals of real estate as an investment asset class",
    "Apply different valuation methods to determine property values",
    "Evaluate financing options and strategies for real estate investments",
    "Conduct comprehensive market analysis to identify investment opportunities",
    "Develop effective investment strategies based on market conditions and goals",
    "Implement proper due diligence processes when evaluating properties",
    "Apply property management principles to maximize investment returns",
    "Create and execute exit strategies for real estate investments"
  ],
  requirements: [
    "Basic understanding of financial concepts",
    "No prior real estate experience required",
    "Computer with internet connection",
    "Spreadsheet software (Excel or equivalent)"
  ]
};

// Calculate total lecture count
const totalLectures = courseData.modules.reduce((count, module) => count + module.lectures.length, 0);

// Calculate total course duration
const totalDuration = courseData.modules.reduce((total, module) => {
  const moduleDurationArray = module.duration.split(' ');
  let durationInMinutes = 0;
  
  if (moduleDurationArray[1].includes('hour')) {
    durationInMinutes += parseInt(moduleDurationArray[0]) * 60;
    if (moduleDurationArray.length > 2) {
      durationInMinutes += parseInt(moduleDurationArray[2]);
    }
  } else {
    durationInMinutes += parseInt(moduleDurationArray[0]);
  }
  
  return total + durationInMinutes;
}, 0);

// Format total duration
const formatTotalDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins > 0 ? `${mins} minute${mins !== 1 ? 's' : ''}` : ''}`;
};

const CourseDetails = () => {
  const { id } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleEnroll = () => {
    toast({
      title: "Enrollment Successful!",
      description: "You have been enrolled in this course.",
      variant: "default",
    });
  };
  
  const handleSaveCourse = () => {
    toast({
      title: "Course Saved",
      description: "The course has been added to your wishlist.",
      variant: "default",
    });
  };

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="pt-20">
        {/* Course Header */}
        <section className="relative">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-festari-900/90 to-festari-800/80 z-10"></div>
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          <div className="container-custom relative z-20 py-16">
            <Button 
              asChild
              variant="outline" 
              className="mb-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Link to="/research">
                <ArrowLeft size={16} className="mr-2" /> Back to Courses
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="md:w-2/3">
                <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                  {courseData.level} Level
                </span>
                
                <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                  {courseData.title}
                </h1>
                
                <p className="text-xl text-white/80 mb-6">
                  {courseData.subtitle}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center text-white">
                    <div className="flex items-center mr-1">
                      {Array.from({ length: 5 }).map((_, index) => (
                        index < Math.floor(courseData.rating) 
                          ? <Star key={index} size={18} className="fill-amber-400 text-amber-400" /> 
                          : index === Math.floor(courseData.rating) && courseData.rating % 1 !== 0 
                            ? <StarHalf key={index} size={18} className="fill-amber-400 text-amber-400" />
                            : <Star key={index} size={18} className="text-gray-400" />
                      ))}
                    </div>
                    <span className="font-medium">{courseData.rating}</span>
                    <span className="text-white/60 ml-1">({courseData.ratingCount} ratings)</span>
                  </div>
                  
                  <div className="text-white/80 flex items-center">
                    <GraduationCap size={18} className="mr-1" />
                    {courseData.enrollmentCount.toLocaleString()} students
                  </div>
                  
                  <div className="text-white/80 flex items-center">
                    <Clock size={18} className="mr-1" />
                    {formatTotalDuration(totalDuration)}
                  </div>
                  
                  <div className="text-white/80 flex items-center">
                    <Globe size={18} className="mr-1" />
                    {courseData.language}
                  </div>
                  
                  {courseData.certificate && (
                    <div className="text-white/80 flex items-center">
                      <Award size={18} className="mr-1" />
                      Certificate of Completion
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <img 
                    src={courseData.instructorImage} 
                    alt={courseData.instructor} 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{courseData.instructor}</p>
                    <p className="text-white/70 text-sm">{courseData.instructorTitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3 w-full">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-white">
                  <div className="text-3xl font-bold mb-4">
                    ${courseData.price} <span className="text-white/60 text-lg font-normal">USD</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90 text-white mb-3"
                    size="lg"
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-white/30 text-white hover:bg-white/10"
                    onClick={handleSaveCourse}
                  >
                    Add to Wishlist
                  </Button>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="text-sm">This course includes:</div>
                    <ul className="mt-2 space-y-2 text-white/80">
                      <li className="flex items-center">
                        <PlayCircle size={16} className="mr-2" />
                        {totalLectures} lectures
                      </li>
                      <li className="flex items-center">
                        <Clock size={16} className="mr-2" />
                        {formatTotalDuration(totalDuration)} total length
                      </li>
                      <li className="flex items-center">
                        <FileText size={16} className="mr-2" />
                        Downloadable resources
                      </li>
                      <li className="flex items-center">
                        <Globe size={16} className="mr-2" />
                        Full lifetime access
                      </li>
                      {courseData.certificate && (
                        <li className="flex items-center">
                          <Award size={16} className="mr-2" />
                          Certificate of completion
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Course Content */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="mb-12">
                  <TabsList className="mb-6">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                    <TabsTrigger value="instructor">Instructor</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview">
                    <div className="space-y-8">
                      <div>
                        <h2 className="text-2xl font-display font-bold text-festari-900 mb-4">
                          About This Course
                        </h2>
                        <div className="text-festari-600 space-y-4">
                          {courseData.description.split('\n\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-display font-bold text-festari-900 mb-4">
                          What You'll Learn
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {courseData.learningOutcomes.map((outcome, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                              <span className="text-festari-600">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-display font-bold text-festari-900 mb-4">
                          Requirements
                        </h2>
                        <ul className="space-y-2">
                          {courseData.requirements.map((requirement, index) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle size={18} className="mr-2 text-accent flex-shrink-0 mt-1" />
                              <span className="text-festari-600">{requirement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="curriculum">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-display font-bold text-festari-900">
                          Course Content
                        </h2>
                        <div className="text-sm text-festari-600">
                          {courseData.modules.length} modules • {totalLectures} lectures • {formatTotalDuration(totalDuration)} total length
                        </div>
                      </div>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {courseData.modules.map((module, index) => (
                          <AccordionItem key={module.id} value={module.id}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex flex-col text-left">
                                <div className="font-semibold text-festari-900">
                                  Module {index + 1}: {module.title}
                                </div>
                                <div className="text-sm text-festari-600 font-normal">
                                  {module.lectures.length} lectures • {module.duration}
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <ul className="space-y-2 pl-1">
                                {module.lectures.map((lecture, idx) => (
                                  <li key={lecture.id} className="flex items-center justify-between py-3 px-2 hover:bg-festari-50 rounded-md">
                                    <div className="flex items-center">
                                      {lecture.type === 'video' ? (
                                        <PlayCircle size={16} className="mr-3 text-accent" />
                                      ) : lecture.type === 'quiz' ? (
                                        <BarChart size={16} className="mr-3 text-accent" />
                                      ) : (
                                        <FileText size={16} className="mr-3 text-accent" />
                                      )}
                                      <span className="text-festari-700">
                                        {idx + 1}. {lecture.title}
                                      </span>
                                    </div>
                                    {lecture.duration && (
                                      <span className="text-sm text-festari-500">
                                        {lecture.duration}
                                      </span>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="instructor">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <img 
                        src={courseData.instructorImage} 
                        alt={courseData.instructor} 
                        className="w-32 h-32 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-2xl font-display font-bold text-festari-900 mb-2">
                          {courseData.instructor}
                        </h2>
                        <p className="text-festari-600 font-medium mb-4">
                          {courseData.instructorTitle}
                        </p>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center">
                            <GraduationCap size={18} className="mr-2 text-accent" />
                            <span className="text-festari-600">12 Courses</span>
                          </div>
                          <div className="flex items-center">
                            <Star size={18} className="mr-2 text-accent" />
                            <span className="text-festari-600">4.8 Instructor Rating</span>
                          </div>
                          <div className="flex items-center">
                            <User size={18} className="mr-2 text-accent" />
                            <span className="text-festari-600">15,000+ Students</span>
                          </div>
                        </div>
                        <p className="text-festari-600">
                          {courseData.instructorBio}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                
                {/* Course Preview */}
                <div className="bg-festari-50 p-6 rounded-xl mb-12">
                  <h2 className="text-2xl font-display font-bold text-festari-900 mb-4">
                    Course Preview
                  </h2>
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="100%"
                      src={courseData.preview}
                      title="Course Preview"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
                
                {/* Student Progress (for enrolled students) */}
                <div className="bg-white shadow rounded-xl p-6 border border-festari-100 mb-12">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-festari-900">
                      Your Progress
                    </h2>
                    <span className="text-accent font-medium">23% Complete</span>
                  </div>
                  <Progress value={23} className="h-2 mb-4" />
                  <div className="flex justify-between text-sm text-festari-600 mb-6">
                    <span>8 of 34 lectures completed</span>
                    <span>{formatTotalDuration(Math.round(totalDuration * 0.23))} of {formatTotalDuration(totalDuration)}</span>
                  </div>
                  <Button className="w-full">
                    Continue Learning
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <div className="bg-white shadow-md rounded-xl p-6 border border-festari-100 sticky top-24">
                  <h3 className="text-xl font-bold text-festari-900 mb-4">
                    Course Resources
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-3 bg-festari-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText size={18} className="mr-2 text-accent" />
                        <span className="text-festari-700">Course Syllabus</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-festari-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText size={18} className="mr-2 text-accent" />
                        <span className="text-festari-700">Investment Templates</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-festari-50 rounded-lg">
                      <div className="flex items-center">
                        <FileText size={18} className="mr-2 text-accent" />
                        <span className="text-festari-700">Case Study Materials</span>
                      </div>
                      <Button variant="ghost" size="icon">
                        <Download size={18} />
                      </Button>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-festari-900 mb-4">
                    Related Courses
                  </h3>
                  
                  <div className="space-y-4">
                    <Link 
                      to="/research/courses/advanced-valuation" 
                      className="flex gap-3 group"
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&q=80" 
                          alt="Advanced Property Valuation" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-festari-900 group-hover:text-accent transition-colors">
                          Advanced Property Valuation
                        </h4>
                        <div className="text-sm text-festari-600">Dr. Sarah Johnson</div>
                        <div className="flex items-center mt-1">
                          <div className="text-amber-500 flex">
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                          </div>
                          <span className="text-xs text-festari-500 ml-1">5.0</span>
                        </div>
                      </div>
                    </Link>
                    
                    <Link 
                      to="/research/courses/real-estate-finance" 
                      className="flex gap-3 group"
                    >
                      <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&q=80" 
                          alt="Real Estate Finance" 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-festari-900 group-hover:text-accent transition-colors">
                          Real Estate Finance
                        </h4>
                        <div className="text-sm text-festari-600">Prof. Michael Chen</div>
                        <div className="flex items-center mt-1">
                          <div className="text-amber-500 flex">
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <Star size={12} className="fill-current" />
                            <StarHalf size={12} className="fill-current" />
                          </div>
                          <span className="text-xs text-festari-500 ml-1">4.5</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-festari-50">
          <div className="container-custom">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-2xl font-display font-bold text-festari-900 mb-4">
                  Ready to Start Your Real Estate Investment Journey?
                </h2>
                <p className="text-festari-600 mb-6">
                  Enroll now and gain the knowledge and skills you need to make informed real estate investment decisions.
                </p>
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-base"
                  onClick={handleEnroll}
                >
                  Enroll for ${courseData.price}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetails;
