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
  
  console.log(whenActive);

  return (
    <section className="side-div p-2">
      <div className="d-md-grid gap-5">
        <p className="fw-bold fs-5 d-none d-sm-block logo">Taskie</p>
        <div className="nav d-md-block justify-content-around">
          <Link className="link-text" to="/">
            <div className={whenActive == "/" ? "icon-div-active" : "icon-div"}>
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
