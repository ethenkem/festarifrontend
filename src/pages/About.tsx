import { useState, useEffect } from 'react';
import { Helmet } from "react-helmet-async"
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import {
  Award,
  Briefcase,
  MapPin,
  Mail,
  Building,
  Users,
  Target,
  Heart,
  Lightbulb,
  Leaf,
  Handshake,
  Globe,
  School,
  Trees,
  Factory,
  GraduationCap,
  FileText,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Subsidiaries data
  const subsidiaries = [
    {
      name: "Festari Research & Consultancy Institute (FRCI)",
      icon: School,
      description: "Research and consulting services for industry advancement.",
      color: "bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200"
    },
    {
      name: "Festari International Academy (FIA)",
      icon: GraduationCap,
      description: "Professional education and skill development programs.",
      color: "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
    },
    {
      name: "Festari Estates Agency (FEA)",
      icon: Building,
      description: "Real estate development and property management.",
      color: "bg-gradient-to-br from-chili/10 to-chili/20 border-chili/30"
    },
    {
      name: "Festari Farms & Agribusinesses (FFA)",
      icon: Trees,
      description: "Sustainable agriculture and food production.",
      color: "bg-gradient-to-br from-green-50 to-green-100 border-green-200"
    },
    {
      name: "Festari Enterprise (FEnt)",
      icon: Factory,
      description: "Strategic trade and business development.",
      color: "bg-gradient-to-br from-mikado/10 to-mikado/20 border-mikado/30"
    }
  ];

  // Company Values
  const coreValues = [
    { icon: Target, title: "Purpose-Driven", description: "Everything we do is grounded in meaning and directed toward long-term transformation." },
    { icon: Award, title: "Excellence Without Compromise", description: "We uphold the highest standards of quality, precision, and impact." },
    { icon: FileText, title: "Integrity at the Core", description: "We lead with truth, transparency, and ethical responsibility." },
    { icon: Users, title: "People First", description: "We believe that progress begins with empowered individuals and inclusive growth." },
    { icon: Lightbulb, title: "Innovation in Action", description: "We merge cutting-edge knowledge with indigenous insights to create bold, relevant solutions." },
    { icon: Leaf, title: "Sustainability Matters", description: "We are committed to strategies that respect both people and planet." },
    { icon: Handshake, title: "Collaboration as a Culture", description: "We build bridges — across disciplines, borders, and generations — to create shared success." },
  ];

  // Partnership Opportunities
  const partnershipTypes = [
    { type: "Academic Institutions", description: "Collaborate on research, curriculum development, or joint training programs through FIA and FRCI." },
    { type: "Industry Stakeholders", description: "Partner in mining projects, consulting services, or technology transfer initiatives." },
    { type: "NGOs & Development Agencies", description: "Co-create community empowerment projects in agriculture, safety, and education." },
    { type: "Real Estate Developers", description: "Work with FEA to scale housing, infrastructure, and investment projects." },
    { type: "Agribusiness Investors", description: "Co-invest in sustainable farming and value-added agribusiness through FFA." },
    { type: "Entrepreneurs & Traders", description: "Join forces with Festari Enterprise (FEnt) for distribution, trading, or commercial services." },
    { type: "International Bodies", description: "Form joint ventures or knowledge exchange platforms that amplify regional and global impact." },
  ];

  // Current Projects
  const currentProjects = [
    {
      title: "Organic Vegetable Farming Initiative",
      description: "We are developing an organic vegetable farming project to supply healthy produce to local and institutional markets. Support is welcome in the form of technical expertise, irrigation systems, farm input sponsorship, and distribution partnerships.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      title: "250-Student Hostel Facility",
      description: "We are constructing a modern hostel facility to accommodate 250 university students in Tarkwa. We welcome partnerships for each construction phase, including materials support, co-development, or infrastructure funding.",
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About Festari Group Ltd | Innovating Africa's Future</title>
        <meta
          name="description"
          content="Discover Festari Group Ltd's innovative solutions across industries including education, agribusiness, real estate, and more. Join us in transforming Africa."
        />
        <meta
          name="keywords"
          content="Festari Group, business solutions, innovation, education, agriculture, real estate, trade, consulting, Africa development"
        />
        <meta property="og:title" content="About Festari Group Ltd" />
        <meta
          property="og:description"
          content="Explore how Festari Group Ltd is driving impactful change across Africa through its diverse subsidiaries and initiatives."
        />
        <meta property="og:image" content="https://www.festarigroup.com/logo-icon-black.png" />
        <meta property="og:url" content="https://www.festarigroup.com/about" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-festari-900 to-festari-accent z-0">
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1029&q=80')] bg-no-repeat bg-cover"></div>
            </div>
            <div className="container-custom relative z-10">
              <motion.div
                className="max-w-4xl mx-auto text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 bg-mikado/20 hover:bg-mikado/30 text-mikado border-mikado/20">About Festari Group</Badge>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-white">
                  Transforming Africa Through Multidisciplinary Excellence
                </h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
                  Festari Group Ltd is a multidisciplinary holding company based in Ghana, focused on delivering practical,
                  research-informed, and transformative solutions across key sectors including mining consultancy,
                  professional education, real estate, agribusiness, and strategic trade.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild className="bg-mikado hover:bg-mikado/90 text-festari-900 px-6">
                    <a href="#subsidiaries">Our Subsidiaries</a>
                  </Button>
                  <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6">
                    <a href="#mission">Our Mission & Vision</a>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Decorative waves */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor" className="text-gray-50"></path>
              </svg>
            </div>
          </section>

          {/* Subsidiaries Section */}
          <section id="subsidiaries" className="py-20 bg-gray-50">
            <div className="container-custom">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-indigo/10 text-indigo border-indigo/20">Our Ecosystem</Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">Our Family of Companies</h2>
                <p className="text-festari-600">
                  Our ecosystem of subsidiaries work collaboratively to address pressing challenges
                  and unlock opportunities across the value chain.
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {subsidiaries.map((subsidiary, index) => (
                  <motion.div
                    key={index}
                    className={cn("group relative p-8 rounded-xl shadow-md border border-opacity-30 transition-all duration-300 hover:shadow-lg", subsidiary.color)}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                  >
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-white/30 text-festari-900 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight size={16} />
                    </div>
                    <div className="mb-6 p-3 rounded-full bg-white/80 w-16 h-16 flex items-center justify-center">
                      <subsidiary.icon className="w-8 h-8 text-festari-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-festari-900 mb-3">{subsidiary.name}</h3>
                    <p className="text-festari-600">{subsidiary.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Mission & Vision Section */}
          <section id="mission" className="py-20 bg-white">
            <div className="container-custom">
              <div className="grid md:grid-cols-2 gap-12">
                {/* Mission Card */}
                <motion.div
                  className="relative overflow-hidden rounded-xl p-8 shadow-lg border border-festari-100 bg-gradient-to-br from-white to-festari-50"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-festari-accent/5 z-0"></div>
                  <div className="relative z-10">
                    <Badge className="mb-4 bg-festari-accent/10 text-festari-accent border-festari-accent/30">Our Mission</Badge>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-festari-900 mb-4">Our Mission</h2>
                    <p className="text-festari-700 leading-relaxed">
                      To deliver transformative solutions through innovation, education, consulting,
                      and enterprise — advancing Africa's potential, one empowered individual,
                      thriving community, and resilient institution at a time.
                    </p>
                  </div>
                </motion.div>

                {/* Vision Card */}
                <motion.div
                  className="relative overflow-hidden rounded-xl p-8 shadow-lg border border-festari-100 bg-gradient-to-br from-white to-festari-50"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-festari-accent/5 z-0"></div>
                  <div className="relative z-10">
                    <Badge className="mb-4 bg-festari-accent/10 text-festari-accent border-festari-accent/30">Our Vision</Badge>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-festari-900 mb-4">Our Vision</h2>
                    <p className="text-festari-700 leading-relaxed">
                      To become Africa's most trusted and pioneering force in multidisciplinary
                      development — where bold ideas meet grounded solutions, and where local
                      expertise fuels global relevance.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="py-20 bg-gray-50">
            <div className="container-custom">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-chili/10 text-chili border-chili/20">Our Principles</Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">Core Values</h2>
                <p className="text-festari-600">
                  Our values guide everything we do, from how we interact with clients to how we develop solutions.
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {coreValues.map((value, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-festari-100/30"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.1 }
                      }
                    }}
                  >
                    <div className="bg-festari-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <value.icon className="w-6 h-6 text-festari-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-festari-900 mb-2">{value.title}</h3>
                    <p className="text-festari-600">{value.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Partnership Section */}
          <section className="py-20 bg-white">
            <div className="container-custom">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-mikado/20 text-festari-900 border-mikado/30">Collaboration</Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">Partner With Us</h2>
                <p className="text-festari-700">
                  We welcome individuals, institutions, and organizations to join us in delivering
                  impactful solutions. Whether you're an investor, academic, nonprofit, consultant,
                  or industry leader — there's a space for you within our ecosystem.
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {partnershipTypes.map((partner, index) => (
                  <motion.div
                    key={index}
                    className="bg-festari-50/50 p-5 rounded-lg border border-festari-100/30 hover:bg-festari-50 transition-colors"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.07 }
                      }
                    }}
                  >
                    <h3 className="text-lg font-bold text-festari-900 mb-2 flex items-center">
                      <CheckCircle size={16} className="text-festari-accent mr-2" />
                      {partner.type}
                    </h3>
                    <p className="text-festari-700 text-sm">{partner.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Projects Section */}
          <section className="py-20 bg-gray-50">
            <div className="container-custom">
              <motion.div
                className="text-center max-w-3xl mx-auto mb-16"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <Badge className="mb-4 bg-indigo/10 text-indigo border-indigo/20">Current Initiatives</Badge>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-festari-900 mb-4">Support Our Projects</h2>
                <p className="text-festari-700">
                  Festari Group Ltd is actively pursuing high-impact initiatives that align with our mission to empower communities,
                  foster sustainability, and stimulate local economies.
                </p>
              </motion.div>

              <motion.div
                className="grid md:grid-cols-2 gap-10"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, delay: index * 0.2 }
                      }
                    }}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-festari-900 mb-3">{project.title}</h3>
                      <p className="text-festari-700 mb-4">{project.description}</p>
                      <Button className="bg-festari-accent hover:bg-festari-accent/90">Support This Project</Button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="py-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-festari-900 to-festari-accent">
              <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1557683304-673a23048d34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1029&q=80')] bg-no-repeat bg-cover"></div>
            </div>
            <div className="container-custom relative z-10">
              <motion.div
                className="max-w-3xl mx-auto text-center text-white"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Ready to Make an Impact?</h2>
                <p className="text-white/90 text-lg mb-8">
                  Join us in creating transformative solutions for Africa's future. Together,
                  we can drive sustainable development and sectoral excellence.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact">
                    <Button className="bg-white text-festari-900 hover:bg-white/90 px-8 py-6 text-lg">
                      Contact Us Today
                    </Button>
                  </Link>
                  <Link to="/founder">
                    <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                      Meet Our Founder
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
