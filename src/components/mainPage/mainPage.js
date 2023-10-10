import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./mainPage.css";
import TopNav from "../topNav/topNav";
import Card from "react-bootstrap/Card";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CreateModal from "../createTask/createModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { complete, deleteTask } from "../store/taskSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
// import FilteredLists from "../topNav/filteredLists";

const MainPage = () => {
  const [show, setShow] = useState(false);
  const [reverseTaskArray, setReverseTaskArray] = useState([]);

  const taskArray = useSelector((state) => state.taskList.tasks);
  const filteredArray = useSelector((state) => state.filterInput.filter);
  const searchString = useSelector((state) => state.searchInput.search);

  const completedList = taskArray.filter((item) => item.completed == true);
  const pendingList = taskArray.filter((item) => item.completed == false);

  const dispatch = useDispatch();
  console.log("reverse", reverseTaskArray);

  useEffect(() => {
    const newArray = taskArray.slice(0);
    const reverse = newArray.reverse();
    setReverseTaskArray(reverse);
  }, [taskArray]);

  // taskArray?.sort((a, b) => {
  //   let fa = a.dateCreated
  //   let fb = b.dateCreated;

  //   if (fa < fb) {
  //     return -1;
  //   }
  //   if (fa > fb) {
  //     return 1;
  //   }
  //   return 0;
  // });

  //   const sortByDate = (a, b) =>{
  // if(a.dateCreated < b.dateCreated){
  //   return 1;
  // }
  // if (a.dateCreated > b.dateCreated){
  //   return -1;
  // }
  // return 0;
  //   }

  // Attaching a moment ago to the recent tasks...
  const momentAgo = (dateInput) => {
    const currentTime = new Date().getTime();
    const inputTime = new Date(dateInput).getTime();
    const momentTime = Math.abs(inputTime - currentTime);
    const convertToMin = Math.floor(momentTime / (60 * 1000));
    const convertToHr = Math.floor(momentTime / (60 * 60 * 1000));
    const convertToDay = Math.floor(momentTime / (60 * 60 * 1000 * 24));
    const convertToSec = Math.floor(momentTime / 1000);
    if (convertToMin <= 60) {
      return `${convertToMin} mins ago`;
    } else {
      return `${convertToHr} hrs ago`;
    }
  };

  const dateFormat = (date) => {
    const dateOutput = date.split("T");
    const year = dateOutput[0];
    const time = dateOutput[1];

    return `${year}, ${time}`;
  };

  console.log();

  return (
    <section className="main-div m-auto">
      <TopNav />
      <Container className="text-start ">
        {/* {taskArray.length > 0 && <FilteredLists/> } */}
        <Button
          variant="primary"
          className="mb-3 rounded-pill py-2 px-3 fw-bold"
          onClick={() => setShow(!show)}
        >
          Create Task
        </Button>
        {show && <CreateModal show={show} setShow={setShow} />}
        <Row className="">
          <Col sm={2} md={8} lg={9} className="task-main">
            <Row md={2} className="task-row">
              {taskArray.length == 0 ? (
                <h5 className="h5-text">No Tasks has been created...</h5>
              ) : (
                taskArray.map((list) => (
                  <Col className="">
                    <Card className="border-0 bg-white card-task mb-2 p-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-semibold  h5-text">{list.title}</h5>
                        <DeleteOutlineOutlinedIcon
                          onClick={() => dispatch(deleteTask(list))}
                        />
                      </div>
                      <div className="mt-2">
                        <p className="body-p">{list.task.slice(0, 100)}...</p>
                      </div>
                      <div>
                        <p className="date-p">
                          Date Created:{dateFormat(list.dateCreated)}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between ">
                        <div>
                          <span className="me-2">Edit</span>
                          <span>View</span>
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
                  </Col>
                ))
              )}
            </Row>
          </Col>
          <Col>
            <Card className="card-right border-0 p-3">
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div>
                  <span className="project-num">Total Tasks</span>
                  <h4>{taskArray.length}</h4>
                </div>
                <div>
                  <span className="project-num">Completed</span>
                  <h4>{completedList.length}</h4>
                </div>
                <div>
                  <span className="project-num">Pending</span>
                  <h4>{pendingList.length}</h4>
                </div>
              </div>
              <div className="">
                <p className="fw-semibold recent-p">Recent Tasks</p>
                {reverseTaskArray.slice(0, 4).map((list) => (
                  <Card className="border-0 bg-white card-task mb-2 p-3">
                    <div className="d-flex justify-content-between">
                      <h5 className="fw-semibold  h5-text">{list.title}</h5>
                    </div>
                    <div className="mt-2">
                      <p className="body-p">{list.task.slice(0, 60)}...</p>
                    </div>
                    <div>
                      <p className="date-p">{momentAgo(list.dateCreated)}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainPage;
