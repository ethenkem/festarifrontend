
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ConsultationFormProps {
  serviceCategories: Array<{
    title: string;
    items: string[];
  }>;
  onSubmit?: (data: any) => void;
  title?: string;
  description?: string;
}

const ConsultationForm = ({ serviceCategories, onSubmit, title, description }: ConsultationFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!selectedService) {
      toast({
        title: "Error",
        description: "Please select a service category.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Consultation Request Sent",
        description: "We'll get back to you soon to discuss your needs. For urgent matters, call: 0207702157",
      });
      setIsSubmitting(false);
      if (onSubmit) onSubmit({
        name,
        email,
        phone,
        selectedService,
        message
      });

      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setSelectedService('');
      setMessage('');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(title || description) && (
        <div className="mb-2">
          {title && <h3 className="text-xl font-semibold mb-1">{title}</h3>}
          {description && <p className="text-festari-600 text-sm">{description}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
            placeholder="John Doe" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="john@example.com" 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number (Optional)</Label>
          <Input 
            id="phone" 
            type="tel" 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+233 XX XXX XXXX" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="service">Service Category</Label>
          <Select
            value={selectedService}
            onValueChange={setSelectedService}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {serviceCategories.map(category => (
                <SelectItem key={category.title} value={category.title}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Project Details</Label>
        <Textarea 
          id="message" 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Please describe your project or requirements..."
          className="min-h-[150px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Submit Consultation Request"}
      </Button>
    </form>
  );
};

export default ConsultationForm;
