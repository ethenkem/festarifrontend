import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/context/auth-context";
import { BACKEND_URL } from "@/configs/constants";

export function useVerifyToken() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userData, logout } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);

        if (!userData?.access) {
          logout();
          navigate("/login");
          return;
        }

        await axios.post(`${BACKEND_URL}/accounts/token/verify/`, {
          token: userData.access,
        });

        // ✅ If token is valid, do nothing and let app continue
      } catch (error) {
        console.error("Token verification failed:", error);
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [userData?.access, logout, navigate]);

  return { loading };
}
