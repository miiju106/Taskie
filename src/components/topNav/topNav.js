import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchLists from "./searchLists";
import InputGroup from "react-bootstrap/InputGroup";
import "./header.css";
import ReactSwitch from "react-switch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { updateTheme } from "../store/themeSlice";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const taskArray = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.themeChange.theme);
  const navigate = useNavigate()

  const selectedTask = (idNumber, list) => {
    navigate(`/view/${idNumber}`, { state: { id: idNumber} });
  };

  

 

  return (
    <Navbar expand="lg" className=" div-navbar sticky-top  py-4 mb-2">
      <Container className=" position-relative">
        
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
            <SearchLists
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              filteredList={filteredList}
              setFilteredList={setFilteredList}
            />
          </InputGroup>
        </Nav>

        <Col lg={10} md={9} className="position-absolute div-searchResult">
          <Row lg={3} md={3}   className="mb-4">
            {taskArray.length != 0 &&
              searchValue &&
              filteredList.slice(0, 5).map((list) => (
                <Card className="border-0 card-task mb-2 p-3 me-3">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-semibold  h5-text">{list.title}</h5>
                    {/* <DeleteOutlineOutlinedIcon
                      onClick={() => dispatch(deleteTask(list))}
                    /> */}
                  </div>
                  <div className="mt-2 text-start">
                    <p className="body-p">{list.task}...</p>
                  </div>
                  <div>
                    <p className="date-p text-start">
                      Date Created:{list.dateCreated}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between ">
                    <div>
                      <span className="me-2 span-p">Edit</span>
                      <span className="view-span" onClick={()=> selectedTask(list.id)}>View</span>
                    </div>
                    <div>
                      <div>
                        {/* {list.completed ? (
                          <CheckBoxIcon
                            className="checked"
                            onClick={() => dispatch(complete(list))}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            onClick={() => dispatch(complete(list))}
                          />
                        )} */}
                        <span>{list.completed ? "Completed" : "Pending"}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
          </Row>
        </Col>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between align-items-center text-warning"
        >
          <Nav className="w-25">
            <InputGroup className=" search-cont position-relative m-auto overflow-hidden">
              <SearchLists
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
              />
            </InputGroup>
          </Nav>
        </Navbar.Collapse>

        <Nav className="flex-row d-none d-md-flex gap-4">
          <div className="d-flex gap-2 align-items-center">
            <span className="span-para"> {theme == "light" ? "Light mode" : "Dark mode"}</span>
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
