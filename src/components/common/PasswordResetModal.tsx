import { useState } from 'react';
import { Mail, X, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal = ({ isOpen, onClose }: PasswordResetModalProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/accounts/request-password-reset/`, {
        email
      });
      
      toast({
        title: "Success",
        description: "If an account with this email exists, we've sent a password reset link.",
      });
      
      // Reset form and close modal
      setEmail('');
      onClose();
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setEmail('');
    onClose();
  };

  // Don't render if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-festari-100 rounded-full">
              <KeyRound className="h-6 w-6 text-festari-accent" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-festari-900 font-display">
                Reset Password
              </h3>
              <p className="text-sm text-festari-600">
                Enter your email to receive a reset link
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-festari-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="h-5 w-5 text-festari-400" />
            </div>
            <Input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="pl-10"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="highlight"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </div>
        </form>

        {/* Additional info */}
        <div className="mt-4 p-3 bg-festari-50 rounded-lg">
          <p className="text-xs text-festari-600">
            We'll send you an email with instructions to reset your password. 
            Check your spam folder if you don't see it in your inbox.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetModal;
