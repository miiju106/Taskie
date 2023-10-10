import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import InputGroup from "react-bootstrap/InputGroup";
import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";
import "./header.css";
import SideNav from "../sidebar/sideNav";
import ReactSwitch from "react-switch";
// import ToggleButton from '@mui/material/ToggleButton';
import { ToggleButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  return (
    <section className="">
      <SideNav />     
    </section>
  );
};

export default Header;
