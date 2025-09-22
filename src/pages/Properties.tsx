import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Search, Home, Building, Map, Filter, ChevronDown, X, User, Phone, Mail, DollarSign } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';
import { useAuth } from '@/context/auth-context';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userData } = useAuth()
  const [offerData, setOfferData] = useState({
    amount: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    console.log("checking");

    const fetchProperties = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/v1/real-estates/`);
        console.log(res.data);
        setProperties(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        //setLoading(false);
      }
    };

    fetchProperties(); 
  }, []);

  // Filter properties based on search term and filters
  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedType === 'All' || property.type === selectedType;

    // Simple price range filtering (in a real app, would use numeric values and proper ranges)
    const matchesPrice = priceRange === 'All' ||
      (priceRange === 'Under $500K' && property.price.includes('$') && !property.price.includes('M')) ||
      (priceRange === '$500K-$1M' && property.price.includes('$') && !property.price.includes('M')) ||
      (priceRange === 'Over $1M' && property.price.includes('M'));

    return matchesSearch && matchesType && matchesPrice;
  });

  const handleMakeOffer = (property) => {
    if (!userData) {
      // Redirect to login page
      window.location.href = '/login'; // or use your routing method
      return;
    }

    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
    setOfferData({
      amount: '',
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const offerPayload = {
        property_id: selectedProperty.property_id,
        offer_amount: offerData.amount,
        client_name: offerData.name,
        client_email: offerData.email,
        client_phone: offerData.phone,
        message: offerData.message
      };

      const response = await axios.post(`${BACKEND_URL}/v1/offers/`, offerPayload);

      if (response.status === 200 || response.status === 201) {
        alert('Offer submitted successfully!');
        closeModal();
      }
    } catch (error) {
      console.error('Error submitting offer:', error);
      alert('Failed to submit offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOfferData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div>
      <Header />
      <main className="pt-20">
        {/* Hero section */}
        <section
          className="relative py-20 bg-cover bg-center text-white"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&q=80')"
          }}
        >
          <div className="container-custom">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Find Your Ideal Property</h1>
              <p className="text-festari-100 mb-8">Browse our exclusive collection of premium properties available for sale and rent.</p>

              {/* Search bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location, property type, or features..."
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              </div>
            </div>
          </div>
        </section>

        {/* Property listings */}
        <section className="section-padding bg-festari-50">
          <div className="container-custom">
            {/* Filters */}
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
                      <option value="Rent">For Rent</option>
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
            </div>

            {/* Results count */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-festari-900">
                {filteredProperties.length} Properties Found
              </h2>
              <div className="flex gap-2">
                <button className="p-2 rounded bg-white text-festari-800 hover:bg-festari-100">
                  <Map size={20} />
                </button>
                <button className="p-2 rounded bg-accent text-white">
                  <Building size={20} />
                </button>
              </div>
            </div>

            {/* Property grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property, index) => (
                <div
                  key={property.property_id}
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
                        {property.location.toUpperCase()}
                      </span>
                    </p>
                    <p className="text-sm text-festari-500 mb-3">
                      {property.features.toUpperCase()}
                    </p>
                    <p className="text-sm text-festari-600 mb-4 line-clamp-2">
                      {property.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">{property.price}</span>
                      <button
                        className="text-sm text-white bg-accent hover:bg-accent/90 px-3 py-1 rounded transition-colors"
                        onClick={() => handleMakeOffer(property)}
                      >
                        Make an offer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state */}
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

            {/* Pagination (simplified) */}
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
          </div>
        </section>

        {/* Make Offer Modal */}
        {isModalOpen && selectedProperty && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-festari-200">
                <h3 className="text-xl font-bold text-festari-900">Make an Offer</h3>
                <button
                  onClick={closeModal}
                  className="text-festari-500 hover:text-festari-700 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Property Info */}
              <div className="p-6 border-b border-festari-200">
                <div className="flex gap-4">
                  <img
                    src={selectedProperty.image}
                    alt={selectedProperty.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-semibold text-festari-900">{selectedProperty.title}</h4>
                    <p className="text-sm text-festari-600">{selectedProperty.location}</p>
                    <p className="text-lg font-bold text-accent">{selectedProperty.price}</p>
                  </div>
                </div>
              </div>

              {/* Offer Form */}
              <form onSubmit={handleOfferSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Offer Amount */}
                  <div>
                    <label className="block text-sm font-medium text-festari-700 mb-1">
                      Offer Amount *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="amount"
                        value={offerData.amount}
                        onChange={handleInputChange}
                        placeholder="Enter your offer amount"
                        className="w-full pl-10 pr-4 py-2 border border-festari-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                      <DollarSign size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-400" />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-festari-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="name"
                        value={offerData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-2 border border-festari-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                      <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-400" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-festari-700 mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={offerData.email}
                        onChange={handleInputChange}
                        placeholder="your.email@example.com"
                        className="w-full pl-10 pr-4 py-2 border border-festari-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-400" />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-festari-700 mb-1">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={offerData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                        className="w-full pl-10 pr-4 py-2 border border-festari-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                        required
                      />
                      <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-400" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-festari-700 mb-1">
                      Additional Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={offerData.message}
                      onChange={handleInputChange}
                      placeholder="Any additional details about your offer..."
                      rows={4}
                      className="w-full px-4 py-2 border border-festari-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2 border border-festari-300 text-festari-700 rounded-lg hover:bg-festari-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Offer'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
