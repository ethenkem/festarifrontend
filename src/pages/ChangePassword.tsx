import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, KeyRound, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';
import { useAuth } from '@/context/auth-context';
import { useVerifyToken } from '@/hooks/use-verify-token';
import { PageLoading } from '@/App';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userData: user } = useAuth();

  const { loading } = useVerifyToken();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword1, setNewPassword1] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword1, setShowNewPassword1] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      toast({
        title: "Access Denied",
        description: "Please log in to change your password.",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [navigate, toast]);

  // Validate password in real-time
  useEffect(() => {
    const validation = {
      minLength: newPassword1.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword1),
      hasLowercase: /[a-z]/.test(newPassword1),
      hasNumber: /\d/.test(newPassword1),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword1),
      passwordsMatch: newPassword1 === newPassword2 && newPassword2.length > 0
    };
    setPasswordValidation(validation);
  }, [newPassword1, newPassword2]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (newPassword1 !== newPassword2) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    // Check password strength
    const isPasswordValid = Object.entries(passwordValidation).every(([key, value]) =>
      key === 'passwordsMatch' ? true : value
    );

    if (!isPasswordValid) {
      toast({
        title: "Error",
        description: "Please ensure your new password meets all requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/accounts/password/change/`, {
        current_password: currentPassword,
        new_password1: newPassword1,
        new_password2: newPassword2,
      }, {
        headers: {
          'Authorization': `Bearer ${user?.access}`
        }
      });

      toast({
        title: "Success",
        description: "Your password has been changed successfully.",
      });

      // Clear form
      setCurrentPassword('');
      setNewPassword1('');
      setNewPassword2('');

      // Redirect to dashboard or profile
      navigate('/dashboard');

    } catch (error: any) {
      const errorMessage = error.response?.data?.message ||
        error.response?.data?.current_password?.[0] ||
        "Failed to change password. Please check your current password.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Validation indicator component
  const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
    <div className="flex items-center space-x-2">
      {isValid ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-400" />
      )}
      <span className={`text-sm ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
        {text}
      </span>
    </div>
  );

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {/* Back button */}
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-festari-600 hover:text-festari-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          {/* Form title and description */}
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-festari-100 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-festari-accent" />
            </div>
            <h2 className="text-2xl font-bold text-festari-900 font-display">
              Change Password
            </h2>
            <p className="mt-2 text-sm text-festari-600">
              Update your password to keep your account secure
            </p>
          </div>

          {/* Password change form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Current Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="current-password"
                  name="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>

              {/* New Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="new-password1"
                  name="new-password1"
                  type={showNewPassword1 ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="New password"
                  value={newPassword1}
                  onChange={(e) => setNewPassword1(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowNewPassword1(!showNewPassword1)}
                >
                  {showNewPassword1 ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>

              {/* Confirm New Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="new-password2"
                  name="new-password2"
                  type={showNewPassword2 ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Confirm new password"
                  value={newPassword2}
                  onChange={(e) => setNewPassword2(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowNewPassword2(!showNewPassword2)}
                >
                  {showNewPassword2 ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            {newPassword1 && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-festari-700 mb-3">Password Requirements:</p>
                <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                <ValidationItem isValid={passwordValidation.hasUppercase} text="One uppercase letter" />
                <ValidationItem isValid={passwordValidation.hasLowercase} text="One lowercase letter" />
                <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                <ValidationItem isValid={passwordValidation.hasSpecialChar} text="One special character" />
                {newPassword2 && (
                  <ValidationItem isValid={passwordValidation.passwordsMatch} text="Passwords match" />
                )}
              </div>
            )}

            {/* Security note */}
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <KeyRound className="h-5 w-5 text-blue-500 mt-0.5" />
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">Security Tip</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Choose a strong password that you haven't used before. Consider using a password manager.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => navigate(-1)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                variant="highlight"
                disabled={isLoading || !currentPassword || !Object.values(passwordValidation).every(Boolean)}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>

            {/* Additional security info */}
            <div className="text-center text-xs text-festari-500 space-y-1">
              <p>After changing your password, you'll remain logged in on this device.</p>
              <p>You may need to log in again on other devices.</p>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ChangePassword;
