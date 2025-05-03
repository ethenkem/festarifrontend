
import { AgricultureProduct } from '@/types/agriculture';

// Expanded agriculture product data with additional fields
export const agricultureProducts: AgricultureProduct[] = [
  {
    id: 'agri1',
    title: 'Organic Red Apples',
    image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&q=80',
    price: '$25/box',
    priceNumeric: 25,
    category: 'Crops',
    location: 'Central Farm',
    quantity: '10 kg box',
    description: 'Freshly harvested organic red apples. Perfect for direct consumption or cooking. Pesticide-free and grown using sustainable farming methods.',
    availabilityStatus: 'In Stock',
    featured: true,
    dateAdded: '2023-11-15',
    specifications: {
      'Growing Method': 'Organic',
      'Harvest Date': 'October 2023',
      'Storage': 'Keep refrigerated',
      'Certification': 'USDA Organic'
    }
  },
  {
    id: 'agri2',
    title: 'Hampshire Piglets',
    image: 'https://images.unsplash.com/photo-1604848698030-c434ba08ece1?auto=format&q=80',
    price: '$120/each',
    priceNumeric: 120,
    category: 'Livestock',
    location: 'Southern Ranch',
    quantity: '5 available',
    description: 'Hampshire piglets, 8 weeks old, well-fed and healthy. Great for breeding or raising for meat. Veterinary checks completed and documentation available.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-12-01',
    specifications: {
      'Age': '8 weeks',
      'Breed': 'Hampshire',
      'Vaccination': 'Complete',
      'Diet': 'Organic feed'
    }
  },
  {
    id: 'agri3',
    title: 'Tractor Farming Equipment',
    image: 'https://images.unsplash.com/photo-1530267981375-f0de937f5f13?auto=format&q=80',
    price: '$8,500',
    priceNumeric: 8500,
    category: 'Machinery',
    location: 'Eastern District',
    quantity: '1 unit',
    description: 'Used but well-maintained tractor with attachments for plowing and harvesting. Low mileage and recently serviced. Perfect for small to medium farms.',
    availabilityStatus: 'In Stock',
    featured: true,
    dateAdded: '2023-10-20',
    specifications: {
      'Make': 'John Deere',
      'Model': '5075E',
      'Year': '2020',
      'Hours': '450',
      'Horsepower': '75 HP'
    }
  },
  {
    id: 'agri4',
    title: 'Organic Vegetable Seeds',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&q=80',
    price: '$15/pack',
    priceNumeric: 15,
    category: 'Seeds',
    location: 'Northwest Gardens',
    quantity: '50 packs',
    description: 'Collection of organic vegetable seeds including tomatoes, carrots, lettuce, and bell peppers. Non-GMO and certified organic seeds for your home garden.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-12-10',
    specifications: {
      'Type': 'Assorted Vegetables',
      'Count': '100 seeds per pack',
      'Certification': 'Organic',
      'Growing Zone': '3-9'
    }
  },
  {
    id: 'agri5',
    title: 'Free-Range Chickens',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&q=80',
    price: '$18/each',
    priceNumeric: 18,
    category: 'Livestock',
    location: 'Hillside Poultry',
    quantity: '25 available',
    description: 'Free-range chickens raised on organic feed. Excellent for eggs or meat production. Healthy birds with no hormones or antibiotics.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-11-28',
    specifications: {
      'Breed': 'Rhode Island Red',
      'Age': '6 months',
      'Diet': 'Organic grain and insects',
      'Production': 'Approx. 5 eggs per week'
    }
  },
  {
    id: 'agri6',
    title: 'Premium Organic Fertilizer',
    image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&q=80',
    price: '$30/bag',
    priceNumeric: 30,
    category: 'Supplies',
    location: 'Green Earth Suppliers',
    quantity: '20 kg bag',
    description: 'Premium organic fertilizer made from composted plant materials and animal manure. Perfect for all types of crops and garden plants. Enhances soil health and boosts yields.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-12-05',
    specifications: {
      'Composition': 'Composted plant material, animal manure',
      'NPK Ratio': '4-6-4',
      'Usage': 'All plants and crops',
      'Coverage': 'Approx. 200 sq ft per bag'
    }
  },
  {
    id: 'agri7',
    title: 'Beekeeping Starter Kit',
    image: 'https://images.unsplash.com/photo-1584963385402-4b9d2f827209?auto=format&q=80',
    price: '$240',
    priceNumeric: 240,
    category: 'Supplies',
    location: 'Apiary Essentials',
    quantity: '3 kits available',
    description: 'Complete beekeeping starter kit with everything you need to begin your beekeeping journey. Includes hive boxes, frames, protective gear, and essential tools.',
    availabilityStatus: 'Pre-order',
    dateAdded: '2023-12-15',
    specifications: {
      'Contents': 'Hive boxes, frames, protective suit, smoker, hive tool',
      'Material': 'Pine wood hives, cotton blend suit',
      'Hive Type': 'Langstroth',
      'Skill Level': 'Beginner'
    }
  },
  {
    id: 'agri8',
    title: 'Heritage Tomato Plants',
    image: 'https://images.unsplash.com/photo-1592841200221-a6c691f78195?auto=format&q=80',
    price: '$6/plant',
    priceNumeric: 6,
    category: 'Crops',
    location: 'Central Farm',
    quantity: '50 plants',
    description: 'Assorted heritage tomato varieties including Brandywine, Cherokee Purple, and Green Zebra. Organically grown, ready to transplant to your garden.',
    availabilityStatus: 'Coming Soon',
    dateAdded: '2023-12-18',
    specifications: {
      'Varieties': 'Brandywine, Cherokee Purple, Green Zebra',
      'Growing Method': 'Organic',
      'Plant Size': '6-8 inches tall',
      'Growing Zone': '4-9'
    }
  },
  {
    id: 'agri9',
    title: 'Irrigation System',
    image: 'https://images.unsplash.com/photo-1616691028148-f61cd8522661?auto=format&q=80',
    price: '$180',
    priceNumeric: 180,
    category: 'Machinery',
    location: 'Eastern District',
    quantity: '10 systems',
    description: 'Complete drip irrigation system for gardens up to 500 square feet. Water-efficient design with programmable timer, pressure regulator, and all necessary connectors.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-11-20',
    specifications: {
      'Coverage': 'Up to 500 sq ft',
      'Components': 'Timer, pressure regulator, drip lines, connectors',
      'Water Saving': 'Up to 70% compared to sprinklers',
      'Installation': 'DIY with included instructions'
    }
  },
  {
    id: 'agri10',
    title: 'Angus Beef Cattle',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&q=80',
    price: '$1,500/head',
    priceNumeric: 1500,
    category: 'Livestock',
    location: 'Southern Ranch',
    quantity: '3 available',
    description: 'Purebred Angus beef cattle, grass-fed and hormone-free. Excellent genetics and health records. Perfect for breeding or meat production.',
    availabilityStatus: 'In Stock',
    featured: true,
    dateAdded: '2023-11-05',
    specifications: {
      'Breed': 'Black Angus',
      'Age': '18 months',
      'Weight': 'Approx. 900-1100 lbs',
      'Diet': '100% grass-fed',
      'Health Records': 'Available upon request'
    }
  },
  {
    id: 'agri11',
    title: 'Herb Garden Kit',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&q=80',
    price: '$35',
    priceNumeric: 35,
    category: 'Seeds',
    location: 'Northwest Gardens',
    quantity: '15 kits',
    description: 'Complete herb garden starter kit with basil, thyme, oregano, mint, and parsley seeds. Includes biodegradable pots, organic soil, and detailed growing instructions.',
    availabilityStatus: 'In Stock',
    dateAdded: '2023-12-12',
    specifications: {
      'Contents': '5 herb varieties, pots, soil, labels, instructions',
      'Growing Method': 'Organic',
      'Difficulty': 'Beginner-friendly',
      'Harvest Time': '4-6 weeks after planting'
    }
  },
  {
    id: 'agri12',
    title: 'Greenhouse Structure',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&q=80',
    price: '$2,200',
    priceNumeric: 2200,
    category: 'Machinery',
    location: 'Green Earth Suppliers',
    quantity: '2 units',
    description: 'Durable polycarbonate greenhouse structure with aluminum frame. Provides optimal growing conditions for plants year-round with temperature control and ventilation systems.',
    availabilityStatus: 'Pre-order',
    dateAdded: '2023-10-15',
    specifications: {
      'Dimensions': '10ft x 12ft x 8ft (height)',
      'Material': 'Aluminum frame, 6mm twin-wall polycarbonate panels',
      'Features': 'Roof vents, sliding door, integrated shelving',
      'Assembly': 'Professional assembly recommended'
    }
  }
];
