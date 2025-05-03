import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, MapPin, Ruler, BedDouble, Bath, Home, 
  Calendar, Heart, Share, Building
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import BookingForm from '@/components/property/BookingForm';

// Mock property data
const propertyData = {
  id: 'prop1',
  title: 'Luxury Apartment with City View',
  description: `This stunning luxury apartment offers panoramic views of the city skyline. 
  Located in the heart of downtown, this property features high-end finishes, spacious rooms, 
  and state-of-the-art appliances. The open floor plan creates a seamless flow between the 
  living, dining, and kitchen areas, making it perfect for entertaining.
  
  The master bedroom includes a walk-in closet and an ensuite bathroom with a soaking tub 
  and glass shower. The second bedroom is ideal for guests or as a home office. Additional 
  amenities include in-unit laundry, central air conditioning, and a private balcony.`,
  price: '$2,500/mo',
  location: 'Downtown Metro Area, 123 Skyline Avenue',
  type: 'Rental',
  bedrooms: 2,
  bathrooms: 2,
  size: '1,200 sqft',
  yearBuilt: 2018,
  amenities: [
    'Central Air Conditioning',
    'In-unit Laundry',
    'Private Balcony',
    'Walk-in Closet',
    'Hardwood Floors',
    'Quartz Countertops',
    'Stainless Steel Appliances',
    'Fitness Center',
    'Rooftop Terrace',
    'Pet Friendly',
    '24/7 Security',
    'Underground Parking'
  ],
  images: [
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&q=80',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&q=80',
    'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&q=80',
    'https://images.unsplash.com/photo-1588854337115-1c67d9247e4d?auto=format&q=80',
  ],
  agent: {
    name: 'Sarah Johnson',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@festari.com',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&q=80'
  }
};

