import React from "react";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { complete, deleteTask } from "../store/taskSlice";
import { useSelector, useDispatch} from "react-redux";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SearchLists from "./searchLists";
import InputGroup from "react-bootstrap/InputGroup";
import "./header.css";
import ReactSwitch from "react-switch";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const TopNav = () => {

   const [searchValue, setSearchValue] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const taskArray = useSelector((state) => state.taskList.tasks);
  const dispatch = useDispatch();


  //  const changeComplete = (listed) => {
  //   filteredList?.forEach((item) => {
  //     if (item.id == listed.id) {
  //       !item.completed ? (item.completed = true) : (item.completed = false);
  //     }
  //   });
  //   // dispatch(complete(listed))
    
  // } 

  console.log("filteredList", filteredList)
  
  return (
    <Navbar expand="lg" className=" div-navbar sticky-top  py-4 mb-2">
      <Container className=" position-relative">
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />  */}
        {/* <Navbar.Brand href="#home" className="text-danger  fs-4 brand-name">
      Task-It
    </Navbar.Brand>  */}
    <Nav className="flex-row d-md-none w-100 mb-3 justify-content-end  gap-4 align-item-center">
          <label className="d-flex align-item-center gap-2">
            <span className="span-p">dark mode</span>
            <label>
              <ReactSwitch
                height={20}
                width={48}
                handleDiameter={24}
                onHandleColor="#2693e6"
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onColor="#86d3ff"
              />
              {/* <ToggleButton style={{ fontSize: "14px" }}/> */}
            </label>
          </label>

          <div className="user-img d-flex align-item-center gap-1">
            <div className="img-div">
              <AccountCircleIcon />
            </div>
            <span className="span-p">John Doe</span>
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
            <Row lg={3} md={3} className="mb-4">
              {taskArray.length != 0 && (searchValue && filteredList.slice(0,5).map((list)=>(
            <Card className="border-0 card-task mb-2 p-3 me-3">
            <div className="d-flex justify-content-between">
              <h5 className="fw-semibold  h5-text">{list.title}</h5>
              <DeleteOutlineOutlinedIcon  onClick={()=> dispatch(deleteTask(list))}/>
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
                <span className="span-p">View</span>
              </div>
              <div>
                <div>
                  {list.completed ? (
                    <CheckBoxIcon
                      className="checked"
                      onClick={() => dispatch(complete(list))}
                    />
                  ) : (
                    <CheckBoxOutlineBlankIcon
                    onClick={() => dispatch(complete(list))}
                    />
                  )}
                  <span>
                    {list.completed ? "Completed" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))) }
           
         

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

        <Nav className="flex-row d-none d-md-flex gap-4 align-item-center">
          <label className="d-flex align-item-center gap-2">
            <span>dark mode</span>
            <label>
              <ReactSwitch
                height={20}
                width={48}
                handleDiameter={24}
                onHandleColor="#2693e6"
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                onColor="#86d3ff"
              />
              {/* <ToggleButton style={{ fontSize: "14px" }}/> */}
            </label>
          </label>

          <div className="user-img d-flex align-item-center gap-1">
            <div className="img-div">
              <AccountCircleIcon />
            </div>
            <span>John Doe</span>
          </div>
        </Nav>
      </Container>
      
    </Navbar>
  );
};

export default TopNav;
