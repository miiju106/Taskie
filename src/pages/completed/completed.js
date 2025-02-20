import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../mainPage/mainPage.css";
import TopNav from "../../components/topNav/topNav";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/api";

const Completed = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const resp = await axios.get("/user/get-tasks");
        const tasks = resp.data.tasks;

        const arrayOfTasks = tasks.filter((list) => list.completed);
        setCompletedTasks(arrayOfTasks.reverse());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const filtered = completedTasks.filter((list) => {
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
      setFilteredTasks(completedTasks);
    }
  }, [searchValue, completedTasks]);

  // navigating to the view page using the id property of the taskArray(input gotten from the user)
  const selectedTask = (idNumber, list) => {
    navigate(`/view/${idNumber}`, { state: { id: idNumber } });
  };

  // date Created Format
  const dateFormat = (date) => {
    const dateOutput = new Date(date);

    return dateOutput.toLocaleString("en-GB", { timeZone: "Africa/Lagos" });
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <section className="main-div m-auto">
      <TopNav searchValue={searchValue} setSearchValue={setSearchValue} />

      <Container className="text-start " fluid>
       
        <Row className="">
          {loading ? (
            <div className=" "><p>Loading...</p></div>
          ) : (
            <Col md={8} lg={9} className="task-main">
              <Row md={2} className="task-row">
                {filteredTasks.length == 0 ? (
                  <h5 className="h5-text-text">
                    There are no Completed Tasks...
                  </h5>
                ) : (
                  filteredTasks.map((list) => (
                    <Col className="">
                      <Card className="border-0 card-task mb-2 p-3">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-semibold  h5-text">{list.title}</h5>
                        </div>
                        <div className="mt-2">
                          <p className="body-p">{list.desc.slice(0, 100)}...</p>
                        </div>
                        <div className="d-flex flex-md-row flex-column gap-2">
                          <p className="date-p">{dateFormat(list.createdAt)}</p>
                          <p className="date-p">
                            Updated:{dateFormat(list.updatedAt)}
                          </p>
                        </div>
                        <div className="d-flex justify-content-between ">
                          <div>
                            {/* <span className="me-2">Edit</span> */}
                            <span
                              className="view-span"
                              onClick={() => selectedTask(list._id)}
                            >
                              View
                            </span>
                          </div>
                          <div>
                            <div>
                              <span>Completed</span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))
                )}
              </Row>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Completed;
