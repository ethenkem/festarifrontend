
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  Truck as TruckIcon, 
  Package, 
  Store, 
  BarChart3, 
  ClipboardList, 
  Users, 
  ShoppingBag, 
  Truck, 
  Briefcase, 
  CreditCard, 
  UserCheck, 
  Settings, 
  Map, 
  Package2, 
  LineChart, 
  BookOpen, 
  Building, 
  DollarSign, 
  Scissors, 
  Shirt, 
  Trash2, 
  Utensils, 
  MessageSquare, 
  Home, 
  CalendarIcon,
  Cherry, 
  Globe, 
  Smartphone, 
  Hammer, 
  Heart, 
  BadgePercent,
  Search, 
  CheckCircle, 
  User 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import ServiceGrid from '@/components/common/ServiceGrid';
import ServiceCard from '@/components/common/ServiceCard';
import ServiceCategory from '@/components/common/ServiceCategory';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';

const tradingServices = [
  {
    title: "Retail & Distribution",
    icon: Store,
    description: "Retail sales and distribution services",
    items: [
      { title: "Retail Sales", icon: ShoppingCart, description: "Consumer retail services" },
      { title: "Wholesale Distribution", icon: Package, description: "B2B distribution services" },
      { title: "Import and Export", icon: Globe, description: "International trade services" },
      { title: "E-commerce Operations", icon: Smartphone, description: "Online retail solutions" },
      { title: "General Trading and Merchandise", icon: ShoppingBag, description: "Merchandise services" }
    ]
  },
  {
    title: "Supply Chain",
    icon: TruckIcon,
    description: "Supply chain management and logistics",
    items: [
      { title: "Product Sourcing", icon: Search, description: "Supply chain solutions" },
      { title: "Inventory Management", icon: ClipboardList, description: "Stock control services" },
      { title: "Supply Chain Management", icon: Truck, description: "Supply chain optimization" },
      { title: "Logistics and Distribution", icon: TruckIcon, description: "Distribution services" },
      { title: "Vendor Relationships", icon: UserCheck, description: "Supplier relationship services" }
    ]
  },
  {
    title: "Business Operations",
    icon: Briefcase,
    description: "Business management and operational services",
    items: [
      { title: "Marketing and Promotion", icon: BadgePercent, description: "Promotional services" },
      { title: "Customer Service", icon: MessageSquare, description: "Client support services" },
      { title: "Product Quality Control", icon: CheckCircle, description: "Product quality assurance" },
      { title: "Market Research", icon: BarChart3, description: "Market analysis services" },
      { title: "Inventory Forecasting", icon: LineChart, description: "Inventory prediction services" },
      { title: "Product Development", icon: Settings, description: "New product innovation" },
      { title: "Business Expansion", icon: Building, description: "Growth consulting services" },
      { title: "Trade Shows and Exhibitions", icon: Users, description: "Exhibition services" }
    ]
  },
  {
    title: "Financial Services",
    icon: DollarSign,
    description: "Financial and payment services",
    items: [
      { title: "Mobile Money Services", icon: Smartphone, description: "Digital financial services" },
      { title: "Credit Transfer Services", icon: CreditCard, description: "Financial transfer services" }
    ]
  }
];

const serviceActivities = [
  {
    title: "Personal Services",
    icon: User,
    description: "Services for individuals and households",
    items: [
      { title: "Barbering Services", icon: Scissors, description: "Hair cutting services" },
      { title: "Hairdressing and Salon", icon: Scissors, description: "Beauty and hair services" },
      { title: "Clothing and Boutique", icon: Shirt, description: "Fashion retail services" },
      { title: "Personal Shopping and Errand Services", icon: ShoppingBag, description: "Errand and shopping" },
      { title: "Health and Wellness Services", icon: Heart, description: "Wellness programs" }
    ]
  },
  {
    title: "Home & Property",
    icon: Home,
    description: "Services for home and property maintenance",
    items: [
      { title: "House Cleaning Services", icon: Home, description: "Professional cleaning" },
      { title: "Home Repair and Maintenance", icon: Hammer, description: "Maintenance and repair" },
      { title: "Lawn Care and Landscaping", icon: Scissors, description: "Outdoor maintenance" },
      { title: "Home Renovation and Remodeling", icon: Hammer, description: "Remodeling services" },
      { title: "Waste Management Services", icon: Trash2, description: "Waste handling solutions" }
    ]
  },
  {
    title: "Business Services",
    icon: Briefcase,
    description: "Services for businesses and organizations",
    items: [
      { title: "Delivery Services", icon: Truck, description: "Transport and delivery" },
      { title: "Catering Services", icon: Utensils, description: "Food service solutions" },
      { title: "Event Planning and Hosting", icon: CalendarIcon, description: "Event management services" },
      { title: "Transportation Services", icon: Truck, description: "Transport services" },
      { title: "Digital Marketing Services", icon: Globe, description: "Online marketing solutions" },
      { title: "Hospitality Services", icon: Building, description: "Hotel and accommodation" },
      { title: "Pet Care Services", icon: Cherry, description: "Animal care services" }
    ]
  }
];

