import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/constants';

const Login = () => {
  // State hooks for form fields and visibility toggle
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state

    // Simulate login process
    try {
      // Mock authentication
      const res = await axios.post(`${BACKEND_URL}/accounts/login`, {
        email,
        password
      })
      console.log(res.data);
      toast({
        title: "Success",
        description: "You've been logged in successfully.",
      });
      navigate('/dashboard'); // Redirect to dashboard
      setIsLoading(false); // Reset loading state
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please check your credentials.",
        variant: "destructive",
      });
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
          {/* Form title and description */}
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-festari-900 font-display">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-festari-600">
              Sign in to your Festari account
            </p>
          </div>

          {/* Login form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {/* Email input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="pl-10"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password input field */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-festari-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="pl-10 pr-10"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-festari-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-festari-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-festari-accent rounded border-festari-300 focus:ring-festari-accent"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-festari-600">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-festari-accent hover:text-festari-accent/80">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full text-base py-5"
              variant="highlight"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign in
                </>
              )}
            </Button>

            <div className="text-center text-sm">
              <span className="text-festari-600">Don't have an account? </span>
              <Link to="/register" className="font-medium text-festari-accent hover:text-festari-accent/80">
                Register now
              </Link>
            </div>
          </form>
        </div>
      </main>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default Login;
