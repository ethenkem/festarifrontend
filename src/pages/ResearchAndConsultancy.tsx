
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HardHat,
  Search,
  Leaf,
  Stethoscope,
  Gavel,
  Users,
  LeafIcon,
  BrainCircuit,
  LineChart,
  HardHatIcon,
  ChartLine
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ServiceGrid from '@/components/common/ServiceGrid';
import ServiceCard from '@/components/common/ServiceCard';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';
import { BACKEND_URL } from '@/configs/constants';
import axios from 'axios';
import Lottie from 'lottie-react';
import festariLoading from "../assets/festariLoading.json"

const researchIconMapper = {
  Helmet: HardHat,
  ChartLine: ChartLine,
  BrainCircuit: BrainCircuit,
  Leaf: Leaf,
  Users: Users,
  Stethoscope: Stethoscope,
  Gavel: Gavel
};

const Research = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseLevel, setCourseLevel] = useState('All');
  const [publicationTag, setPublicationTag] = useState('All');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [researchServices, setResearchService] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([])
  const [publications, setPublications] = useState<any[]>([])
  const lottieRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesResponse, researchResponse, publicationsResponse] = await Promise.all([
          axios.get(`${BACKEND_URL}/v1/education/courses/`),
          axios.get(`${BACKEND_URL}/v1/education/research-services/`),
          axios.get((`${BACKEND_URL}/v1/education/publications/`))
        ]);

        setCourses(coursesResponse.data);
        setPublications(publicationsResponse.data)
        const mappedResearch = researchResponse.data.map((category: any) => ({
          ...category,
          IconComponent: researchIconMapper[category.icon] || null,
          items: category.items,
        }));
        setResearchService(mappedResearch);

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    const matchesSearch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow mt-20">

          <div>
            <Lottie
              size={10}
              lottieRef={lottieRef}
              animationData={festariLoading}
              loop={false}
            />

          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-20">
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
              <TabsList className="flex md:space-x-10 border py-5 grid-cols-2 mb-8">
                <TabsTrigger value="services">Research Services</TabsTrigger>
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
                      <category.IconComponent size={18} />
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
                            <category.IconComponent size={24} />
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
                              icon={category.IconComponent}
                              color="bg-indigo/5 text-indigo"
                              link={`/consultation?service=${encodeURIComponent(service.title)}&category=${encodeURIComponent(category.title)}`}
                            />
                          ))}
                        </ServiceGrid>
                      </div>
                    ))}
                </div>
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
