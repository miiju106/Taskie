import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./mainPage.css";
import TopNav from "../../components/topNav/topNav";
import Card from "react-bootstrap/Card";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "react-bootstrap/Button";
import CreateModal from "../createTask/createModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { complete, deleteTask } from "../../components/store/taskSlice";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/api";
import DeleteModal from "../../components/deleteModal/deleteModal";
import { toast } from "react-toastify";

const MainPage = () => {
  const [show, setShow] = useState(false);
  const [taskArray, setTaskArray] = useState([]);
  const [chosenId, setChosenId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [singleTask, setSingleTask] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const completedTasks = taskArray.filter((list) => list.completed);
  const pendingTasks = taskArray.filter((list) => !list.completed);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
       
        const resp = await axios.get("/user/get-tasks");
        const tasks = resp.data.tasks;

        setTaskArray(tasks.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchTasks();
  }, [taskArray]);

  useEffect(() => {
    const filtered = taskArray.filter((list) => {
      const byTitle = list.title
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const byDesc = list.desc
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return byTitle || byDesc;
    });

    if (searchValue) {
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(taskArray);
    }
  }, [searchValue, taskArray]);

  // Attaching a moment ago to the recent tasks...
  const momentAgo = (dateInput) => {
    const currentTime = new Date().getTime();
    const inputTime = new Date(dateInput).getTime();
    const momentTime = Math.abs(inputTime - currentTime);
    const convertToMin = Math.floor(momentTime / (60 * 1000));
    const convertToHr = Math.floor(momentTime / (60 * 60 * 1000));
    const convertToDay = Math.floor(momentTime / (60 * 60 * 1000 * 24));
    // const convertToSec = Math.floor(momentTime / 1000);

    if (convertToMin <= 60) {
      return `${convertToMin} min(s) ago`;
    } else if (convertToMin > 60 && convertToMin < 1440) {
      return `${convertToHr} hr(s) ago`;
    } else if (convertToMin >= 1440) {
      return `${convertToDay} day(s) ago`;
    }
  };

  // date Created Format
  const dateFormat = (date) => {
    const dateOutput = new Date(date);

    return dateOutput.toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
  };

  // navigating to the view page using the id property of the taskArray(input gotten from the user)
  const selectedTask = (idNumber, list) => {
    navigate(`/view/${idNumber}`, { state: { id: idNumber } });
  };

  // stores the id and helps pass the id into the DeleteModal
  const handleId = (id, title) => {
    setShowDeleteModal(!showDeleteModal);
    setChosenId(id);
    setTaskTitle(title);
  };

  // passes the selected Task into a state called singleTask
  const handleSingleTask = (task) => {
    setSingleTask((prev) => ({ ...prev, ...task }));
    setShow(true);
  };

  // handles the completed and pending update
  const handleCompleted = async (isTaskComplete, taskId) => {
    const isUpdatedCompleted = !isTaskComplete
      ? (isTaskComplete = true)
      : (isTaskComplete = false);

    if (taskId) {
      try {
        setLoading(true);
        const resp = await axios.put(`/user/update-tasks/${taskId}`, {
          completed: isUpdatedCompleted,
        });
        const successMsg = isUpdatedCompleted
          ? "Task Marked Completed"
          : "Task Marked Pending";
        toast.success(successMsg);
      } catch (error) {
        console.log(error.message);
        toast.error("Task not Marked At All");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <section className="main-div m-auto">
      <TopNav searchValue={searchValue} setSearchValue={setSearchValue} />
      <Container className="text-start" fluid>
        <Button
          variant="primary"
          className="mb-3 rounded-pill py-2 px-3 fw-bold"
          onClick={() => setShow(true)}
        >
          Create Task
        </Button>
        <CreateModal
          show={show}
          setShow={setShow}
          singleTask={singleTask}
          setSingleTask={setSingleTask}
        />

        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          chosenId={chosenId}
          taskTitle={taskTitle}
        />

        <Row className="">
         
          <Col md={8} lg={9} className="task-main">
            <Row md={2} className="task-row ">
              {filteredTasks?.length == 0 ? (
                <h5 className="h5-text-text">No Task has been created...</h5>
              ) : (
                filteredTasks?.map((list) => (
                  <Col className="" key={list._id}>
                    <Card className="border-0 card-task mb-2 p-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-semibold h5-text">{list.title}</h5>
                        <DeleteOutlineOutlinedIcon
                          className="unchecked"
                          onClick={() => handleId(list._id, list.title)}
                        />
                      </div>
                      <div className="mt-2">
                        <p className="body-p">{list.desc}</p>
                      </div>
                      <div className="d-flex flex-md-row flex-column gap-2">
                        <p className="date-p">
                          Created:{dateFormat(list.createdAt)}
                        </p>

                        <p className="date-p">
                          Updated:{dateFormat(list.updatedAt)}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between flex-md-row flex-column gap-2">
                        <div>
                          <span
                            className="view-span me-2"
                            onClick={() => selectedTask(list._id)}
                          >
                            View
                          </span>
                          <span
                            className="view-span"
                            onClick={() =>
                              handleSingleTask({
                                title: list.title,
                                desc: list.desc,
                                body: list.body,
                                completed: list.completed,
                                id: list._id,
                              })
                            }
                          >
                            Edit
                          </span>
                        </div>
                        <div>
                          <div>
                            {list.completed ? (
                              <CheckBoxIcon
                                className="checked"
                                onClick={() =>
                                  handleCompleted(list.completed, list._id)
                                }
                              />
                            ) : (
                              <CheckBoxOutlineBlankIcon
                                className="unchecked"
                                onClick={() =>
                                  handleCompleted(list.completed, list._id)
                                }
                              />
                            )}
                            <span className="span-p">
                              {loading
                                ? "Loading"
                                : list.completed
                                ? "Completed"
                                : "Pending"}
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
          <Col lg={3} md={4}>
            <Card className="d-md-block d-none card-right border-0 p-3">
              <div className="d-flex flex-wrap gap-3 mb-4">
                <div>
                  <span className="project-num">Total Tasks</span>
                  <h4 className="span-para">{taskArray?.length}</h4>
                </div>
                <div>
                  <span className="project-num">Completed</span>
                  <h4 className="span-para">{completedTasks?.length}</h4>
                </div>
                <div>
                  <span className="project-num">Pending</span>
                  <h4 className="span-para">{pendingTasks?.length}</h4>
                </div>
              </div>
              <div className="">
                <p className="fw-semibold recent-p">Recent Tasks</p>
                {taskArray &&
                  taskArray.slice(0, 4).map((list) => (
                    <Card
                      className="border-0 card-task mb-2 p-3"
                      key={list._id}
                    >
                      <div className="d-flex justify-content-between">
                        <h5 className="fw-semibold  h5-text">{list.title}</h5>
                      </div>
                      <div className="mt-2">
                        <p className="body-p">{list.desc}...</p>
                      </div>
                      <div>
                        <p className="date-p">{momentAgo(list.createdAt)}</p>
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
