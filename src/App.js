// import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";

import MainPage from "./components/mainPage/mainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNav from "./components/sidebar/sideNav";
import CreateTask from "./components/createTask/createTask";
import Completed from "./components/completed/completed";
import Pending from "./components/completed/pending";
import ViewPage from "./components/viewPage/viewPage";

function App() {
  return (
    <div className="App">
      <main className="d-flex overflow-hidden">
        <Router>
          <SideNav />

          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/complete" element={<Completed />} />
            <Route path="/view/:id" element={<ViewPage />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
