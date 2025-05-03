import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building, Home, Key, Banknote, FileCheck, Search, CheckCircle, ChevronDown, Filter, MapPin, Briefcase, LineChart, MessageSquare, Scale, ClipboardList, User, Paintbrush, DollarSign, Flag } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceGrid from '@/components/common/ServiceGrid';
import ServiceCard from '@/components/common/ServiceCard';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';

const estateServices = [
  {
    title: "Sales & Purchases",
    icon: Building,
    description: "Comprehensive property sales and acquisition services",
    items: [
      { title: "Real Estate Sales", icon: Home, description: "Professional property sales services" },
      { title: "Property Listings", icon: MapPin, description: "Comprehensive property listings" },
      { title: "Property Purchase Assistance", icon: Briefcase, description: "Expert buying guidance and support" },
      { title: "Land Sales and Development", icon: Flag, description: "Strategic land development opportunities" }
    ]
  },
  {
    title: "Rentals & Management",
    icon: Key,
    description: "Property rental and management solutions",
    items: [
      { title: "Property Rentals", icon: Home, description: "Quality rental property services" },
      { title: "Hostel Rentals", icon: Building, description: "Student accommodation services" },
      { title: "Property Management", icon: ClipboardList, description: "Complete property management solutions" },
      { title: "Tenant Placement Services", icon: User, description: "Tenant screening and placement" },
      { title: "Hostel Management Services", icon: Building, description: "Specialized student housing management" }
    ]
  },
  {
    title: "Advisory Services",
    icon: Briefcase,
    description: "Expert real estate consultation and market insights",
    items: [
      { title: "Market Analysis", icon: LineChart, description: "Comprehensive real estate market insights" },
      { title: "Property Marketing", icon: MessageSquare, description: "Strategic property promotion services" },
      { title: "Negotiation", icon: Scale, description: "Expert property negotiations" },
      { title: "Property Appraisals", icon: DollarSign, description: "Accurate property valuation services" },
      { title: "Real Estate Consultation", icon: Briefcase, description: "Personalized property advice" }
    ]
  },
  {
    title: "Support Services",
    icon: FileCheck,
    description: "Auxiliary real estate services and compliance",
    items: [
      { title: "Legal and Regulatory Compliance", icon: FileCheck, description: "Ensuring property transactions meet all legal requirements" },
      { title: "Property Inspections", icon: Search, description: "Thorough property assessments" },
      { title: "Property Renovation and Staging", icon: Paintbrush, description: "Property enhancement services" },
      { title: "Real Estate Financing Assistance", icon: Banknote, description: "Guidance on property financing options" }
    ]
  }
];

const propertyListings = [
  {
    id: 'prop1',
    title: 'Luxury Apartment with City View',
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&q=80',
    price: '$2,500/mo',
    location: 'Downtown',
    type: 'Rental',
    features: '2 Bed • 2 Bath • 1,200 sqft',
    description: 'This modern apartment offers panoramic city views, premium finishes, and access to luxury amenities including a fitness center and rooftop pool.',
    path: '/estates/luxury-apartment',
  },
  {
    id: 'prop2',
    title: 'Modern Villa with Pool',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&q=80',
    price: '$850,000',
    location: 'Suburban',
    type: 'Sale',
    features: '4 Bed • 3 Bath • 2,800 sqft',
    description: 'Stunning contemporary villa with an open floor plan, high ceilings, and a private backyard with pool and outdoor entertainment area.',
    path: '/estates/modern-villa',
  },
  {
    id: 'prop3',
    title: 'Office Space in Business District',
    image: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&q=80',
    price: '$3,200/mo',
    location: 'Financial District',
    type: 'Rental',
    features: 'Open Floor • 1,800 sqft • 5th Floor',
    description: 'Prime office space in the heart of the business district with modern amenities, meeting rooms, and breathtaking views of the city skyline.',
    path: '/estates/office-space',
  },
  {
    id: 'prop4',
    title: 'Waterfront Penthouse',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80',
    price: '$1.2M',
    location: 'Harbor District',
    type: 'Sale',
    features: '3 Bed • 3.5 Bath • 2,400 sqft',
    description: 'Exclusive penthouse with floor-to-ceiling windows offering panoramic water views, premium finishes, and a private rooftop terrace.',
    path: '/estates/waterfront-penthouse',
  },
  {
    id: 'prop5',
    title: 'Cozy Studio Apartment',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&q=80',
    price: '$1,200/mo',
    location: 'Arts District',
    type: 'Rental',
    features: 'Studio • 1 Bath • 650 sqft',
    description: 'Charming studio apartment in the vibrant arts district, featuring hardwood floors, exposed brick, and modern appliances.',
    path: '/estates/cozy-studio',
  },
  {
    id: 'prop6',
    title: 'Historic Townhouse',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&q=80',
    price: '$675,000',
    location: 'Old Town',
    type: 'Sale',
    features: '3 Bed • 2.5 Bath • 2,100 sqft',
    description: 'Beautifully restored historic townhouse with original architectural details, updated systems, and a private garden.',
    path: '/estates/historic-townhouse',
  },
];

