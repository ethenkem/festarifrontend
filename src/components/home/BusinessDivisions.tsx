import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  BookOpen, 
  Building, 
  Leaf, 
  ShoppingCart, 
  Briefcase 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface DivisionProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  bgImage: string;
  color: string;
  link: string;
  delay: number;
  keyServices: string[];
}

const divisions: DivisionProps[] = [
  {
    title: "Research & Consultancy",
    subtitle: "Festari Research & Consultancy Institute Ltd",
    description: "Expert mining and geotechnical consulting, academic research, and professional training and certification programs.",
    icon: <BookOpen size={28} />,
    bgImage: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&q=80",
    color: "chili",
    link: "/frci",
    delay: 0,
    keyServices: [
      "Geotechnical Engineering",
      "Mineral Exploration",
      "Environmental Impact Assessments",
      "Professional and Technical Writing",
      "Mining Education and Training"
    ]
  },
  {
    title: "Estates Agency",
    subtitle: "Festari Estates Agency",
    description: "Comprehensive real estate services including property sales, rentals, and management for residential and commercial clients.",
    icon: <Building size={28} />,
    bgImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&q=80",
    color: "mikado",
    link: "/properties",
    delay: 150,
    keyServices: [
      "Property Listings",
      "Real Estate Consultation",
      "Property Management",
      "Hostel Rentals",
      "Property Appraisals"
    ]
  },
  {
    title: "AgriBusiness",
    subtitle: "Festari Farms & AgriBusiness",
    description: "Sustainable farming operations, agricultural products, and expert consulting for modern agricultural practices.",
    icon: <Leaf size={28} />,
    bgImage: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&q=80",
    color: "indigo",
    link: "/agriculture",
    delay: 300,
    keyServices: [
      "Crop and Livestock Farming",
      "Agribusiness Consulting",
      "Agricultural Equipment",
      "Farm Education and Training",
      "Farm-to-Table Sales"
    ]
  },
  {
    title: "Enterprise",
    subtitle: "Festari Enterprise",
    description: "Comprehensive retail, wholesale, and distribution services with global import and export capabilities.",
    icon: <ShoppingCart size={28} />,
    bgImage: "festari_ent.jpeg", // New valid image
    color: "chili",
    link: "/enterprise",
    delay: 450,
    keyServices: [
      "Retail and Wholesale",
      "Import and Export",
      "E-commerce Operations",
      "Supply Chain Management",
      "Mobile Money Services"
    ]
  },
  //{
  //  title: "Services",
  //  subtitle: "Festari Services",
  //  description: "Wide range of professional services from logistics and delivery to event planning and personal care.",
  //  icon: <Briefcase size={28} />,
  //  bgImage: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&q=80",
  //  color: "mikado",
  //  link: "/services",
  //  delay: 600,
  //  keyServices: [
  //    "Delivery Services",
  //    "Event Planning",
  //    "Home Services",
  //    "Personal Care",
  //    "Digital Marketing"
  //  ]
  //},
  {
    title: "Festari International Academy",
    subtitle: "Coming Soon",
    description: "Empowering the next generation through innovative education and training programs.",
    icon: <BookOpen size={28} />,
    bgImage: "coming_soon.jpeg",
    color: "gray",
    link: "#",
    delay: 750,
    keyServices: []
  }
];

const BusinessDivisions = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">
            Our Business Divisions
          </h2>
          <p className="text-festari-600">
            Explore our specialized subsidiaries offering tailored solutions across industries.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative h-48">
                <img 
                  src={division.bgImage} 
                  alt={division.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="text-white text-2xl">{division.icon}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-festari-900 mb-2">{division.title}</h3>
                <p className="text-sm text-festari-600 mb-4">{division.description}</p>
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full border-2 border-festari-900/20 text-festari-900 hover:bg-festari-50"
                >
                  <Link to={division.link}>
                    {division.subtitle === "Coming Soon" ? "Coming Soon" : "Learn More"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessDivisions;
