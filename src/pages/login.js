import {useAuth} from "../context/AuthContext"
import { useLocation } from "react-router-dom";
import SideNav from "../components/sidebar/sideNav";
import Button from "react-bootstrap/Button";

const Login = () => {

    const {login, loading} = useAuth();
    const location = useLocation()

  return (
    <div className="container w-full d-flex main-div flex-column align-items-center justify-content-center">
       
       <Button
          variant="primary"
          className="mb-3 rounded-pill py-2 px-4 fw-bold"
          onClick={login}
        >
         {loading ? "Loading" : "Login"}
        </Button>
    </div>
  );
};

export default Login;
