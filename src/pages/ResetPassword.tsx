import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, KeyRound, CheckCircle, XCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  // URL parameters
  const uid = searchParams.get('uid');
  const token = searchParams.get('token');

  // Password validation states
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false
  });

  // Validate URL parameters on component mount
  useEffect(() => {
    if (!uid || !token) {
      setIsValidLink(false);
      toast({
        title: "Invalid Reset Link",
        description: "This password reset link is invalid or has expired.",
        variant: "destructive",
      });
    }
  }, [uid, token, toast]);

  // Validate password in real-time
  useEffect(() => {
    const validation = {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && confirmPassword.length > 0
    };
    setPasswordValidation(validation);
  }, [newPassword, confirmPassword]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!uid || !token) {
      toast({
        title: "Error",
        description: "Invalid reset link parameters.",
        variant: "destructive",
      });
      return;
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
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
        description: "Please ensure your password meets all requirements.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await axios.post(`${BACKEND_URL}/accounts/reset-password-confirm/`, {
        uid,
        token,
        new_password: newPassword
      });

      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Your password has been reset successfully.",
      });

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to reset password. The link may have expired.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsValidLink(false);
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

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-festari-900 font-display">
                Password Reset Successful!
              </h2>
              <p className="text-festari-600">
                Your password has been successfully updated. You will be redirected to the login page in a few seconds.
              </p>
              <Link to="/login">
                <Button variant="highlight" className="w-full">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Invalid link state
  if (!isValidLink) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-festari-900 font-display">
                Invalid Reset Link
              </h2>
              <p className="text-festari-600">
                This password reset link is invalid or has expired. Please request a new password reset.
              </p>
              <Link to="/login">
                <Button variant="highlight" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex mt-20 items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {/* Form title and description */}
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-festari-100 rounded-full flex items-center justify-center mb-4">
              <KeyRound className="h-6 w-6 text-festari-accent" />
            </div>
            <h2 className="text-2xl font-bold text-festari-900 font-display">
              Reset Your Password
            </h2>
            <p className="mt-2 text-sm text-festari-600">
              Enter your new password below
            </p>
          </div>

          {/* Password reset form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* New Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="new-password"
                  name="new-password"
                  type={showNewPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>

              {/* Confirm Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="confirm-password"
                  name="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>
            </div>

            {/* Password requirements */}
            {newPassword && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium text-festari-700 mb-3">Password Requirements:</p>
                <ValidationItem isValid={passwordValidation.minLength} text="At least 8 characters" />
                <ValidationItem isValid={passwordValidation.hasUppercase} text="One uppercase letter" />
                <ValidationItem isValid={passwordValidation.hasLowercase} text="One lowercase letter" />
                <ValidationItem isValid={passwordValidation.hasNumber} text="One number" />
                <ValidationItem isValid={passwordValidation.hasSpecialChar} text="One special character" />
                {confirmPassword && (
                  <ValidationItem isValid={passwordValidation.passwordsMatch} text="Passwords match" />
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full text-base py-5"
              variant="highlight"
              size="lg"
              disabled={isLoading || !Object.values(passwordValidation).every(Boolean)}
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </Button>

            <div className="text-center text-sm">
              <Link to="/login" className="font-medium text-festari-accent hover:text-festari-accent/80">
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
