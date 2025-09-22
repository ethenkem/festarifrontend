import { useEffect, useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import Lottie from "lottie-react";
import {
  GraduationCap,
  User,
  Clock,
  Calendar,
  Search,

} from 'lucide-react';
import festariLoading from "../assets/loading colour.json"
import { Input } from '@/components/ui/input';
import { BACKEND_URL } from '@/configs/constants';
import axios from 'axios';
import { Link } from 'react-router-dom';


interface Course {
  id: string;
  course_name: string;
  course_flyer: string;
  description: string;
  price: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  instructor: string;
  start_date: string;
  enrolled: number;
  enrollment_link: string;
}
const Courses = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseLevel, setCourseLevel] = useState('All');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const lottieRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/v1/education/courses/`);
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchQuery.toLowerCase())
      || course.description.toLowerCase().includes(searchQuery.toLowerCase())
      || course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLevel = courseLevel === 'All' || course.level === courseLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-20">
        {/* Hero Section */}
        <section className="relative py-20 text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=3000&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo/90 to-indigo/70"></div>
          <div className="container-custom relative z-10 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Festari Courses Hub</h1>
            <p className="text-festari-100 mb-6">Comprehensive solutions for mining engineering, research, and professional services</p>
            <div className="relative max-w-xl mx-auto">
              <Input
                type="search"
                placeholder="Search services, courses, and publications..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section className="py-16 bg-festari-50">
          <div className="container-custom">
            <Tabs defaultValue="courses" className="w-full">
              <TabsContent value="courses" className="space-y-8">

                <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                  <h2 className="text-2xl font-display font-bold text-festari-900">Educational Courses</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-festari-600">Level:</span>
                    <select
                      className="p-2 border border-festari-200 rounded-md focus:outline-none focus:ring-1 focus:ring-accent text-sm"
                      value={courseLevel}
                      onChange={(e) => setCourseLevel(e.target.value)}
                    >
                      <option value="All">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {loading ?
                    <div className="flex justify-start w-full px-4">
                      <Lottie
                        size={10}
                        lottieRef={lottieRef}
                        animationData={festariLoading}
                        loop={false}
                      />
                    </div> :
                    filteredCourses.map(course => (
                      <div key={course.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                        <div className="h-48 relative overflow-hidden">
                          <img
                            src={course.course_flyer.startsWith('http') ? course.course_flyer : `https://admin.festarigroup.com/${course.course_flyer}`}
                            alt={course.course_name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-accent text-white text-xs font-bold py-1 px-2 rounded">{course.level}</div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold text-festari-900 mb-2">{course.course_name}</h3>
                          <p className="text-sm text-festari-600 mb-4">{course.description}</p>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-festari-500" />
                              <span className="text-sm text-festari-700">{course.instructor}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-festari-500" />
                              <span className="text-sm text-festari-700">{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar size={14} className="text-festari-500" />
                              <span className="text-sm text-festari-700">Starts: {new Date(course.start_date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <GraduationCap size={14} className="text-festari-500" />
                              <span className="text-sm text-festari-700">{course.enrolled} enrolled</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-festari-100">
                            <span className="text-lg font-bold text-accent">{course.price}</span>
                            <button className="text-sm text-white bg-accent hover:bg-accent/90 px-4 py-2 rounded transition-colors">
                              <Link target='_blank' to={course.enrollment_link}>
                                Enroll Now
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                  <div className="bg-white rounded-lg p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <GraduationCap size={48} className="text-festari-300" />
                    </div>
                    <h3 className="text-xl font-semibold text-festari-800 mb-2">No courses found</h3>
                    <p className="text-festari-600 mb-4">Try adjusting your search criteria or filters</p>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setSearchQuery('');
                        setCourseLevel('All');
                      }}
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Courses;
