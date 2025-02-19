import React from "react";
import "./sideNav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SideNav = () => {
  const location = useLocation();

  // this is used to handle color of a nav item when navigating from one page to another
  const whenActive = location.pathname;
  
 

  return (
    <section className={` p-2 ${whenActive == "/" ? "d-none" : "side-div"}`} >
      <div className="d-md-grid gap-5">
        <Link className="text-decoration-none" to="/">
        <p className="fw-bold fs-5 d-none d-sm-block logo">Taskie</p>
        </Link>
        
        <div className="nav d-md-block justify-content-around">
          <Link className="link-text" to="/tasks">
            <div className={whenActive == "/tasks" ? "icon-div-active" : "icon-div"}>
              <HomeOutlinedIcon />
              <p>Home</p>
            </div>
          </Link>

          <Link className="link-text" to="/complete">
            <div
              className={
                whenActive == "/complete" ? "icon-div-active" : "icon-div"
              }
            >
              <TaskOutlinedIcon />
              <p>Completed</p>
            </div>
          </Link>

          <Link className="link-text" to="/pending">
            <div
              className={
                whenActive == "/pending" ? "icon-div-active" : "icon-div"
              }
            >
              <PendingActionsOutlinedIcon />
              <p>Pending</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SideNav;
