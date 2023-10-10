import React from "react";
import "./sideNav.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import { Link } from "react-router-dom";


const SideNav = () => {
  return (
    <section className=" sticky-left side-div p-2">
      <div className="d-flex flex-column gap-5">
        <p className="fw-bold fs-5">Taskie</p>
        <div className="">
          <Link className="link-text" to="/">
            <div className="icon-div mb-4">
              <HomeOutlinedIcon />
              <p>Home</p>
            </div>
          </Link>

          <Link className="link-text" to="/complete">
            <div className="icon-div mb-4">
              <TaskOutlinedIcon />
              <p>Completed</p>
            </div>
          </Link>

          <Link className="link-text" to="/pending">
            <div className="icon-div mb-4">
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
