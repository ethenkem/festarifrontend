import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AgricultureProduct } from '@/types/agriculture';

// Define the schema for form validation using Zod
const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
  quantity: z.string().min(1, { message: 'Please specify the quantity' }),
});

interface InquiryModalProps {
  product: AgricultureProduct | null; // The product being inquired about
  isOpen: boolean; // Whether the modal is open
  onClose: () => void; // Function to close the modal
  onSubmit: (values: z.infer<typeof formSchema>) => void; // Function to handle form submission
}

const InquiryModal: React.FC<InquiryModalProps> = ({ 
  product, 
  isOpen, 
  onClose,
  onSubmit
}) => {
  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: product ? `I'm interested in ${product.title}. Please provide more information.` : '',
      quantity: '1',
    },
  });

  // Handle form submission
  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values); // Pass form values to the parent component
    form.reset(); // Reset the form fields
  };

  // Return null if no product is selected
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Inquire About {product.title}</DialogTitle>
          <DialogDescription>
            Fill out this form to inquire about this product. We'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>
        
        {/* Product details section */}
        <div className="flex items-center space-x-4 my-4 p-3 bg-festari-50 rounded-lg">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h4 className="font-medium text-festari-900">{product.title}</h4>
            <p className="text-sm text-festari-600">{product.price}</p>
          </div>
        </div>
        
        {/* Inquiry form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Email field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone field */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Quantity field */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desired Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="Quantity you need" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {/* Message field */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your requirements or questions about this product" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Form actions */}
            <DialogFooter className="mt-6">
              <Button variant="outline" type="button" onClick={onClose}>Cancel</Button>
              <Button type="submit">Submit Inquiry</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InquiryModal;