const PropertyDetails = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSaveProperty = () => {
    setIsSaved(!isSaved);
    
    toast({
      title: isSaved ? "Property removed" : "Property saved",
      description: isSaved 
        ? "The property has been removed from your saved list." 
        : "The property has been added to your saved list.",
      variant: isSaved ? "destructive" : "default",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link copied",
      description: "Property link has been copied to clipboard.",
    });
  };

  if (!propertyData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-festari-900 mb-4">Property Not Found</h1>
            <p className="text-festari-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/real-estate">Browse Properties</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="pt-20">
        {/* Property Gallery */}
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
            <div className="md:col-span-2 h-full relative">
              <img 
                src={propertyData.images[selectedImage]} 
                alt={propertyData.title} 
                className="w-full h-full object-cover"
              />
              <Button 
                asChild
                variant="outline" 
                className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm hover:bg-white"
              >
                <Link to="/real-estate">
                  <ArrowLeft size={16} className="mr-2" /> Back to Listings
                </Link>
              </Button>
            </div>
            
            <div className="hidden md:grid grid-cols-2 gap-4">
              {propertyData.images.slice(1, 5).map((image, index) => (
                <div 
                  key={index} 
                  className="cursor-pointer overflow-hidden transition-all duration-300 hover:opacity-80"
                  onClick={() => setSelectedImage(index + 1)}
                >
                  <img 
                    src={image} 
                    alt={`Property view ${index + 2}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Property Details */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <div className="flex flex-wrap justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded-full">
                        {propertyData.type}
                      </span>
                      <span className="bg-festari-100 text-festari-700 text-xs font-medium px-2 py-1 rounded-full">
                        Available Now
                      </span>
                    </div>
                    
                    <h1 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-2">
                      {propertyData.title}
                    </h1>
                    
                    <div className="flex items-center text-festari-600 mb-4">
                      <MapPin size={16} className="mr-1 text-festari-500" />
                      <span>{propertyData.location}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <span className="text-3xl font-bold text-accent mb-1">{propertyData.price}</span>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        className={isSaved ? "text-red-500 border-red-200 hover:text-red-600" : ""}
                        onClick={handleSaveProperty}
                      >
                        <Heart 
                          size={18} 
                          className={isSaved ? "fill-current" : ""} 
                        />
                      </Button>
                      <Button variant="outline" size="icon" onClick={handleShare}>
                        <Share size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-festari-50 p-4 rounded-lg flex items-center">
                    <BedDouble size={20} className="text-festari-600 mr-3" />
                    <div>
                      <div className="text-sm text-festari-500">Bedrooms</div>
                      <div className="font-semibold">{propertyData.bedrooms}</div>
                    </div>
                  </div>
                  <div className="bg-festari-50 p-4 rounded-lg flex items-center">
                    <Bath size={20} className="text-festari-600 mr-3" />
                    <div>
                      <div className="text-sm text-festari-500">Bathrooms</div>
                      <div className="font-semibold">{propertyData.bathrooms}</div>
                    </div>
                  </div>
                  <div className="bg-festari-50 p-4 rounded-lg flex items-center">
                    <Ruler size={20} className="text-festari-600 mr-3" />
                    <div>
                      <div className="text-sm text-festari-500">Size</div>
                      <div className="font-semibold">{propertyData.size}</div>
                    </div>
                  </div>
                  <div className="bg-festari-50 p-4 rounded-lg flex items-center">
                    <Calendar size={20} className="text-festari-600 mr-3" />
                    <div>
                      <div className="text-sm text-festari-500">Year Built</div>
                      <div className="font-semibold">{propertyData.yearBuilt}</div>
                    </div>
                  </div>
                </div>
                
                <Tabs defaultValue="description" className="mb-12">
                  <TabsList className="mb-6">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                  </TabsList>
                  <TabsContent value="description" className="text-festari-600 space-y-4">
                    {propertyData.description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </TabsContent>
                  <TabsContent value="amenities">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3">
                      {propertyData.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          <Building size={16} className="text-accent mr-2" />
                          <span className="text-festari-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="location">
                    <div className="bg-festari-50 p-4 rounded-lg mb-4">
                      <p className="text-festari-600">
                        {propertyData.location}
                      </p>
                    </div>
                    <div className="aspect-video bg-festari-100 rounded-lg flex items-center justify-center">
                      <p className="text-festari-500">Interactive map would be displayed here</p>
                    </div>
                  </TabsContent>
                </Tabs>
                
                <div className="border-t border-festari-200 pt-8">
                  <h2 className="text-2xl font-display font-bold text-festari-900 mb-6">
                    Meet Your Agent
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-festari-50 p-6 rounded-xl">
                    <img 
                      src={propertyData.agent.image} 
                      alt={propertyData.agent.name} 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-festari-900 mb-2">
                        {propertyData.agent.name}
                      </h3>
                      <p className="text-festari-600 mb-4">
                        Professional real estate agent with 8+ years of experience in luxury properties and commercial real estate.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-6">
                        <div>
                          <div className="text-sm text-festari-500">Phone</div>
                          <div className="font-medium">{propertyData.agent.phone}</div>
                        </div>
                        <div>
                          <div className="text-sm text-festari-500">Email</div>
                          <div className="font-medium">{propertyData.agent.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white shadow-md rounded-xl p-6 sticky top-24">
                  <h3 className="text-xl font-bold text-festari-900 mb-6">
                    Schedule a Viewing
                  </h3>
                  <BookingForm 
                    propertyId={1} // Fixed: Converted string 'prop1' to number 1
                    propertyTitle={propertyData.title} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Similar Properties */}
        <section className="py-12 bg-festari-50">
          <div className="container-custom">
            <h2 className="text-2xl font-display font-bold text-festari-900 mb-8">
              Similar Properties
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((num) => (
                <Link 
                  key={num} 
                  to={`/property/similar-${num}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-151291877507${num}-ed5a9ecdebfd?auto=format&q=80`} 
                      alt="Similar property" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-festari-900 group-hover:text-accent transition-colors">
                      {["Modern Townhouse", "Cozy Studio Apartment", "Penthouse Suite"][num-1]}
                    </h3>
                    <p className="text-festari-600 mb-2">
                      Downtown, {["123 Main St", "456 Park Ave", "789 Skyline Blvd"][num-1]}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-accent">${[2200, 1800, 3500][num-1]}/mo</span>
                      <span className="text-sm text-festari-500">View Details</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PropertyDetails;
