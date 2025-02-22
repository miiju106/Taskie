import {useAuth} from "../context/AuthContext"
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./mainPage/mainPage.css";


const Login = () => {

    const {login, loading} = useAuth();
    const location = useLocation()

  return (
    <div className="container w-full d-flex main-div flex-column align-items-center justify-content-center">
       
       <div className="rounded  body-bg">
        <h3>Welcome to Taskie</h3>
       <Button
          variant="primary"
          className="mb-3 rounded-pill py-2 px-4 fw-bold"
          onClick={login}
        >
         {loading ? "Loading" : "Click to Proceed"}
        </Button>
       </div>
       
    </div>
  );
};

export default Login;
