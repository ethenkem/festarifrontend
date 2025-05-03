import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  propertyId: number;
  propertyTitle: string;
}

const timeSlots = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const BookingForm = ({ propertyId, propertyTitle }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleBooking = () => {
    if (!date || !timeSlot || !name || !email || !phone) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsPaymentOpen(true);
  };

  const handlePayment = () => {
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Booking Confirmed",
        description: `Your viewing for ${propertyTitle} on ${date && format(date, 'PPP')} at ${timeSlot} has been confirmed.`,
      });
      setIsLoading(false);
      setIsPaymentOpen(false);
      
      // Reset form
      setDate(undefined);
      setTimeSlot('');
      setName('');
      setEmail('');
      setPhone('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {!isPaymentOpen ? (
        <>
          <div className="space-y-3">
            <div className="font-medium text-sm">Personal Information</div>
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="font-medium text-sm">Select Viewing Date</div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Select a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-3">
            <div className="font-medium text-sm">Select Viewing Time</div>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={timeSlot === time ? "default" : "outline"}
                  className="flex items-center justify-center"
                  onClick={() => setTimeSlot(time)}
                >
                  <Clock className="mr-1 h-3 w-3" />
                  <span className="text-xs">{time}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="pt-3">
            <Button onClick={handleBooking} className="w-full">
              Continue to Payment
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              A non-refundable viewing fee of $25 applies
            </p>
          </div>
        </>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-lg font-medium">Payment Details</h3>
            <p className="text-sm text-muted-foreground">
              Viewing Fee: $25 (non-refundable)
            </p>
          </div>
          
          <div className="space-y-3">
            <div>
              <Label htmlFor="cardName">Name on Card</Label>
              <Input id="cardName" placeholder="Enter name as shown on card" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" className="mt-1" />
              </div>
            </div>
          </div>
          
          <div className="pt-3 space-y-2">
            <Button onClick={handlePayment} className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm Payment"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setIsPaymentOpen(false)} disabled={isLoading}>
              Back
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
