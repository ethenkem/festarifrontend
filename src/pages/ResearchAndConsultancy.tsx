
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  User, 
  Clock, 
  Calendar, 
  ExternalLink, 
  CheckCircle, 
  HardHat, 
  Search, 
  Leaf, 
  Database, 
  Shield, 
  WrenchIcon, 
  FileCheck, 
  Wrench, 
  Microscope,
  BookMarked,
  PenTool,
  Printer,
  FileSpreadsheet,
  School,
  Briefcase,
  Presentation,
  Filter
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ServiceGrid from '@/components/common/ServiceGrid';
import ServiceCard from '@/components/common/ServiceCard';
import ServiceCategory from '@/components/common/ServiceCategory';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';

const researchServices = [
  {
    title: "Mining & Engineering",
    icon: HardHat,
    description: "Expert services for mining operations and engineering projects",
    items: [
      { title: "Mining and Geotechnical Consulting", icon: Briefcase, description: "Expert consulting services for mining operations" },
      { title: "Geotechnical Engineering", icon: WrenchIcon, description: "Specialized engineering solutions for ground stability" },
      { title: "Mineral Exploration", icon: Search, description: "Comprehensive mineral exploration services" },
      { title: "Geotechnical Instrumentation", icon: Wrench, description: "Advanced monitoring solutions for geological stability" },
      { title: "Mining Equipment Sales and Rental", icon: Wrench, description: "Quality equipment solutions for mining operations" }
    ]
  },
  {
    title: "Research & Analysis",
    icon: Microscope,
    description: "Comprehensive research and analytical services",
    items: [
      { title: "Research and Development", icon: Microscope, description: "Innovative research programs for industry advancement" },
      { title: "Geological and Geotechnical Data Analysis", icon: Database, description: "In-depth geological assessments and data processing" },
      { title: "Market Analysis", icon: FileSpreadsheet, description: "Comprehensive market research for strategic planning" },
      { title: "Safety Audits", icon: Shield, description: "Thorough safety evaluations and recommendations" },
      { title: "Feasibility Studies", icon: Search, description: "Detailed project assessment and viability analysis" },
      { title: "Data Analysis, Modeling and Interpretation", icon: Database, description: "Advanced data processing and predictive modeling" }
    ]
  },
  {
    title: "Education & Training",
    icon: GraduationCap,
    description: "Professional development and educational services",
    items: [
      { title: "Mining Education and Training", icon: School, description: "Professional development programs for mining" },
      { title: "Training, Short Courses, and Capacity Building", icon: Presentation, description: "Targeted skills development programs" },
      { title: "Professional and Proficiency Certification Programs", icon: FileCheck, description: "Industry-recognized certification programs" },
      { title: "Academic Research Support Services", icon: BookMarked, description: "Assistance with academic research projects" }
    ]
  },
  {
    title: "Environmental & Safety",
    icon: Leaf,
    description: "Services focused on environmental protection and safety",
    items: [
      { title: "Environmental Impact Assessments", icon: Leaf, description: "Thorough environmental evaluations" },
      { title: "Resource Management", icon: Briefcase, description: "Efficient resource allocation and management strategies" },
      { title: "Geotechnical Remediation", icon: Wrench, description: "Site improvement and stabilization solutions" },
      { title: "Mining, Geotechnical and Environmental Advisory Services", icon: Briefcase, description: "Expert consultation on environmental compliance" }
    ]
  },
  {
    title: "Documentation & Writing",
    icon: FileText,
    description: "Professional document preparation and management services",
    items: [
      { title: "Professional and Technical Writing Services", icon: PenTool, description: "Expert documentation services for technical content" },
      { title: "Editing, Proofreading and Document Formatting", icon: FileText, description: "Quality assurance for written materials" },
      { title: "Printing, Binding and Document Production", icon: Printer, description: "Professional document production services" },
      { title: "Regulatory Compliance Documentation", icon: FileCheck, description: "Documentation preparation for regulatory requirements" }
    ]
  }
];

