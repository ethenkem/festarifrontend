import { useEffect, useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Lottie from "lottie-react";
import festariLoading from "../assets/festariLoading.json"
import {
  CalendarDays,
  MapPin,
  Book,
  Globe,
  Award,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Mail,
  Phone,
  Linkedin,
  Building,
  BookOpen,
  Users,
  ChevronsRight,
  FileText,
  Check
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';
import { FounderProfile } from '@/types/foundersData';
import { Helmet } from 'react-helmet-async';

// Animation variants
const fadeIn = {
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

const itemVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const Founder = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [founderData, setFounderData] = useState<FounderProfile>();
  const [loading, setLoading] = useState(true)
  const lottieRef = useRef(null);

  useEffect(() => {
    const fetchFounderProfile = async () => {
      try {
        const response = await axios.get<FounderProfile>(`${BACKEND_URL}/v1/core/founders-profile/`);
        console.log(response.data);
        setFounderData(response.data);
      } catch (err) {
        console.error("eeurur", err);
      } finally {
        setLoading(false)
      }
    };
    fetchFounderProfile();
  }, []);

  return (
    <>
      <Helmet>
        <title>Meet the Founder of Festari Group Ltd</title>
        <meta
          name="description"
          content="Learn about the visionary founder of Festari Group Ltd. With a passion for innovation, our founder drives the company's growth and success across Africa."
        />
        <meta
          name="keywords"
          content="Festari Group, founder, leadership, entrepreneurship, innovation, business leader, Africa, business solutions"
        />
        <meta property="og:title" content="Meet the Founder of Festari Group Ltd" />
        <meta
          property="og:description"
          content="Get to know the founder behind Festari Group Ltd. Discover his journey, values, and leadership in transforming businesses across Africa."
        />
        <meta property="og:image" content="https://www.festarigroup.com/" />
        <meta property="og:url" content="https://www.festarigroup.com/founder" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Meet the Founder of Festari Group Ltd" />
        <meta
          name="twitter:description"
          content="Learn about the visionary founder of Festari Group Ltd, his background, leadership, and dedication to growing sustainable businesses across Africa."
        />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        {!loading ?
          <main className="flex-grow pt-20">
            {/* Hero section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="relative py-20 bg-gradient-to-r from-festari-900 to-festari-accent/90 text-white"
            >
              <div className="container-custom flex flex-col md:flex-row gap-8 items-center">
                <motion.div
                  className="w-40 h-40 md:w-64 md:h-64 overflow-hidden rounded-full border-4 border-white/30 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={`${BACKEND_URL}${founderData.profile_image}`}
                    alt={founderData.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="max-w-2xl">
                  <h1 className="text-3xl md:text-5xl font-display font-bold mb-3 text-balance">{founderData.name}</h1>
                  <p className="text-xl text-festari-100 mb-4">{founderData.title}</p>

                  <div className="flex items-center mb-6">
                    <MapPin size={18} className="text-festari-200 mr-2" />
                    <span className="text-festari-100">{founderData.location}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {founderData.expertise.slice(0, 5).map((skill, index) => (
                      <Badge key={index} className="bg-white/20 hover:bg-white/30 text-white">
                        {skill.expertise}
                      </Badge>
                    ))}
                    {founderData.expertise.length > 5 && (
                      <Badge className="bg-white/10 hover:bg-white/20 text-white">
                        +{founderData.expertise.length - 5} more
                      </Badge>
                    )}
                  </div>

                  <p className="text-festari-100 text-lg leading-relaxed">{founderData.bio}</p>
                </div>
              </div>

              {/* Decorative shapes */}
              <div className="absolute bottom-0 left-0 w-full overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px]">
                  <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor" className="text-gray-50"></path>
                </svg>
              </div>
            </motion.section>

            {/* Stats section */}
            <motion.section
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="py-10"
            >
              <div className="container-custom">
                <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4 shadow-md">
                  <motion.div variants={itemVariant} className="text-center p-4">
                    <p className="text-4xl font-bold text-festari-accent">244</p>
                    <p className="text-sm text-festari-600">Publications</p>
                  </motion.div>
                  <motion.div variants={itemVariant} className="text-center p-4 border-x border-festari-100/20">
                    <p className="text-4xl font-bold text-festari-accent">242</p>
                    <p className="text-sm text-festari-600">Professional Connections</p>
                  </motion.div>
                  <motion.div variants={itemVariant} className="text-center p-4">
                    <p className="text-4xl font-bold text-festari-accent">2+</p>
                    <p className="text-sm text-festari-600">Years Experience</p>
                  </motion.div>
                </div>
              </div>
            </motion.section>

            {/* Content tabs */}
            <section className="py-12">
              <div className="container-custom">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8 bg-festari-50">
                      <TabsTrigger value="about">About</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="publications">Publications</TabsTrigger>
                      <TabsTrigger value="contact">Contact</TabsTrigger>
                    </TabsList>

                    {/* About Tab */}
                    <TabsContent value="about" className="space-y-8">
                      <Card className="border-none shadow-md">
                        <CardContent className="pt-6">
                          <h2 className="text-2xl font-bold text-festari-900 mb-4">Biography</h2>
                          <p className="text-festari-700 mb-6 text-lg leading-relaxed">{founderData.long_bio}</p>

                          <div className="grid md:grid-cols-2 gap-8 mt-8">
                            <div>
                              <h2 className="text-xl font-bold text-festari-900 mb-4 flex items-center gap-2">
                                <Award size={20} className="text-festari-accent" />
                                Professional Organizations
                              </h2>
                              <div className="space-y-4">
                                {founderData.organizations.map((org, index) => (
                                  <motion.div
                                    key={index}
                                    className="flex items-start p-3 rounded-lg border border-festari-100/30 hover:bg-festari-50 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div>
                                      <h3 className="font-semibold text-festari-900">{org.name}</h3>
                                      <p className="text-festari-600 text-sm">{org.role} • {org.period}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h2 className="text-xl font-bold text-festari-900 mb-4 flex items-center gap-2">
                                <FileText size={20} className="text-festari-accent" />
                                Certifications
                              </h2>
                              <div className="space-y-4">
                                {founderData.certifications.map((cert, index) => (
                                  <motion.div
                                    key={index}
                                    className="flex items-start p-3 rounded-lg border border-festari-100/30 hover:bg-festari-50 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <div>
                                      <h3 className="font-semibold text-festari-900">{cert.name}</h3>
                                      <p className="text-festari-600 text-sm">{cert.issuer} • {cert.date}</p>
                                      <p className="text-festari-500 text-xs">ID: {cert.id}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <Separator className="my-8" />

                          <h2 className="text-xl font-bold text-festari-900 mb-4 flex items-center gap-2">
                            <Check size={20} className="text-festari-accent" />
                            Fields of Expertise
                          </h2>
                          <div className="flex flex-wrap gap-2 mb-6">
                            {founderData.expertise.map((skill, index) => (
                              <Badge key={index} variant="outline" className="bg-festari-50 px-3 py-1 text-sm">
                                {skill.expertise}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Experience Tab */}
                    <TabsContent value="experience" className="space-y-6">
                      <Card className="border-none shadow-md">
                        <CardContent className="pt-6">
                          <h2 className="text-2xl font-bold text-festari-900 mb-6 flex items-center gap-2">
                            <Briefcase size={22} className="text-festari-accent" />
                            Professional Experience
                          </h2>
                          <div className="space-y-8">
                            {founderData.experience.map((exp, index) => (
                              <motion.div
                                key={index}
                                className="relative pl-8 border-l-2 border-festari-100"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-festari-accent"></div>
                                <div className="p-4 rounded-lg border border-festari-100/30 hover:bg-festari-50/50 transition-colors ml-4">
                                  <h3 className="font-bold text-festari-900 text-lg">{exp.position}</h3>
                                  <div className="flex items-center text-festari-600 mb-1">
                                    <Building size={16} className="mr-1" />
                                    <span className="font-medium">{exp.company}</span>
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center text-festari-500 text-sm mb-3">
                                    <div className="flex items-center mr-4">
                                      <CalendarDays size={14} className="mr-1" />
                                      <span>{exp.period}</span>
                                    </div>
                                    <div className="flex items-center">
                                      <MapPin size={14} className="mr-1" />
                                      <span>{exp.location}</span>
                                    </div>
                                  </div>
                                  <p className="text-festari-700 mt-2">{exp.description}</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {founderData.volunteer?.length > 0 && (
                            <>
                              <h2 className="text-xl font-bold text-festari-900 mt-12 mb-6 flex items-center gap-2">
                                <Users size={20} className="text-festari-accent" />
                                Volunteer Experience
                              </h2>
                              <div className="space-y-6">
                                {founderData.volunteer.map((exp, index) => (
                                  <motion.div
                                    key={index}
                                    className="p-4 rounded-lg border border-festari-100/30 hover:bg-festari-50/50 transition-colors"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <h3 className="font-bold text-festari-900">{exp.position}</h3>
                                    <p className="text-festari-600">{exp.organization}</p>
                                    <p className="text-festari-500 text-sm">{exp.period}</p>
                                    <p className="text-festari-700 mt-2">{exp.description}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education">
                      <Card className="border-none shadow-md">
                        <CardContent className="pt-6">
                          <h2 className="text-2xl font-bold text-festari-900 mb-6 flex items-center gap-2">
                            <GraduationCap size={22} className="text-festari-accent" />
                            Education
                          </h2>
                          <div className="space-y-8">
                            {founderData.education.map((edu, index) => (
                              <motion.div
                                key={index}
                                className="relative pl-8 border-l-2 border-festari-100"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-festari-accent"></div>
                                <div className="p-4 rounded-lg border border-festari-100/30 hover:bg-festari-50/50 transition-colors ml-4">
                                  <h3 className="font-bold text-festari-900 text-lg">{edu.degree}</h3>
                                  <div className="flex items-center text-festari-600 mb-1">
                                    <BookOpen size={16} className="mr-1" />
                                    <span className="font-medium">{edu.institution}</span>
                                  </div>
                                  <div className="flex items-center text-festari-500 text-sm mb-3">
                                    <CalendarDays size={14} className="mr-1" />
                                    <span>{edu.year}</span>
                                  </div>
                                  {edu.activities && (
                                    <div className="mt-2">
                                      <p className="text-festari-600 text-sm font-medium">Activities & Societies:</p>
                                      <p className="text-festari-700">{edu.activities}</p>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Publications Tab */}
                    <TabsContent value="publications" className="space-y-6">
                      <Card className="border-none shadow-md">
                        <CardContent className="pt-6">
                          <h2 className="text-2xl font-bold text-festari-900 mb-6 flex items-center gap-2">
                            <Book size={22} className="text-festari-accent" />
                            Research Publications
                          </h2>
                          <div className="space-y-6">
                            {founderData.publications.map((pub, index) => (
                              <motion.div
                                key={index}
                                className="p-5 border rounded-lg hover:bg-festari-50/50 transition-colors"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                              >
                                <div className="flex items-start">
                                  <div className="min-w-8 mt-1 mr-4">
                                    <div className="w-8 h-8 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent">
                                      <Book size={18} />
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-festari-900 text-lg mb-2">{pub.title}</h3>
                                    <div className="flex flex-wrap gap-y-2 text-sm text-festari-600 mb-3">
                                      <div className="flex items-center mr-4">
                                        <CalendarDays size={14} className="mr-1" />
                                        <span>{pub.date || pub.year}</span>
                                      </div>
                                      {pub.publisher && (
                                        <div className="flex items-center mr-4">
                                          <BookOpen size={14} className="mr-1" />
                                          <span>{pub.publisher}</span>
                                        </div>
                                      )}
                                      {(pub.volume || pub.issue) && (
                                        <div className="mr-4">
                                          <span>
                                            {pub.volume && `Vol. ${pub.volume}`}
                                            {pub.issue && `, Issue ${pub.issue}`}
                                          </span>
                                        </div>
                                      )}
                                      {pub.pages && (
                                        <div className="mr-4">
                                          <span>Pages {pub.pages}</span>
                                        </div>
                                      )}
                                    </div>
                                    <p className="text-festari-700 text-sm mb-3"><strong>Authors:</strong> {pub.authors}</p>
                                    {pub.description && (
                                      <p className="text-festari-600 text-sm mt-2 mb-4">{pub.description}</p>
                                    )}
                                    <div className="mt-2">
                                      <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-festari-accent hover:underline flex items-center text-sm">
                                        <span className="mr-1">View Publication</span>
                                        <ExternalLink size={14} />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Contact Tab */}
                    <TabsContent value="contact">
                      <Card className="border-none shadow-md">
                        <CardContent className="pt-6">
                          <h2 className="text-2xl font-bold text-festari-900 mb-6 flex items-center gap-2">
                            <Mail size={22} className="text-festari-accent" />
                            Contact Information
                          </h2>

                          <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-xl border border-festari-100/30">
                              <div className="space-y-6">
                                <motion.div
                                  className="flex items-center space-x-4"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-10 h-10 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent flex-shrink-0">
                                    <Mail size={20} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-festari-500">Email</p>
                                    <a href={`mailto:${founderData.email}`} className="text-festari-900 hover:text-festari-accent font-medium">
                                      {founderData.email}
                                    </a>
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="flex items-center space-x-4"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-10 h-10 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent flex-shrink-0">
                                    <Phone size={20} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-festari-500">Phone</p>
                                    <a href={`tel:${founderData.phone}`} className="text-festari-900 hover:text-festari-accent font-medium">
                                      {founderData.phone}
                                    </a>
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="flex items-center space-x-4"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-10 h-10 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent flex-shrink-0">
                                    <Phone size={20} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-festari-500">Mobile Phone (International)</p>
                                    <a href={`tel:${founderData.mobile_phone}`} className="text-festari-900 hover:text-festari-accent font-medium">
                                      {founderData.mobile_phone}
                                    </a>
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="flex items-center space-x-4"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-10 h-10 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent flex-shrink-0">
                                    <MapPin size={20} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-festari-500">Location</p>
                                    <p className="text-festari-900 font-medium">{founderData.location}</p>
                                  </div>
                                </motion.div>

                                <motion.div
                                  className="flex items-center space-x-4"
                                  whileHover={{ x: 5 }}
                                  transition={{ type: "spring", stiffness: 400 }}
                                >
                                  <div className="w-10 h-10 bg-festari-accent/10 rounded-full flex items-center justify-center text-festari-accent flex-shrink-0">
                                    <Linkedin size={20} />
                                  </div>
                                  <div>
                                    <p className="text-sm text-festari-500">LinkedIn</p>
                                    <a href="https://www.linkedin.com/in/dr-festus-kunkyin-saadaari/" target="_blank" rel="noopener noreferrer" className="text-festari-900 hover:text-festari-accent font-medium">
                                      Connect on LinkedIn
                                    </a>
                                  </div>
                                </motion.div>
                              </div>
                            </div>

                            <div className="bg-festari-50/50 p-6 rounded-xl border border-festari-100/30">
                              <h3 className="text-xl font-bold text-festari-900 mb-4">Send a Message</h3>
                              <form className="space-y-4">
                                <div>
                                  <label htmlFor="name" className="block text-sm font-medium text-festari-700 mb-1">Name</label>
                                  <input
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-2 rounded-md border border-festari-200 focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                                    placeholder="Your name"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium text-festari-700 mb-1">Email</label>
                                  <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-2 rounded-md border border-festari-200 focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                                    placeholder="Your email address"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="message" className="block text-sm font-medium text-festari-700 mb-1">Message</label>
                                  <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-md border border-festari-200 focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
                                    placeholder="Your message"
                                  ></textarea>
                                </div>
                                <Button className="w-full bg-festari-accent hover:bg-festari-accent/90">
                                  <Mail size={16} className="mr-2" />
                                  Send Message
                                </Button>
                              </form>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </div>
            </section>

            {/* Call to action */}
            <section className="py-16 bg-festari-900 text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl font-display font-bold mb-4">Interested in collaborating?</h2>
                <p className="text-festari-100 max-w-2xl mx-auto mb-8">
                  Dr. Kunkyin-Saadaari is open to research collaborations, consulting opportunities, and speaking engagements related to mining engineering, rock mechanics, and artificial intelligence applications.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-festari-900">
                    <Mail size={18} className="mr-2" />
                    Contact for Consulting
                  </Button>
                  <Button className="bg-festari-accent hover:bg-festari-accent/90">
                    <Users size={18} className="mr-2" />
                    Research Collaboration
                  </Button>
                </div>
              </div>
            </section>
          </main> : <div className='mt-20 px-7'>
            <Lottie
              size={10}
              lottieRef={lottieRef}
              animationData={festariLoading}
              loop={false}
            />
          </div>}
        <Footer />
      </div>
    </>
  );
};

export default Founder;
