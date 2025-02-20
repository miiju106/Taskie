import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import InputGroup from "react-bootstrap/InputGroup";
import "./header.css";
import ReactSwitch from "react-switch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateTheme } from "../store/themeSlice";
import SearchIcon from "@mui/icons-material/Search";
import Form from "react-bootstrap/Form";

const TopNav = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.themeChange.theme);

  return (
    <Navbar expand="lg" className=" div-navbar sticky-top  py-4 mb-2">
      <Container className=" position-relative" fluid>
        <Nav className="flex-row d-md-none w-100 mb-3 justify-content-end gap-4 align-item-center">
          <div className="d-flex align-item-center gap-2">
            <span className="span-para">
              {theme == "light" ? "Light mode" : "Dark mode"}
            </span>
            <label>
              <ReactSwitch
                height={20}
                width={48}
                handleDiameter={22}
                onHandleColor="#fff"
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onColor="#26ca28"
                onChange={() => dispatch(updateTheme())}
                checked={theme == "dark"}
              />
            </label>
          </div>

          <div className="user-img d-flex align-item-center gap-1">
            <div className="img-div">
              <AccountCircleIcon />
            </div>
            <span className="span-para">John Doe</span>
          </div>
        </Nav>
        <Nav className="search-nav">
          <InputGroup className=" search-cont position-relative m-auto rounded-pill w-100 d-lg-none d-flex">
            <>
              <Form.Control
                placeholder="Search..."
                aria-label="Username"
                aria-describedby="basic-addon1"
                className="search-text2 rounded py-2"
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <SearchIcon className="position-absolute text-dark search-icon-one" />
            </>
          </InputGroup>
        </Nav>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between align-items-center text-warning"
        >
          <Nav className="w-25">
            <InputGroup className=" search-cont position-relative m-auto overflow-hidden">
              <>
                <Form.Control
                  placeholder="Search..."
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  className="search-text2 rounded py-2"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <SearchIcon className="position-absolute text-dark search-icon-one" />
              </>
            </InputGroup>
          </Nav>
        </Navbar.Collapse>

        <Nav className="flex-row d-none d-md-flex gap-4">
          <div className="d-flex gap-2 align-items-center">
            <span className="span-para">
              {" "}
              {theme == "light" ? "Light mode" : "Dark mode"}
            </span>
            <label>
              <ReactSwitch
                height={20}
                width={48}
                handleDiameter={22}
                onHandleColor="#fff"
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onColor="#26ca28"
                onChange={() => dispatch(updateTheme())}
                checked={theme == "dark"}
              />
            </label>
          </div>

          <div className="user-img d-flex align-item-center gap-1">
            <div className="img-div">
              <AccountCircleIcon />
            </div>
            <span className="span-para">John Doe</span>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default TopNav;