const courses = [
  {
    id: 'course1',
    title: 'Real Estate Investment Fundamentals',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&q=80',
    description: 'Learn the basics of real estate investment strategies, market analysis, and financial evaluation.',
    price: '$199',
    duration: '6 Weeks',
    level: 'Beginner',
    instructor: 'Dr. James Wilson',
    startDate: 'June 15, 2023',
    enrolled: 125,
    path: '/research/courses/investment-fundamentals',
  },
  {
    id: 'course2',
    title: 'Advanced Property Valuation',
    image: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?auto=format&q=80',
    description: 'Master the techniques for accurate property valuation, including comparative market analysis and income approach.',
    price: '$249',
    duration: '8 Weeks',
    level: 'Advanced',
    instructor: 'Prof. Sarah Johnson',
    startDate: 'July 10, 2023',
    enrolled: 94,
    path: '/research/courses/property-valuation',
  },
  {
    id: 'course3',
    title: 'Real Estate Law and Regulations',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&q=80',
    description: 'Understand the legal framework governing real estate transactions, contracts, and dispute resolution.',
    price: '$229',
    duration: '7 Weeks',
    level: 'Intermediate',
    instructor: 'Prof. Michael Chen',
    startDate: 'August 5, 2023',
    enrolled: 78,
    path: '/research/courses/real-estate-law',
  },
  {
    id: 'course4',
    title: 'Sustainable Development Practices',
    image: 'https://images.unsplash.com/photo-1489674267075-cee793167910?auto=format&q=80',
    description: 'Explore environmentally responsible approaches to property development and management.',
    price: '$179',
    duration: '5 Weeks',
    level: 'Intermediate',
    instructor: 'Dr. Emily Rodriguez',
    startDate: 'September 12, 2023',
    enrolled: 62,
    path: '/research/courses/sustainable-development',
  },
];

const publications = [
  {
    id: 'pub1',
    title: 'Urban Housing Affordability in Developing Economies',
    authors: 'Smith, J., Johnson, R., & Williams, M.',
    journal: 'Journal of Urban Economics',
    year: '2023',
    abstract: 'This paper examines the challenges of housing affordability in rapidly urbanizing cities across developing economies, proposing policy frameworks for sustainable solutions.',
    tags: ['Housing', 'Urban Policy', 'Development Economics'],
    url: 'https://example.com/journal1',
    openAccess: true,
  },
  {
    id: 'pub2',
    title: 'Property Valuation Models in Volatile Markets',
    authors: 'Anderson, K., Thompson, S., & Zhang, L.',
    journal: 'Real Estate Finance Journal',
    year: '2022',
    abstract: 'A comparative analysis of property valuation models and their effectiveness in accurately predicting market values during periods of high volatility.',
    tags: ['Valuation', 'Market Analysis', 'Risk Assessment'],
    url: 'https://example.com/journal2',
    openAccess: false,
  },
  {
    id: 'pub3',
    title: 'Impact of Climate Change on Coastal Real Estate Markets',
    authors: 'Rodriguez, E., Chen, M., & Patel, A.',
    journal: 'Environmental Economics Review',
    year: '2023',
    abstract: 'This research investigates how climate change projections and associated risks are being priced into coastal property markets across different regions.',
    tags: ['Climate Change', 'Coastal Properties', 'Risk Pricing'],
    url: 'https://example.com/journal3',
    openAccess: true,
  },
  {
    id: 'pub4',
    title: 'Technological Disruption in Commercial Real Estate',
    authors: 'Morgan, D., Wilson, J., & Yamamoto, H.',
    journal: 'Property Technology Review',
    year: '2022',
    abstract: 'An examination of how emerging technologies are transforming the commercial real estate sector, with case studies on proptech adoption and outcomes.',
    tags: ['PropTech', 'Commercial Real Estate', 'Digital Transformation'],
    url: 'https://example.com/journal4',
    openAccess: false,
  },
  {
    id: 'pub5',
    title: 'Rental Housing Market Dynamics Post-Pandemic',
    authors: 'Johnson, S., Barnes, T., & Li, W.',
    journal: 'Housing Studies Quarterly',
    year: '2023',
    abstract: 'Analysis of shifting demand patterns in urban rental markets following the COVID-19 pandemic and implications for property investors and urban planners.',
    tags: ['Rental Markets', 'Urban Planning', 'Post-Pandemic'],
    url: 'https://example.com/journal5',
    openAccess: true,
  },
];