const EstatesAgency = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    if (!query.trim()) {
      setFilteredServices([]);
      return;
    }
    
    const results = estateServices.flatMap(category => 
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

  const filteredProperties = propertyListings.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || property.type === selectedType;
    
    const matchesPrice = priceRange === 'All' || 
                         (priceRange === 'Under $500K' && property.price.includes('$') && !property.price.includes('M')) ||
                         (priceRange === '$500K-$1M' && property.price.includes('$') && !property.price.includes('M')) ||
                         (priceRange === 'Over $1M' && property.price.includes('M'));
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <section 
          className="relative py-20 bg-cover bg-center text-white"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-chili/80 to-chili/70"></div>
          <div className="container-custom relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Find Your Ideal Property</h1>
              <p className="text-white/90 mb-8">Browse our exclusive collection of premium properties available for sale and rent, and explore our comprehensive real estate services.</p>
              
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search properties, services, or locations..."
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
                        <div className="bg-mikado/20 text-festari-900 p-1 rounded mr-3 flex-shrink-0">
                          {service.icon && <service.icon size={18} />}
                        </div>
                        <div>
                          <p className="font-medium group-hover:text-accent transition-colors">{service.title}</p>
                          <p className="text-xs text-festari-600">{service.category}</p>
                          {service.description && <p className="text-xs text-festari-500 mt-1">{service.description}</p>}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button asChild className="bg-white text-festari-900 hover:bg-white/90">
                  <a href="#properties">View Properties</a>
                </Button>
                <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <a href="#services">Our Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-festari-50" id="properties">
          <div className="container-custom">
            <Tabs defaultValue="properties" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="properties" onClick={() => setActiveTab('properties')}>
                  <div className="flex items-center gap-2">
                    <Home size={16} />
                    <span>Properties</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="services" onClick={() => setActiveTab('services')}>
                  <div className="flex items-center gap-2">
                    <Briefcase size={16} />
                    <span>Services</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="consultation" onClick={() => setActiveTab('consultation')}>
                  <div className="flex items-center gap-2">
                    <MessageSquare size={16} />
                    <span>Consultation</span>
                  </div>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="properties">
                <div className="flex flex-col md:flex-row gap-4 mb-10 p-6 bg-white rounded-lg shadow-sm">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="w-full md:w-1/3">
                      <label className="text-sm text-festari-600 mb-1 block">Property Type</label>
                      <div className="relative">
                        <select
                          className="w-full p-2 border border-festari-200 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-1 focus:ring-accent"
                          value={selectedType}
                          onChange={(e) => setSelectedType(e.target.value)}
                        >
                          <option value="All">All Types</option>
                          <option value="Sale">For Sale</option>
                          <option value="Rental">For Rent</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-festari-500" />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3">
                      <label className="text-sm text-festari-600 mb-1 block">Price Range</label>
                      <div className="relative">
                        <select
                          className="w-full p-2 border border-festari-200 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-1 focus:ring-accent"
                          value={priceRange}
                          onChange={(e) => setPriceRange(e.target.value)}
                        >
                          <option value="All">All Prices</option>
                          <option value="Under $500K">Under $500,000</option>
                          <option value="$500K-$1M">$500,000 - $1,000,000</option>
                          <option value="Over $1M">Over $1,000,000</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-festari-500" />
                      </div>
                    </div>
                    
                    <div className="w-full md:w-1/3">
                      <label className="text-sm text-festari-600 mb-1 block">Sort By</label>
                      <div className="relative">
                        <select
                          className="w-full p-2 border border-festari-200 rounded-md appearance-none bg-white pr-10 focus:outline-none focus:ring-1 focus:ring-accent"
                        >
                          <option value="newest">Newest First</option>
                          <option value="price-asc">Price (Low to High)</option>
                          <option value="price-desc">Price (High to Low)</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-festari-500" />
                      </div>
                    </div>
                  </div>
                  
                  <button className="bg-festari-100 text-festari-800 hover:bg-festari-200 px-4 py-2 rounded flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent md:self-end">
                    <Filter size={16} />
                    <span>More Filters</span>
                  </button>
                </div>
                
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-display font-bold text-festari-900">
                    {filteredProperties.length} Properties Found
                  </h2>
                  <div className="flex gap-2">
                    <button className="p-2 rounded bg-white text-festari-800 hover:bg-festari-100">
                      <MapPin size={20} />
                    </button>
                    <button className="p-2 rounded bg-accent text-white">
                      <Building size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProperties.map((property) => (
                    <div 
                      key={property.id}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                    >
                      <div className="relative h-60 overflow-hidden">
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold uppercase py-1 px-2 rounded">
                          {property.type}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-festari-900 group-hover:text-accent transition-colors">
                            {property.title}
                          </h3>
                        </div>
                        <p className="text-festari-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Home size={14} className="text-festari-400" />
                            {property.location}
                          </span>
                        </p>
                        <p className="text-sm text-festari-500 mb-3">
                          {property.features}
                        </p>
                        <p className="text-sm text-festari-600 mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-accent">{property.price}</span>
                          <button className="text-sm text-white bg-accent hover:bg-accent/90 px-3 py-1 rounded transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredProperties.length === 0 && (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Home size={48} className="text-festari-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-festari-800 mb-2">No properties found</h3>
                    <p className="text-festari-600 mb-4">Try adjusting your search criteria or filters</p>
                    <button 
                      className="btn-primary"
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedType('All');
                        setPriceRange('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}
                
                {filteredProperties.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex space-x-1">
                      <button className="px-4 py-2 border border-festari-300 rounded-md text-festari-800 bg-white hover:bg-festari-50">
                        Previous
                      </button>
                      <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90">
                        1
                      </button>
                      <button className="px-4 py-2 border border-festari-300 rounded-md text-festari-800 bg-white hover:bg-festari-50">
                        2
                      </button>
                      <button className="px-4 py-2 border border-festari-300 rounded-md text-festari-800 bg-white hover:bg-festari-50">
                        3
                      </button>
                      <button className="px-4 py-2 border border-festari-300 rounded-md text-festari-800 bg-white hover:bg-festari-50">
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="services" id="services" className="space-y-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-display font-bold mb-3">Our Real Estate Services</h2>
                  <p className="text-festari-600 max-w-2xl mx-auto">
                    Comprehensive solutions for all your property needs, from sales and rentals to expert consultation
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  {estateServices.map((category, idx) => (
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
                  {estateServices
                    .filter(category => !activeCategory || category.title === activeCategory)
                    .map((category, idx) => (
                      <div key={idx} className="space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-mikado/20 text-festari-900">
                            <category.icon size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{category.title}</h3>
                            <p className="text-festari-600 text-sm">{category.description}</p>
                          </div>
                        </div>
                        
                        <ServiceGrid columns={4}>
                          {category.items.map((service, serviceIdx) => (
                            <ServiceCard
                              key={serviceIdx}
                              title={service.title}
                              description={service.description}
                              icon={service.icon || category.icon}
                              color="bg-mikado/10 text-festari-900"
                              link={`/consultation?service=${encodeURIComponent(service.title)}&category=${encodeURIComponent(category.title)}`}
                            />
                          ))}
                        </ServiceGrid>
                      </div>
                    ))}
                </div>
                
                <div className="mt-12 text-center">
                  <Button asChild size="lg" className="bg-mikado text-festari-900 hover:bg-mikado/90">
                    <Link to="/consultation">Request Real Estate Consultation</Link>
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="consultation">
                <div className="max-w-3xl mx-auto">
                  <ConsultationRequestForm 
                    serviceCategories={[
                      {
                        title: "Estates Agency",
                        path: "/estates",
                        description: "Comprehensive real estate services",
                        activities: estateServices.flatMap(category => 
                          category.items.map(item => ({ 
                            title: item.title,
                            description: item.description
                          }))
                        )
                      }
                    ]}
                    title="Real Estate Consultation Request"
                    description="Our property experts are ready to assist you with your real estate needs. Fill out the form below to get started."
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        <section className="py-16 bg-mikado/10">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Ready to Find Your Perfect Property?
            </h2>
            <p className="text-festari-600 mb-8 max-w-2xl mx-auto">
              Our team of qualified real estate professionals is ready to help you find your dream property or provide expert property management services.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-mikado text-festari-900 hover:bg-mikado/90">
                <Link to="/consultation">Schedule a Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
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

export default EstatesAgency;
