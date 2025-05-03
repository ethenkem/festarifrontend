import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Tractor, 
  Briefcase, 
  Wrench, 
  Beaker, 
  Users, 
  Factory, 
  Sprout, 
  ShoppingBag, 
  Search, 
  GraduationCap, 
  Bug, 
  DollarSign, 
  LineChart, 
  Home, 
  FlowerIcon, 
  PackageOpen, 
  Recycle,
  Download,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ServiceGrid from '@/components/common/ServiceGrid';
import ServiceCard from '@/components/common/ServiceCard';
import ServiceCategory from '@/components/common/ServiceCategory';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';

const agriServices = [
  {
    title: "Farming Operations",
    icon: Tractor,
    description: "Core agricultural production services",
    items: [
      { title: "Crop Farming", icon: Sprout, description: "Sustainable crop production and management" },
      { title: "Livestock Farming", icon: Leaf, description: "Animal husbandry and livestock management" },
      { title: "Greenhouse and Hydroponic Farming", icon: FlowerIcon, description: "Modern controlled environment agriculture" },
      { title: "Organic Farming", icon: Leaf, description: "Certified organic cultivation practices" }
    ]
  },
  {
    title: "Business Services",
    icon: Briefcase,
    description: "Agricultural business development and support",
    items: [
      { title: "Agribusiness Consulting", icon: Briefcase, description: "Expert agricultural business advice" },
      { title: "Agricultural Equipment Sales and Rental", icon: Wrench, description: "Quality farming equipment solutions" },
      { title: "Farm Management Services", icon: Users, description: "Comprehensive farm operations management" },
      { title: "Agribusiness Investment", icon: DollarSign, description: "Agricultural investment opportunities" },
      { title: "Agricultural Marketing", icon: LineChart, description: "Strategic marketing for farm products" }
    ]
  },
  {
    title: "Technical Services",
    icon: Beaker,
    description: "Specialized agricultural technical support",
    items: [
      { title: "Crop and Soil Analysis", icon: Beaker, description: "Scientific testing of crops and soil" },
      { title: "Pest and Disease Control", icon: Bug, description: "Integrated pest management solutions" },
      { title: "Agricultural Research", icon: Search, description: "Innovative farming research and development" },
      { title: "Sale of Agrochemicals", icon: PackageOpen, description: "Quality agricultural supplies and chemicals" }
    ]
  },
  {
    title: "Supply & Processing",
    icon: Factory,
    description: "Agricultural supply chain and processing services",
    items: [
      { title: "Agro-processing", icon: Factory, description: "Value-added agricultural processing" },
      { title: "Farm-to-Table Sales", icon: ShoppingBag, description: "Direct marketing of farm produce" },
      { title: "Agricultural Supply Chain Management", icon: PackageOpen, description: "Optimized supply chain solutions" },
      { title: "Sustainable Agriculture", icon: Recycle, description: "Environmentally responsible farming practices" }
    ]
  },
  {
    title: "Education & Development",
    icon: GraduationCap,
    description: "Agricultural knowledge and community development",
    items: [
      { title: "Farm Education and Training", icon: GraduationCap, description: "Practical agricultural training programs" },
      { title: "Rural Development", icon: Home, description: "Community agricultural development initiatives" }
    ]
  }
];

const AgriBusiness = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (!query.trim()) {
      setFilteredServices([]);
      return;
    }
    
    const results = agriServices.flatMap(category => 
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative py-20 text-white bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/85 to-green-700/75"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Festari Agribusiness</h1>
              <p className="text-white/90 mb-8">Sustainable farming solutions, agricultural expertise, and modern farming technologies for optimal yield and growth.</p>
              
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search agricultural services..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
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
                        <div className="bg-green-100 text-green-700 p-1 rounded mr-3 flex-shrink-0">
                          {service.icon && <service.icon size={18} />}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-green-700 transition-colors">{service.title}</p>
                          <p className="text-xs text-festari-600">{service.category}</p>
                          {service.description && <p className="text-xs text-festari-500 mt-1">{service.description}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-white text-green-700 hover:bg-white/90">
                  <a href="#services">Our Services</a>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <Link to="/consultation">Request Consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-festari-50" id="services">
          <div className="container-custom">
            <Tabs defaultValue="services" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="services" className="flex items-center gap-2">
                  <Tractor size={16} />
                  <span>Services</span>
                </TabsTrigger>
                <TabsTrigger value="consultation" className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>Consultation</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-3">Agricultural Services</h2>
                  <p className="text-festari-600 max-w-2xl mx-auto">
                    Comprehensive agriculture solutions from farming operations to business development and technical support
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                  {agriServices.map((category, idx) => (
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
                
                <div className="space-y-12">
                  {agriServices
                    .filter(category => !activeCategory || category.title === activeCategory)
                    .map((category, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100 text-green-700">
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
                              color="bg-green-100 text-green-700"
                              link={`/consultation?service=${encodeURIComponent(service.title)}&category=${encodeURIComponent(category.title)}`}
                            />
                          ))}
                        </ServiceGrid>
                      </div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="consultation">
                <div className="max-w-3xl mx-auto">
                  <ConsultationRequestForm 
                    serviceCategories={[
                      {
                        title: "Agribusiness",
                        path: "/agribusiness",
                        description: "Agricultural business services",
                        activities: agriServices.flatMap(category => 
                          category.items.map(item => ({ 
                            title: item.title,
                            description: item.description
                          }))
                        )
                      }
                    ]}
                    title="Agricultural Consultation Request"
                    description="Our agricultural experts are ready to assist you with farming operations, business development, and technical support."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-green-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-display font-bold mb-3">Why Choose Our Agricultural Services</h2>
              <p className="text-festari-600 max-w-2xl mx-auto">
                Our team combines agricultural expertise with modern techniques to deliver sustainable and profitable farming solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-green-100 text-green-700 inline-block mb-4">
                  <Leaf size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Sustainable Practices</h3>
                <p className="text-festari-600">
                  We implement environmentally friendly farming methods that maintain long-term productivity while protecting natural resources.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-green-100 text-green-700 inline-block mb-4">
                  <LineChart size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Increased Productivity</h3>
                <p className="text-festari-600">
                  Our modern techniques and expert guidance help maximize yield and quality across all types of agricultural operations.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-green-100 text-green-700 inline-block mb-4">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Business Growth</h3>
                <p className="text-festari-600">
                  We provide comprehensive business support to transform your agricultural operations into profitable enterprises.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-green-700 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Grow with Us?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're looking to start farming, improve your current operations, or expand your agricultural business, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-green-700 hover:bg-white/90">
                <Link to="/consultation">Request Agricultural Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <Link to="/contact">Contact Our Team</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AgriBusiness;
