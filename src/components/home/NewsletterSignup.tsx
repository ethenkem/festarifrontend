
import { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
    }, 1500);
  };

  return (
    <section className="bg-festari-900 text-white py-16">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Updated with Festari
            </h2>
            <p className="text-festari-100 max-w-lg">
              Subscribe to our newsletter to receive exclusive property listings, 
              research insights, and special offers directly to your inbox.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-md">
            {isSubscribed ? (
              <div className="bg-festari-800/50 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="bg-festari-accent/20 p-3 rounded-full mb-4">
                  <CheckCircle2 size={32} className="text-festari-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
                <p className="text-festari-100">
                  You've been successfully subscribed to our newsletter. 
                  Watch your inbox for the latest updates from Festari!
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4 border-festari-100 text-white hover:bg-festari-700"
                  onClick={() => setIsSubscribed(false)}
                >
                  Subscribe Another Email
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-festari-800/50 rounded-lg p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-festari-400" />
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="pl-10 bg-festari-700/50 border-festari-700 text-white placeholder:text-festari-400"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="bg-festari-accent hover:bg-festari-accent/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
                <p className="text-festari-400 text-sm mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
