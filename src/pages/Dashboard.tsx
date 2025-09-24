import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building, BookOpen, Bell, User, Search, Calendar, Heart, Settings, LogOut, Plus, Delete, Camera, Save, KeyIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/auth-context';
import PropertySubmissionModal from '@/components/property/PropertySubmissionModal';
import { BACKEND_URL } from '@/configs/constants';
import { AuthResponse } from '@/types/auths';
import UpdatePropertySubmissionModal from '@/components/property/UpdatePropertyModal';
import Lottie from 'lottie-react';
import festariLoading from "../assets/loading colour.json"
import { useVerifyToken } from '@/hooks/use-verify-token';
import { PageLoading } from '@/App';



const Dashboard = () => {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState("overview");
  const { loading } = useVerifyToken();
  const { toast } = useToast();
  const lottieRef = useRef(null);
  const [properties, setProperties] = useState([])
  const { userData: user, logout, setNewUserData } = useAuth()
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false)
  const [showUpdatePropertyModal, setShowUpdatePropertyModal] = useState(false)
  const [propertyData, setPropertyData] = useState({})
  const [loadingProperties, setLoadingProperties] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.user?.first_name,
    lastName: user?.user?.last_name,
    email: user?.user?.email,
    profilePicture: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unVerifiedProperties, setUnVerifiedProperties] = useState([])
  const navigate = useNavigate();

  const handlePropertyUpdate = (property) => {
    setShowUpdatePropertyModal(true)
    setPropertyData(property)
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const fetchMyProperties = async () => {
    setLoadingProperties(true)
    const response = await fetch(`${BACKEND_URL}/v1/real-estates/my-listings/`, {
      headers: {
        Authorization: `Bearer ${user.access}`,
      },
    });
    const data = await response.json();
    console.log(data)
    setProperties(data)
    setUnVerifiedProperties(data.filter(property => property.is_approved === false))
    setLoadingProperties(false)
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewImage(imageUrl);
        setFormData(prev => ({
          ...prev,
          profilePicture: file
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogOut = () => {
    logout()
    navigate("/")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append('first_name', formData.firstName);
      submitData.append('last_name', formData.lastName);
      submitData.append('email', formData.email);

      if (formData.profilePicture instanceof File) {
        submitData.append('profile_pic', formData.profilePicture);
      }

      const response = await fetch(`${BACKEND_URL}/accounts/me/`, {
        method: 'PUT',
        body: submitData,
        headers: {
          'Authorization': `Bearer ${user.access}`,
        }
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const result = await response.json();
      console.log('Profile updated successfully:', result);
      alert('Profile updated successfully!');
      const newAuthData: AuthResponse = {
        ...user,
        user: result,
      };
      setNewUserData(newAuthData)
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!user || Object.keys(user).length === 0) {
      navigate("/login");
    }
    fetchMyProperties()
  }, []);

  const handleAddPropertyClick = () => {
    setShowAddPropertyModal(true);
  };

  if (loading) {
    return <PageLoading />;
  }

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
                  Welcome back, {user.user.first_name}
                </h1>
                <p className="text-festari-600">
                  Manage your properties and account settings
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={handleAddPropertyClick}
                >

                  Add Property
                  <Plus size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="flex border py-4 justify-evenly md:flex-row md:justify-evenly mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="properties">My Properties</TabsTrigger>
              <TabsTrigger value="profile" className="md:flex">My Profile</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">My Properties</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    {loadingProperties ? <div className='w-full'>
                      <Lottie
                        className='h-32'
                        lottieRef={lottieRef}
                        animationData={festariLoading}
                        loop={false}
                      />
                    </div> :
                      <div>
                        <div className="text-2xl font-bold">{properties.length}</div>
                        <p className="text-xs text-muted-foreground">Properties Submitted</p>
                      </div>}
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link to="/properties" className="text-xs text-festari-accent hover:underline">View other properties</Link>
                  </CardFooter>
                </Card>

                {/*<Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">2</div>
                    <p className="text-xs text-muted-foreground">1 in progress</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Link to="/research" className="text-xs text-festari-accent hover:underline">Continue learning</Link>
                  </CardFooter>
                </Card> */}

                {/* <Card>
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
                */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0">
                    <div className="text-2xl font-bold">4</div>
                    <p className="text-xs text-muted-foreground">2 require action</p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <button
                      className="text-xs text-festari-accent hover:underline"
                      onClick={null}
                    >
                      View notifications
                    </button>
                  </CardFooter>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Properties pending approval</CardTitle>
                  <CardDescription>Properties you submitted that are awaiting approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="bg-festari-100 p-2 rounded-full">
                        <Building size={20} className="text-festari-accent" />
                      </div>
                      {unVerifiedProperties.length == 0 ? (
                        <div>
                          <p>No properties awaiting approval</p>
                        </div>
                      ) : (unVerifiedProperties.map((item) =>
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.location}</p>
                        </div>))
                      }
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submitted Properties</CardTitle>
                  <CardDescription>Properties you've submitted to be verified</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {properties.length === 0 ? (
                      <div>
                        {/* Empty state goes here if needed */}
                        <h1 className="text-2xl">No properties posted by you</h1>
                      </div>
                    ) : (
                      properties.map((property) => (
                        <div key={property.property_id} className="border rounded-lg overflow-hidden group">
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
                              <h3 className="font-medium hover:text-festari-accent transition-colors">
                                {property.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                            <div className="mt-2 flex justify-between items-center">
                              <p className="font-semibold text-festari-accent">{property.price}</p>
                              <Button size="sm" variant="outline" onClick={() => handlePropertyUpdate(property)}>
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                  </div>
                </CardContent>
                <CardFooter>
                  <Link to="/properties">
                    <Button variant="outline">Browse Other Properties</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Courses Tab */}
            {/*
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
          */}

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
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : user?.user?.profile_pic ? (
                          <img
                            src={user.user.profile_pic}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User size={64} className="text-festari-400" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        <Camera size={16} />
                        Change Photo
                      </label>

                      <div className="mt-6 w-full">
                        <h3 className="text-sm font-medium mb-3">Account Options</h3>
                        <div className="space-y-2">

                          <button onClick={handleLogOut} className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded-md text-red-600">
                            <LogOut onClick={handleLogOut} size={16} /> Sign Out
                          </button>

                          <button className="flex items-center gap-2 text-sm w-full p-2 hover:bg-gray-100 rounded-md text-green-500">
                            <Link to="/change-password">
                             Change Password
                            </Link>
                          </button>

                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">First Name</label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Last Name</label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email Address</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-500"
                            required
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-festari-800 text-white rounded-md hover:bg-festari-600"
                        >
                          <Save size={16} />
                          {isSubmitting ? 'Saving...' : 'Save Changes'}
                        </button>
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
      <PropertySubmissionModal
        isOpen={showAddPropertyModal}
        onClose={() => setShowAddPropertyModal(false)}
      />
      <UpdatePropertySubmissionModal
        isOpen={showUpdatePropertyModal}
        onClose={() => setShowUpdatePropertyModal(false)}
        propertyData={propertyData}
        fetchProperties={fetchMyProperties}
      />
      <Footer />
    </div>
  );
};

export default Dashboard;