const Enterprise = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('trading');
  
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (!query.trim()) {
      setFilteredServices([]);
      return;
    }
    
    const allServices = [...tradingServices, ...serviceActivities];
    
    const results = allServices.flatMap(category => 
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
            backgroundImage: "url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&q=80')"
          }}
        >
          {/* Added orange overlay to maintain enterprise color scheme */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-800/80 to-orange-700/70"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Festari Enterprise</h1>
              <p className="text-white/90 mb-8">Comprehensive trading and service solutions for businesses and individuals.</p>
              
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search enterprise services..."
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
                        <div className="bg-orange-100 text-orange-700 p-1 rounded mr-3 flex-shrink-0">
                          {service.icon && <service.icon size={18} />}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-orange-700 transition-colors">{service.title}</p>
                          <p className="text-xs text-festari-600">{service.category}</p>
                          {service.description && <p className="text-xs text-festari-500 mt-1">{service.description}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild variant="white" className="font-medium">
                  <a href="#services">Our Services</a>
                </Button>
                <Button asChild variant="transparent" className="border-white/30 text-white hover:bg-white/10">
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
                  <ShoppingCart size={16} />
                  <span>Services</span>
                </TabsTrigger>
                <TabsTrigger value="consultation" className="flex items-center gap-2">
                  <MessageSquare size={16} />
                  <span>Consultation</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="services" className="space-y-10">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-3">Enterprise Services</h2>
                  <p className="text-festari-600 max-w-2xl mx-auto">
                    Comprehensive trading and service solutions for businesses and individuals
                  </p>
                </div>
                
                <div className="flex overflow-x-auto md:overflow-visible border-b border-festari-200 mb-8 pb-1">
                  <button
                    className={cn(
                      "py-3 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
                      activeTab === 'trading' 
                        ? "border-orange-500 text-orange-700" 
                        : "border-transparent text-festari-600 hover:text-festari-900"
                    )}
                    onClick={() => setActiveTab('trading')}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart size={18} />
                      <span>Trading</span>
                    </div>
                  </button>
                  <button
                    className={cn(
                      "py-3 px-6 font-medium text-sm border-b-2 transition-colors whitespace-nowrap",
                      activeTab === 'services' 
                        ? "border-orange-500 text-orange-700" 
                        : "border-transparent text-festari-600 hover:text-festari-900"
                    )}
                    onClick={() => setActiveTab('services')}
                  >
                    <div className="flex items-center gap-2">
                      <Briefcase size={18} />
                      <span>Services</span>
                    </div>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {(activeTab === 'trading' ? tradingServices : serviceActivities).map((category, idx) => (
                    <Button 
                      key={idx}
                      variant={activeCategory === category.title ? "accent" : "outline"}
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
                  {(activeTab === 'trading' ? tradingServices : serviceActivities)
                    .filter(category => !activeCategory || category.title === activeCategory)
                    .map((category, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
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
                              color="bg-orange-100 text-orange-700"
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
                        title: "Enterprise",
                        path: "/enterprise",
                        description: "Trading and service solutions",
                        activities: [...tradingServices, ...serviceActivities].flatMap(category => 
                          category.items.map(item => ({ 
                            title: item.title,
                            description: item.description
                          }))
                        )
                      }
                    ]}
                    title="Enterprise Consultation Request"
                    description="Our enterprise experts are ready to assist you with trading operations, service delivery, and business development."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-orange-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-display font-bold mb-3">Why Choose Our Enterprise Services</h2>
              <p className="text-festari-600 max-w-2xl mx-auto">
                Our team combines business expertise with modern techniques to deliver efficient and profitable enterprise solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-orange-100 text-orange-700 inline-block mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                <p className="text-festari-600">
                  We maintain high standards across all our trading and service operations to ensure customer satisfaction.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-orange-100 text-orange-700 inline-block mb-4">
                  <LineChart size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Business Growth</h3>
                <p className="text-festari-600">
                  Our strategic approach helps businesses scale operations and increase market presence effectively.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="p-3 rounded-full bg-orange-100 text-orange-700 inline-block mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Customer Focus</h3>
                <p className="text-festari-600">
                  We prioritize customer needs and preferences to deliver personalized and satisfying service experiences.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-orange-700 text-white">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Whether you're looking to start a new venture, improve your current operations, or expand your business, our team is here to help.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" variant="white" className="font-medium">
                <Link to="/consultation">Request Enterprise Consultation</Link>
              </Button>
              <Button asChild variant="transparent" size="lg" className="border-white/30 text-white hover:bg-white/10">
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

export default Enterprise;
