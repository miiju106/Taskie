import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import MainPage from "./pages/mainPage/mainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./components/sidebar/sideNav";
import Completed from "./pages/completed/completed";
import Pending from "./pages/completed/pending";
import ViewPage from "./pages/viewPage/viewPage";
import { useSelector } from "react-redux";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import Login from "./pages/login";


function App() {
  const theme = useSelector((state) => state.themeChange.theme);
 
  return (
    <div className="App " data-theme={theme}>
      <main className="d-flex main-cont overflow-hidden">
        <ToastContainer />
        <Router>
        <SideNav />
          <AuthProvider>
         
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/tasks" element={<MainPage />} />
              <Route path="/complete" element={<Completed />} />
              <Route path="/view/:id" element={<ViewPage />} />
              <Route path="/pending" element={<Pending />} />
            </Routes>
          </AuthProvider>
        </Router>
      </main>
    </div>
  );
}

export default App;
