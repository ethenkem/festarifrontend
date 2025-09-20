import { AuthResponse } from "@/types/auths"
import { clearUserInfo, getUserInfo, storeUserInfo } from "@/utils/storage";
import { useContext, createContext, useState, ReactNode, useEffect } from "react"
// import { createContext } from "vm"
//
//
//
interface AuthContextType {
  userData: AuthResponse | null;
  login: (userData: AuthResponse) => Promise<void>;
  setUserData: (userData: AuthResponse) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<AuthResponse | null>(null)
  //
  useEffect(() => {
    const userInfo = getUserInfo()
    if (userInfo) {
      setUserData(userInfo)
    }
  }, [])

  const login = async (userData: AuthResponse) => {
    setUserData(userData)
    await storeUserInfo(userData)
  }
  const logout = async () => {
    setUserData(null)
    clearUserInfo()
  }

  return (
    <AuthContext.Provider value={{ userData, setUserData, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