const Research = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseLevel, setCourseLevel] = useState('All');
  const [publicationTag, setPublicationTag] = useState('All');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredServices([]);
      setActiveCategory(null);
      return;
    }
    
    const results = researchServices.flatMap(category => 
      category.items.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(query.toLowerCase()))
      ).map(item => ({
        ...item,
        category: category.title
      }))
    );
    
    setFilteredServices(results);
  };
  
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesLevel = courseLevel === 'All' || course.level === courseLevel;
    
    return matchesSearch && matchesLevel;
  });
  
  const filteredPublications = publications.filter(pub => {
    const matchesSearch = pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pub.authors.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = publicationTag === 'All' || pub.tags.some(tag => tag === publicationTag);
    
    return matchesSearch && matchesTag;
  });
  
  const allTags = Array.from(new Set(publications.flatMap(pub => pub.tags || [])));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Updated hero section with background image and indigo overlay */}
        <section 
          className="relative py-20 text-white bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=3000&auto=format&fit=crop')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo/90 to-indigo/70"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Research & Consultancy Hub
              </h1>
              <p className="text-festari-100 mb-6">
                Comprehensive solutions for mining engineering, research, and professional services
              </p>
              
              <div className="relative max-w-xl mx-auto">
                <Input
                  type="search"
                  placeholder="Search services, courses, and publications..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              </div>
              
              {filteredServices.length > 0 && (
                <div className="mt-4 bg-white text-festari-900 rounded-lg shadow-lg p-4 max-h-60 overflow-y-auto absolute z-10 left-0 right-0 mx-auto max-w-xl">
                  <p className="text-sm font-medium text-festari-600 mb-2">
                    {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
                  </p>
                  <div className="space-y-2">
                    {filteredServices.map((service, idx) => (
                      <Link 
                        key={idx} 
                        to={`/consultation?service=${encodeURIComponent(service.title)}&category=${encodeURIComponent(service.category)}`}
                        className="flex items-start p-2 hover:bg-festari-50 rounded group"
                      >
                        <div className="bg-indigo/10 text-indigo p-1 rounded mr-3 flex-shrink-0">
                          {service.icon && <service.icon size={18} />}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-indigo transition-colors">{service.title}</p>
                          <p className="text-xs text-festari-600">{service.category}</p>
                          {service.description && <p className="text-xs text-festari-500 mt-1">{service.description}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="default" className="bg-white text-indigo hover:bg-white/90">
                  <Link to="/consultation">Request Consultation</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-festari-50" id="services">
          <div className="container-custom">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="publications">Publications</TabsTrigger>
                <TabsTrigger value="consultation">Consultation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-3">Our Professional Services</h2>
                  <p className="text-festari-600 max-w-2xl mx-auto">
                    Comprehensive services for mining engineering, research, and professional documentation
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  {researchServices.map((category, idx) => (
                    <Button 
                      key={idx}
                      variant={activeCategory === category.title ? "default" : "outline"}
                      className="flex items-center gap-2 justify-start"
                      onClick={() => setActiveCategory(activeCategory === category.title ? null : category.title)}
                    >
                      <category.icon size={18} />
                      <span>{category.title}</span>
                    </Button>
                  ))}
                  {activeCategory && (
                    <Button 
                      variant="ghost" 
                      className="text-festari-500"
                      onClick={() => setActiveCategory(null)}
                    >
                      Clear Filter
                    </Button>
                  )}
                </div>
                
                <div className="space-y-10">
                  {researchServices
                    .filter(category => !activeCategory || category.title === activeCategory)
                    .map((category, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-indigo/10 text-indigo">
                            <category.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{category.title}</h3>
                            <p className="text-festari-600 text-sm">{category.description}</p>
                          </div>
                        </div>
                        
                        <ServiceGrid columns={3}>
                          {category.items.map((service, serviceIdx) => (
                            <ServiceCard
                              key={serviceIdx}
                              title={service.title}
                              description={service.description}
                              icon={service.icon || category.icon}
                              color="bg-indigo/5 text-indigo"
                              link={`/consultation?service=${encodeURIComponent(service.title)}&category=${encodeURIComponent(category.title)}`}
                            />
                          ))}
                        </ServiceGrid>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="courses" className="space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <h2 className="text-2xl font-display font-bold text-festari-900">Educational Courses</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-festari-600">Level:</span>
                    <select 
                      className="p-2 border border-festari-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                    >
                      <option value="All">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredCourses.map((course) => (
                    <div 
                      key={course.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold py-1 px-2 rounded">
                          {course.level}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-lg font-semibold text-festari-900 mb-2">
                          {course.title}
                        </h3>
                        <p className="text-sm text-festari-600 mb-4">
                          {course.description}
                        </p>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          <div className="flex items-center gap-2">
                            <User size={14} className="text-festari-500" />
                            <span className="text-sm text-festari-700">{course.instructor}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-festari-500" />
                            <span className="text-sm text-festari-700">{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className="text-festari-500" />
                            <span className="text-sm text-festari-700">Starts: {course.startDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap size={14} className="text-festari-500" />
                            <span className="text-sm text-festari-700">{course.enrolled} enrolled</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-festari-100">
                          <span className="text-lg font-bold text-accent">{course.price}</span>
                          <button className="text-sm text-white bg-accent hover:bg-accent/90 px-4 py-2 rounded transition-colors">
                            Enroll Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredCourses.length === 0 && (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <GraduationCap size={48} className="text-festari-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-festari-800 mb-2">No courses found</h3>
                    <p className="text-festari-600 mb-4">Try adjusting your search criteria or filters</p>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setSearchQuery('');
                        setCourseLevel('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="publications" className="space-y-8">
                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <h2 className="text-2xl font-display font-bold text-festari-900">Research Publications</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-festari-600">Topic:</span>
                    <select 
                      className="p-2 border border-festari-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                      value={publicationTag}
                      onChange={(e) => setPublicationTag(e.target.value)}
                    >
                      <option value="All">All Topics</option>
                      {allTags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {filteredPublications.map((publication) => (
                    <div 
                      key={publication.id}
                      className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-festari-900 mb-2">
                            {publication.title}
                          </h3>
                          <p className="text-sm text-festari-700 mb-1">
                            {publication.authors}
                          </p>
                          <p className="text-sm text-festari-600 mb-3">
                            {publication.journal}, {publication.year}
                          </p>
                        </div>
                        <div className="bg-festari-100 text-festari-800 px-3 py-1 rounded-full text-xs font-medium">
                          {publication.openAccess ? 'Open Access' : 'Subscription'}
                        </div>
                      </div>
                      
                      <p className="text-sm text-festari-600 mb-4">
                        {publication.abstract}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {publication.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="bg-festari-100 text-festari-700 text-xs px-2 py-1 rounded"
                            onClick={() => setPublicationTag(tag)}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-end">
                        <a 
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm flex items-center gap-1 text-accent hover:underline"
                        >
                          View Publication <ExternalLink size={14} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredPublications.length === 0 && (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <FileText size={48} className="text-festari-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-festari-800 mb-2">No publications found</h3>
                    <p className="text-festari-600 mb-4">Try adjusting your search criteria or filters</p>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setSearchQuery('');
                        setPublicationTag('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="consultation" className="space-y-8">
                <div className="max-w-3xl mx-auto">
                  <ConsultationRequestForm 
                    serviceCategories={[
                      {
                        title: "Research & Consultancy",
                        path: "/research",
                        description: "Professional research and consulting services",
                        activities: researchServices.flatMap(category => 
                          category.items.map(item => ({ 
                            title: item.title,
                            description: item.description
                          }))
                        )
                      }
                    ]}
                    title="Request a Research Consultation"
                    description="Our team of experts is ready to assist you with specialized solutions tailored to your research and consulting needs."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-gradient-to-r from-festari-800 to-indigo text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Work With Industry Experts?
            </h2>
            <p className="text-festari-100 mb-8 max-w-2xl mx-auto">
              Our team of qualified professionals is ready to help you with your research, consulting, and educational needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-indigo hover:bg-white/90">
                <Link to="/consultation">Request a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Research;
