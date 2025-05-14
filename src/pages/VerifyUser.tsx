import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Check, X, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { BACKEND_URL } from "@/configs/constants";
import { decodeUrlSafeBase64 } from "@/lib/utils";

function VerifyUser() {
  const { uid, token } = useParams();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [isResending, setIsResending] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      if (uid && token) {
        try {
          const res = await axios.post(`${BACKEND_URL}/accounts/verify-user/`, {
            uid: uid,
            token: token,
          });
          setStatus("success");
          toast({
            title: "Email verified successfully!",
            description: "Your account is now active, please wait to login",
          });
          await new Promise((resolve) => setTimeout(resolve, 2000));
          navigate("/login");
        } catch (error) {
          setStatus("error");
          toast({
            variant: "destructive",
            title: "Verification failed",
            description: "The verification link is invalid or has expired.",
          });
        }
      } else {
        setStatus("error");
      }
    };

    verifyEmail();
  }, []);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast({
        title: "Verification email resent!",
        description: "Please check your inbox for the verification link.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to resend",
        description: "There was a problem resending the verification email.",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex-col pt-40 items-center justify-center px-4">
      <div className="flex justify-center mb-6">
        <Link to="/" className="flex items-center">
          <span className="text-primary font-display font-bold text-2xl">FestariGroup</span>
        </Link>
      </div>

      {status === "verifying" && !token && !uid && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-muted-foreground mb-6">
            We've sent a verification link to <span className="font-medium">{decodeUrlSafeBase64(uid)}</span>
          </p>
          <Button
            onClick={handleResendVerification}
            variant="outline"
            className="mb-4"
            disabled={isResending}
          >
            {isResending ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Resending...
              </div>
            ) : (
              "Resend verification email"
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            Return to{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              login page
            </Link>
          </p>
        </div>
      )}

      {status === "verifying" && (token || uid) && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verifying your email</h1>
          <p className="text-muted-foreground mb-6">
            Please wait while we verify your email address...
          </p>
          <div className="flex justify-center">
            <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Email verified successfully!</h1>
          <p className="text-muted-foreground mb-6">
            Your email has been verified and your account is now active.
          </p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/login" className="flex items-center justify-center">
              Continue to login <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Verification failed</h1>
          <p className="text-muted-foreground mb-6">
            The verification link is invalid or has expired.
          </p>
          <Button className="bg-primary hover:bg-primary/90" asChild>
            <Link to="/register">Try signing up again</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

export default VerifyUser
