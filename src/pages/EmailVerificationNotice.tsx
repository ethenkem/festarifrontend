import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const EmailVerificationNotice = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      <main className="flex-grow mt-20 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-festari-100">
            <Mail className="h-8 w-8 text-festari-accent" />
          </div>

          {/* Title */}
          <h2 className="mt-6 text-2xl font-bold text-festari-900 font-display">
            Verify Your Email
          </h2>

          {/* Message */}
          <p className="mt-2 text-sm text-festari-600">
            We’ve sent a verification link to your email address.
            Please check your inbox (and spam folder) and click the link to activate your account.
          </p>

          {/* Actions */}
          <div className="mt-6 space-y-4">
            <Button className="w-full bg-festari-accent hover:bg-festari-accent/90 text-white">
              <Link to={"/register"}>
                Resend Verification Email
              </Link>
            </Button>
            <div className="text-sm">
              <span className="text-festari-600">Wrong email address? </span>
              <Link
                to="/register"
                className="font-medium text-festari-accent hover:text-festari-accent/80"
              >
                Sign up again
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EmailVerificationNotice;
