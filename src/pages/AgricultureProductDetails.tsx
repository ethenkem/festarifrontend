import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MapPin, 
  Clock, 
  Package, 
  Info, 
  ShoppingCart,
  Truck,
  Shield,
  MessageCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { agricultureProducts } from '@/data/agricultureProducts';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import InquiryModal from '@/components/agriculture/InquiryModal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// AgricultureProductDetails component
const AgricultureProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL params
  const navigate = useNavigate(); // Navigation hook
  const { toast } = useToast(); // Toast notifications
  const [product, setProduct] = useState(agricultureProducts.find(p => p.id === id));
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedProducts, setSavedProducts] = useState<string[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  
  // Simulate multiple images using the same image for demonstration
  const productImages = product 
    ? [product.image, product.image, product.image] 
    : [];
  
  useEffect(() => {
    if (!product) {
      navigate('/agriculture', { replace: true }); // Redirect if product not found
      return;
    }

    // Load saved products from localStorage
    const saved = localStorage.getItem('savedAgricultureProducts');
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
    
    // Set page as loaded after a short delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [product, navigate]);
  
  const toggleSaveProduct = () => {
    if (!product) return;
    
    let newSavedProducts;
    
    if (savedProducts.includes(product.id)) {
      newSavedProducts = savedProducts.filter(id => id !== product.id);
      toast({
        title: "Product removed",
        description: "The product has been removed from your saved items.",
      });
    } else {
      newSavedProducts = [...savedProducts, product.id];
      toast({
        title: "Product saved",
        description: "The product has been added to your saved items.",
        variant: "default",
      });
    }
    
    setSavedProducts(newSavedProducts);
    localStorage.setItem('savedAgricultureProducts', JSON.stringify(newSavedProducts));
  };
  
  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href); // Copy product link to clipboard
    toast({
      title: "Link copied",
      description: "Product link copied to clipboard.",
      variant: "default",
    });
  };
  
  const handleInquirySubmit = (formData: any) => {
    toast({
      title: "Inquiry Sent",
      description: "Your inquiry has been sent. We'll contact you shortly.",
      variant: "default",
    });
    setIsInquiryModalOpen(false); // Close inquiry modal
  };
  
  if (!product) return null;
  
  const isSaved = savedProducts.includes(product.id);
  
  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header component */}
      <Header />
      <main className="pt-24">
        <div className="container-custom pb-16">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/agriculture">Agriculture</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/agriculture/product/${product.id}`}>
                  {product.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Back button */}
          <Button
            variant="ghost"
            className="mb-6 text-festari-800 hover:text-festari-900 hover:bg-festari-100 -ml-2"
            onClick={() => navigate('/agriculture')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Agriculture
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Product images */}
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden border border-festari-100 bg-white">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
              
              {/* Thumbnail gallery */}
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    className={`border ${
                      selectedImage === image
                        ? 'border-festari-accent'
                        : 'border-festari-200'
                    } rounded overflow-hidden h-20 w-20`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
            
            {/* Product details */}
            <div>
              <div className="flex justify-between items-start">
                <Badge className="bg-festari-accent text-white mb-3">
                  {product.category}
                </Badge>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className={isSaved ? 'text-red-500 border-red-200 hover:text-red-600 hover:border-red-300 hover:bg-red-50' : ''}
                    onClick={toggleSaveProduct}
                  >
                    <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={shareProduct}
                  >
                    <Share2 size={18} />
                  </Button>
                </div>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-display font-bold text-festari-900 mb-2">
                {product.title}
              </h1>
              
              <div className="text-2xl font-bold text-festari-accent mb-4">
                {product.price}
              </div>
              
              <div className="space-y-3 mb-6 text-festari-800">
                <div className="flex items-center">
                  <MapPin size={18} className="mr-2 text-festari-600" />
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center">
                  <Package size={18} className="mr-2 text-festari-600" />
                  <span>Quantity: {product.quantity}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={18} className="mr-2 text-festari-600" />
                  <span>Available: {product.availabilityStatus}</span>
                </div>
              </div>
              
              <div className="bg-festari-50 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-festari-900 mb-2">Product Description</h3>
                <p className="text-festari-700">{product.description}</p>
              </div>
              
              <Button
                className="w-full bg-festari-accent hover:bg-festari-accent/90 text-white mb-4"
                onClick={() => setIsInquiryModalOpen(true)}
              >
                <ShoppingCart size={18} className="mr-2" />
                Inquire About This Product
              </Button>
              
              {/* Additional information */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="specifications">
                  <AccordionTrigger className="text-festari-900 hover:text-festari-accent">
                    Specifications
                  </AccordionTrigger>
                  <AccordionContent>
                    {product.specifications && (
                      <div className="space-y-2 mt-2">
                        {Object.entries(product.specifications).map(([key, value]) => (
                          <div key={key} className="grid grid-cols-2 gap-2 py-1 border-b border-festari-100">
                            <span className="text-festari-600 font-medium">{key}</span>
                            <span className="text-festari-900">{value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="shipping">
                  <AccordionTrigger className="text-festari-900 hover:text-festari-accent">
                    Shipping & Delivery
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Truck size={18} className="mr-2 text-festari-600 mt-1" />
                        <div>
                          <p className="font-medium text-festari-900">Standard Shipping</p>
                          <p className="text-festari-700">Delivery within 3-5 business days after order confirmation.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Info size={18} className="mr-2 text-festari-600 mt-1" />
                        <div>
                          <p className="font-medium text-festari-900">Pickup Available</p>
                          <p className="text-festari-700">Available for pickup at {product.location} location.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="returns">
                  <AccordionTrigger className="text-festari-900 hover:text-festari-accent">
                    Returns & Warranty
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Shield size={18} className="mr-2 text-festari-600 mt-1" />
                        <div>
                          <p className="font-medium text-festari-900">Quality Guarantee</p>
                          <p className="text-festari-700">All products are inspected for quality before shipping.</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <MessageCircle size={18} className="mr-2 text-festari-600 mt-1" />
                        <div>
                          <p className="font-medium text-festari-900">Customer Support</p>
                          <p className="text-festari-700">Contact our support team for any issues with your purchase.</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Related products section */}
          <div className="mt-16">
            <h2 className="text-2xl font-display font-bold text-festari-900 mb-6">
              Related Products
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {agricultureProducts
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div 
                    key={relatedProduct.id} 
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-festari-100"
                    onClick={() => navigate(`/agriculture/product/${relatedProduct.id}`)}
                  >
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.title} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-festari-900 hover:text-festari-accent transition-colors">
                        {relatedProduct.title}
                      </h3>
                      <p className="text-festari-accent font-medium mt-1">
                        {relatedProduct.price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        
        {/* Inquiry Modal */}
        <InquiryModal
          product={product}
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          onSubmit={handleInquirySubmit}
        />
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default AgricultureProductDetails;
