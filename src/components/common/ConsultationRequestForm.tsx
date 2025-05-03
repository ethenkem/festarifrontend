import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { CheckCircle, SendIcon } from 'lucide-react';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

type ConsultationRequestFormProps = {
  className?: string;
  variant?: 'default' | 'white' | 'transparent';
  title?: string;
  subtitle?: string;
  description?: string;
};

const ConsultationRequestForm = ({
  className,
  variant = 'default',
  title = 'Request a Consultation',
  subtitle = 'Our experts will get back to you within 48 hours.',
  description,
}: ConsultationRequestFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    subject_or_service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/v1/festari/services/`);
        console.log(res.data);
        setServices(res.data);
      } catch (error) {

      }
    }
    fetchServices();
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setIsSubmitting(true);
      const res = await axios.post(`${BACKEND_URL}/v1/consultations/consultation-request/`, formData)
      console.log("Result", res.data);
      toast({
        title: "Consultation Request Submitted",
        description: "Thank you for your request. We will contact you within 48 hours. For urgent matters, call: 0207702157",
      });
      // Reset form after submission
      setFormData({
        full_name: '',
        email: '',
        phone_number: '',
        subject_or_service: '',
        message: '',
      });
    }
    catch (error) {
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form. Please try again.');
      setIsSubmitting(false);
    }
    finally {
      setIsSubmitting(false);
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'white':
        return 'bg-white border border-gray-100 shadow-lg';
      case 'transparent':
        return 'bg-white/80 backdrop-blur-md border border-white/20 shadow-lg';
      default:
        return 'bg-white border border-festari-100/30 shadow-md';
    }
  };

  return (
    <div className={cn(
      'rounded-xl p-6 md:p-8',
      getVariantClasses(),
      className
    )}>
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2 text-festari-900">{title}</h3>
        <p className="text-festari-600">{description || subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-festari-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-festari-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
              placeholder="john@example.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-festari-700 mb-1">
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
            placeholder="+233 XX XXX XXXX"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-festari-700 mb-1">
            Subject *
          </label>
          <select
            id="subject"
            name="subject_or_service"
            value={formData.subject_or_service}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
          >
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service.slug}>
                {service.name}
              </option>))
            }
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-festari-700 mb-1">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-festari-200 rounded-md focus:outline-none focus:ring-2 focus:ring-festari-accent/50"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <div className="pt-2">
          {error && <p className='text-red-500 text-center pb-3'>{error}</p>}
          <Button
            type="submit"
            disabled={isSubmitting || isSubmitted}
            className={cn(
              "w-full flex items-center justify-center gap-2 transition-colors",
              isSubmitted ? "bg-green-600 hover:bg-green-700" : "bg-festari-accent hover:bg-festari-accent/90"
            )}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : isSubmitted ? (
              <>
                <CheckCircle size={18} />
                Request Sent
              </>
            ) : (
              <>
                <SendIcon size={18} />
                Submit Request
              </>
            )}
          </Button>

          <p className="text-xs text-festari-500 mt-3 text-center">
            By submitting, you agree to our <a href="/privacy-policy" className="text-festari-accent hover:underline">Privacy Policy</a>.
            <br />
            For urgent matters, please call: <a href="tel:+233541603237" className="text-festari-accent hover:underline">+233 (0)54 160 3237</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default ConsultationRequestForm;
