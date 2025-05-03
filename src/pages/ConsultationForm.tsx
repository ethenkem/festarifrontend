
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ConsultationRequestForm from '@/components/common/ConsultationRequestForm';
import { serviceCategories } from '@/data/services';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

const ConsultationPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('request');

  // Parse query parameters to pre-select category and service
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category');
  const serviceParam = searchParams.get('service');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Background image with overlay - updated with better image and consistent overlay */}
        <section
          className="relative py-16 bg-cover bg-center text-white"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-800/80 to-purple-700/70"></div>
          <div className="container-custom max-w-4xl text-center relative z-10">
            <h1 className="text-3xl font-display font-bold text-white mb-4">
              Professional Consultation Services
            </h1>
            <p className="text-white/90 max-w-2xl mx-auto">
              Connect with our experts to discuss your specific needs and receive tailored solutions for your project or business requirements.
            </p>
          </div>
        </section>

        <div className="py-16 bg-gray-50">
          <div className="container-custom max-w-4xl">
            <div className="bg-accent/10 p-4 sm:p-8 rounded-lg mb-8">
              <h2 className="text-2xl font-display font-bold text-festari-900 mb-4 text-center">
                Request a Consultation
              </h2>
              <p className="text-festari-600 text-center max-w-2xl mx-auto">
                Our team will review your request and get back to you within 24-48 hours to schedule a consultation.
              </p>
            </div>

            <Tabs defaultValue="request" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="request" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Consultation Request</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>FAQ & Information</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="request" className="space-y-6">
                <ConsultationRequestForm
                  title="Request a Professional Consultation"
                  subtitle="Our team of experts is ready to assist you with specialized solutions tailored to your needs."
                />
              </TabsContent>

              <TabsContent value="faq" className="space-y-6">
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What happens after I submit a consultation request?</h3>
                    <p className="text-festari-600">
                      Our team will review your request and get back to you within 24-48 hours to schedule an initial discussion or provide further information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Is there a fee for the initial consultation?</h3>
                    <p className="text-festari-600">
                      The initial consultation is complimentary. Any fees for subsequent services will be discussed during this consultation based on your specific requirements.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How long does a typical consultation process take?</h3>
                    <p className="text-festari-600">
                      The consultation timeline varies depending on the complexity of your needs. We aim to provide initial insights and recommendations within one week of our first meeting.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Can consultations be conducted remotely?</h3>
                    <p className="text-festari-600">
                      Yes, we offer both in-person and remote consultations via video conferencing to accommodate your preferences and location.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ConsultationPage;
