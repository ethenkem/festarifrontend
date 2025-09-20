import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, BookOpen, Bell, User, Search, Calendar, Heart, Settings, LogOut } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { getUserInfo } from '@/utils/storage';
import { useAuth } from '@/context/auth-context';

// Mock user data
const userData = {
  name: "Alex Johnson",
  email: "alex@example.com",
  savedProperties: 4,
  courses: 2,
  upcomingViewings: 1,
  notifications: 3,
};

// Mock property data
const savedProperties = [
  {
    id: 1,
    title: "Luxury Apartment in Downtown",
    price: "$2,500/month",
    location: "123 Main St, Downtown",
    type: "Apartment",
    image: "https://source.unsplash.com/random/300x200/?apartment"
  },
  {
    id: 2,
    title: "Modern Studio near University",
    price: "$1,800/month",
    location: "456 College Ave",
    type: "Studio",
    image: "https://source.unsplash.com/random/300x200/?studio"
  }
];

// Mock course data
const enrolledCourses = [
  {
    id: 1,
    title: "Introduction to Real Estate Investment",
    progress: 65,
    instructor: "Dr. Sarah Smith",
    nextLesson: "Financing Strategies"
  },
  {
    id: 2,
    title: "Property Management Fundamentals",
    progress: 30,
    instructor: "Prof. Michael Brown",
    nextLesson: "Tenant Screening Processes"
  }
];

const Dashboard = () => {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  const { userData: user } = useAuth()
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate("/login");
    }
  }, []);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />
      <main className="flex-grow mt-20 py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container-custom">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-festari-900 font-display">
                  Welcome back, {userData.name}
                </h1>
                <p className="text-festari-600">
                  Manage your properties, courses, and account settings
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleNotificationClick}
                >
                  <Bell size={16} />
                  <Badge variant="secondary">
                    {userData.notifications}
                  </Badge>
                </Button>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="calendar" className="hidden md:flex">Calendar</TabsTrigger>
              <TabsTrigger value="profile" className="hidden md:flex">Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{userData.savedProperties}</div>
                    <p className="text-xs text-muted-foreground">4 new this month</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link to="/real-estate" className="text-xs text-festari-accent hover:underline">View all properties</Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{userData.courses}</div>
                    <p className="text-xs text-muted-foreground">1 in progress</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link to="/research" className="text-xs text-festari-accent hover:underline">Continue learning</Link>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Viewings</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{userData.upcomingViewings}</div>
                    <p className="text-xs text-muted-foreground">Next: Tomorrow, 2PM</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <button className="text-xs text-festari-accent hover:underline">Manage schedule</button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">{userData.notifications}</div>
                    <p className="text-xs text-muted-foreground">2 require action</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <button
                      className="text-xs text-festari-accent hover:underline"
                      onClick={handleNotificationClick}
                    >
                      View notifications
                    </button>
                  </CardFooter>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions on Festari</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-festari-100 p-2 rounded-full">
                        <Building size={20} className="text-festari-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Property Viewing Scheduled</p>
                        <p className="text-xs text-muted-foreground">You scheduled a viewing for Luxury Apartment in Downtown</p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-festari-100 p-2 rounded-full">
                        <BookOpen size={20} className="text-festari-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Course Progress Updated</p>
                        <p className="text-xs text-muted-foreground">You completed Module 3 of Introduction to Real Estate Investment</p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-festari-100 p-2 rounded-full">
                        <Heart size={20} className="text-festari-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Property Saved</p>
                        <p className="text-xs text-muted-foreground">You saved Modern Studio near University to your favorites</p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Properties</CardTitle>
                  <CardDescription>Properties you've saved for future reference</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {savedProperties.map(property => (
                      <div key={property.id} className="border rounded-lg overflow-hidden group">
                        <div className="relative h-40 overflow-hidden">
                          <Link to={`/property/${property.id}`}>
                            <img
                              src={property.image}
                              alt={property.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </Link>
                          <div className="absolute top-2 right-2">
                            <button className="p-1.5 bg-white rounded-full shadow-md">
                              <Heart size={18} className="text-red-500" />
                            </button>
                          </div>
                          <div className="absolute bottom-2 left-2">
                            <Badge variant="secondary" className="bg-white/90 text-festari-900">
                              {property.type}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-4">
                          <Link to={`/property/${property.id}`}>
                            <h3 className="font-medium hover:text-festari-accent transition-colors">{property.title}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <div className="mt-2 flex justify-between items-center">
                            <p className="font-semibold text-festari-accent">{property.price}</p>
                            <Link to={`/property/${property.id}`}>
                              <Button size="sm" variant="outline">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/properties">
                    <Button variant="outline">Browse More Properties</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Enrolled Courses</CardTitle>
                  <CardDescription>Your current learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {enrolledCourses.map(course => (
                      <div key={course.id} className="border rounded-lg p-4">
                        <h3 className="font-medium">{course.title}</h3>
                        <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>

                        <div className="mt-3">
                          <div className="flex justify-between items-center mb-1 text-sm">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-festari-accent rounded-full h-2"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-muted-foreground">Next Lesson:</p>
                            <p className="text-sm">{course.nextLesson}</p>
                          </div>
                          <Button size="sm">Continue</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/research">
                    <Button variant="outline">Explore More Courses</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <CardTitle>Your Schedule</CardTitle>
                  <CardDescription>Upcoming viewings and course sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center p-8">
                    <Calendar size={64} className="mx-auto mb-4 text-festari-400" />
                    <h3 className="text-lg font-medium mb-2">Calendar Coming Soon</h3>
                    <p className="text-muted-foreground">
                      We're working on a comprehensive calendar feature to help you manage your schedule more effectively.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Your Profile</CardTitle>
                  <CardDescription>Manage your personal information and settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full bg-festari-100 flex items-center justify-center mb-4">
                        <User size={64} className="text-festari-400" />
                      </div>
                      <Button variant="outline" size="sm">Change Photo</Button>

                      <div className="mt-6 w-full">
                        <h3 className="text-sm font-medium mb-3">Account Options</h3>
                        <div className="space-y-2">
                          <button className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded-md">
                            <Settings size={16} /> Account Settings
                          </button>
                          <button className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded-md">
                            <Bell size={16} /> Notification Preferences
                          </button>
                          <button className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded-md text-red-600">
                            <LogOut size={16} /> Sign Out
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Full Name</label>
                          <Input value={userData.name} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <Input value={userData.email} className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input placeholder="Add your phone number" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Location</label>
                          <Input placeholder="Add your location" className="mt-1" />
                        </div>

                        <div className="pt-4">
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Dashboard;
