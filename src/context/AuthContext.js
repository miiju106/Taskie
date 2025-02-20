import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token"); // get the token tha was already stored in Cookies
    if (!token) return;

    try {
      const decode = jwtDecode(token);     
      const expiryTime = decode.exp * 1000; // get the expiry time and converts to milliseconds
      const currentTime = Date.now(); // current time in milliseconds

      if (expiryTime <= currentTime) {
        logout();
      } else {
        const timeOut = setTimeout(logout, expiryTime - currentTime); //countdown before it logs out
        return () => clearTimeout(timeOut);
      }
    } catch (error) {
      console.log("Unauthorized token", error);
      logout()
      
    }
  }, []);

  const login = async () => {
    try {
      setLoading(true);
      const resp = await axios.post("/auth/login", {
        email: process.env.REACT_APP_TEST_EMAIL,
        password: process.env.REACT_APP_TEST_PASSWORD,
      });
      Cookies.set("token", resp.data.accessToken, { expires: 2, secure: true });
      toast.success("Logged in successfully");
      navigate("/tasks");
    } catch (error) {
      console.log(error);
      toast.error(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    toast.warning('Logged out due to inactivity.');
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
