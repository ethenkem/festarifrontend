import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Search, Filter, BookOpen, Calendar, User, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock publications data
const publicationsData = [
  {
    id: "pub1",
    title: "A Comparative Study on the Application of Intelligent Models in the Estimation of Backbreak in Mine Blasting Operations",
    journal: "American Journal of Science, Engineering and Technology",
    authors: ["Festus Kunkyin-Saadaari", "Victor Kwaku Agadzie", "Richard Gyebuni"],
    date: "2024-01-18",
    abstract: `This study conducts a comparative analysis of various intelligent models for estimating backbreak in mine blasting operations. The research evaluates the performance of different machine learning algorithms and artificial intelligence approaches in predicting and mitigating unwanted rock breakage during blasting processes.`,
    doi: "10.11648/j.ajset.20240901.11",
    link: "http://dx.doi.org/10.11648/j.ajset.20240901.11",
    tags: ["mining", "machine learning", "blasting operations"],
    category: "journal"
  },
  {
    id: "pub2",
    title: "Maintaining production levels in underground mining operations during pandemics -a case study",
    journal: "Journal of the Ghana Institution of Engineering (JGhIE)",
    authors: ["Festus Kunkyin-Saadaari", "Richard Gyebuni", "Afia Dufie Kwarteng Forkuoh"],
    date: "2024-03-28",
    abstract: `This case study examines strategies for maintaining production levels in underground mining operations during pandemic conditions. The research identifies key challenges faced by mining companies and proposes effective solutions to ensure operational continuity while prioritizing worker safety.`,
    doi: "10.56049/jghie.v24i1.138",
    volume: "24",
    issue: "1",
    pages: "41-46",
    link: "http://dx.doi.org/10.56049/jghie.v24i1.138",
    tags: ["mining", "pandemic", "production", "safety protocols"],
    category: "journal"
  },
  {
    id: "pub3",
    title: "Slope stability assessment of waste rock dumps at a typical gold mine in Ghana",
    journal: "Nigerian Journal of Technology",
    authors: ["S.O. Sarpong", "B.M. Olaleye", "F. Kunkyin-Saadaari", "G. Agyei"],
    date: "2023-05-08",
    abstract: `This research assesses the stability of waste rock dumps at a gold mine in Ghana, focusing on geotechnical properties and failure mechanisms. The study employs various analytical methods to evaluate stability conditions and proposes design recommendations for improved waste rock management.`,
    doi: "10.4314/njt.v42i1.10",
    volume: "42",
    issue: "1",
    pages: "83-91",
    link: "http://dx.doi.org/10.4314/njt.v42i1.10",
    tags: ["waste rock", "slope stability", "gold mining", "geotechnical analysis"],
    category: "journal"
  },
  {
    id: "pub4",
    title: "A Feasibility Study on The Implementation of Neural Network Classifiers for Open Stope Design",
    journal: "Geotechnical and Geological Engineering",
    authors: ["Amoussou Coffi Adoko", "Festus Saadaari", "Daniel Mireku-Gyimah", "Askar Imashev"],
    date: "2021-07-06",
    abstract: `This feasibility study examines the implementation of neural network classifiers in open stope design, evaluating their applicability and performance in predicting stability conditions. The research explores various neural network architectures and training methodologies for optimizing stope design parameters.`,
    doi: "10.1007/s10706-021-01915-8",
    link: "http://dx.doi.org/10.1007/s10706-021-01915-8",
    tags: ["neural networks", "open stope design", "stability prediction", "machine learning"],
    category: "journal"
  },
  {
    id: "pub5",
    title: "Development of a Stope Stability Prediction Model Using Ensemble Learning Techniques - A Case Study",
    journal: "Ghana Mining Journal",
    authors: ["F. Saadaari", "D. Mireku-Gyimah", "B. M. Olaleye"],
    date: "2020-12-31",
    abstract: `This case study focuses on the development of a stope stability prediction model utilizing ensemble learning techniques. The research combines multiple machine learning algorithms to create a robust prediction system for evaluating the stability of mining stopes under various conditions.`,
    doi: "10.4314/gm.v20i2.3",
    volume: "20",
    issue: "2",
    pages: "18-26",
    link: "http://dx.doi.org/10.4314/gm.v20i2.3",
    tags: ["stope stability", "ensemble learning", "prediction model", "mining"],
    category: "journal"
  },
  {
    id: "conf1",
    title: "Application of Machine Learning in Mine Ventilation System Optimization",
    conference: "International Conference on Mining Engineering and Technology (ICMET)",
    authors: ["Festus Kunkyin-Saadaari", "Emmanuel Arhin", "Richard Gyebuni"],
    date: "2022-09-15",
    abstract: `This conference paper presents an innovative approach to mine ventilation system optimization using machine learning algorithms. The research demonstrates how predictive modeling can enhance ventilation efficiency, reduce energy consumption, and improve air quality in underground mining environments.`,
    location: "Cape Town, South Africa",
    tags: ["machine learning", "mine ventilation", "optimization", "energy efficiency"],
    category: "conference"
  },
  {
    id: "conf2",
    title: "Sustainable Reclamation Practices for Post-Mining Landscapes in West Africa",
    conference: "Annual Mining and Environment Conference",
    authors: ["Festus Kunkyin-Saadaari", "Afia Dufie Kwarteng Forkuoh"],
    date: "2023-11-10",
    abstract: `This presentation highlights sustainable practices for reclaiming post-mining landscapes in West Africa. The research examines ecological restoration techniques, community engagement approaches, and long-term monitoring strategies for effective mine site rehabilitation.`,
    location: "Accra, Ghana",
    tags: ["reclamation", "sustainability", "post-mining", "ecological restoration"],
    category: "conference"
  }
];

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoaded, setIsLoaded] = useState(false);
  const [expandedAbstracts, setExpandedAbstracts] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };
  
  // Filter by search term, category, and year
  const filteredPublications = publicationsData.filter(pub => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.some(author => author.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || pub.category === categoryFilter;
    
    const pubYear = new Date(pub.date).getFullYear().toString();
    const matchesYear = yearFilter === 'all' || pubYear === yearFilter;
    
    return matchesSearch && matchesCategory && matchesYear;
  });
  
  // Sort publications
  const sortedPublications = [...filteredPublications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });
  
  // Get unique years for filter
  const years = [...new Set(publicationsData.map(pub => new Date(pub.date).getFullYear().toString()))].sort((a, b) => Number(b) - Number(a));

  return (
    <div className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Header />
      <main className="pt-20">
        <section className="bg-festari-800 text-white py-20">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Research Publications</h1>
              <p className="text-festari-100 mb-8">
                Explore Dr. Festus Kunkyin-Saadaari's academic contributions to the fields of mining engineering, 
                geotechnical analysis, and sustainable resource management.
              </p>
              
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search publications, authors, or keywords..."
                  className="w-full pl-12 pr-4 py-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-festari-50 p-6 rounded-xl sticky top-24">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter size={18} className="text-festari-600" />
                    <h2 className="text-xl font-semibold text-festari-900">Filters</h2>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="text-sm font-medium text-festari-700 block mb-2">
                        Publication Type
                      </label>
                      <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter by type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Publications</SelectItem>
                          <SelectItem value="journal">Journal Articles</SelectItem>
                          <SelectItem value="conference">Conference Papers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-festari-700 block mb-2">
                        Publication Year
                      </label>
                      <Select value={yearFilter} onValueChange={setYearFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter by year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Years</SelectItem>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>{year}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-festari-700 block mb-2">
                        Sort By
                      </label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort publications" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="newest">Newest First</SelectItem>
                          <SelectItem value="oldest">Oldest First</SelectItem>
                          <SelectItem value="title">Title (A-Z)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-4 border-t border-festari-200">
                      <Button variant="outline" className="w-full" onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('all');
                        setYearFilter('all');
                        setSortBy('newest');
                      }}>
                        Reset Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-festari-900">
                    {sortedPublications.length} Publication{sortedPublications.length !== 1 ? 's' : ''} Found
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {sortedPublications.map((pub) => (
                    <Card key={pub.id} className="border-festari-200 overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <Badge variant={pub.category === 'journal' ? 'default' : 'outline'} className="mb-2">
                              {pub.category === 'journal' ? 'Journal Article' : 'Conference Paper'}
                            </Badge>
                            <CardTitle className="text-xl font-bold text-festari-900">
                              {pub.title}
                            </CardTitle>
                          </div>
                          
                          {pub.link && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-festari-600 hover:text-accent"
                              asChild
                            >
                              <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={18} />
                              </a>
                            </Button>
                          )}
                        </div>
                        
                        <CardDescription className="mt-2">
                          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-festari-600">
                            {pub.journal && (
                              <div className="flex items-center">
                                <BookOpen size={14} className="mr-1 text-accent" />
                                <span>{pub.journal}</span>
                                {pub.volume && pub.issue && (
                                  <span className="ml-1">
                                    Vol. {pub.volume}, Issue {pub.issue}
                                    {pub.pages && `, pp. ${pub.pages}`}
                                  </span>
                                )}
                              </div>
                            )}
                            
                            {pub.conference && (
                              <div className="flex items-center">
                                <BookOpen size={14} className="mr-1 text-accent" />
                                <span>{pub.conference}</span>
                              </div>
                            )}
                            
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1 text-accent" />
                              <span>{new Date(pub.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}</span>
                            </div>
                            
                            <div className="flex items-center">
                              <User size={14} className="mr-1 text-accent" />
                              <span>{pub.authors.join(', ')}</span>
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        {pub.abstract && (
                          <div>
                            <p className={`text-festari-600 text-sm ${!expandedAbstracts.includes(pub.id) ? 'line-clamp-2' : ''}`}>
                              {pub.abstract}
                            </p>
                            {pub.abstract.length > 100 && (
                              <button 
                                onClick={() => toggleAbstract(pub.id)}
                                className="text-accent text-sm font-medium mt-1 hover:underline"
                              >
                                {expandedAbstracts.includes(pub.id) ? 'Show less' : 'Read more'}
                              </button>
                            )}
                          </div>
                        )}
                        
                        {pub.tags && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {pub.tags.map((tag, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-festari-50 text-festari-700">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="border-t border-festari-100 pt-4 bg-festari-50/50">
                        <div className="flex items-center justify-between w-full">
                          {pub.doi && (
                            <div className="text-sm text-festari-600">
                              DOI: <a 
                                href={`https://doi.org/${pub.doi}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-accent hover:underline"
                              >
                                {pub.doi}
                              </a>
                            </div>
                          )}
                          
                          <Button variant="outline" size="sm" className="ml-auto">
                            <Download size={14} className="mr-2" /> PDF
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                
                {sortedPublications.length === 0 && (
                  <div className="bg-festari-50 rounded-lg p-8 text-center">
                    <BookOpen size={48} className="mx-auto mb-4 text-festari-300" />
                    <h3 className="text-xl font-semibold text-festari-800 mb-2">No publications found</h3>
                    <p className="text-festari-600 mb-4">Try adjusting your search criteria or filters</p>
                    <Button onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setYearFilter('all');
                      setSortBy('newest');
                    }}>
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-12 bg-festari-50">
          <div className="container-custom">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-display font-bold text-festari-900 mb-2">
                    Looking for Research Collaboration?
                  </h2>
                  <p className="text-festari-600 max-w-2xl">
                    Dr. Festus Kunkyin-Saadaari is open to research partnerships and collaborations in mining engineering, 
                    geotechnical analysis, and sustainable resource management.
                  </p>
                </div>
                <Button size="lg" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Publications;
