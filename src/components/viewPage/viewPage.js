import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import TopNav from "../topNav/topNav";
import "./viewPage.css";

const ViewPage = () => {
  const taskArray = useSelector((state) => state.taskList.tasks);
  const [viewData, setViewData] = useState([]);

  const location = useLocation();
  const chosenId = location.state.id;

  // View tasks
  useEffect(() => {
    const chosenId = location.state.id;
    const getData = taskArray.filter((list) => list.id == chosenId);
    setViewData(getData);
  }, [chosenId, viewData]);

  // date Created Format
  const dateFormat = (date) => {
    const dateOutput = date.split("T");
    const year = dateOutput[0];
    const time = dateOutput[1];

    return `${year}, ${time}`;
  };

  return (
    <section className="main-div m-auto">
      <TopNav />
      <Container fluid>
        <Row>
          <Col lg={10} md={9} className="p-0">
            {viewData.map((list) => (
              <Card className="border-0 rounded-0 view-cont text-start mb-2 p-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-semibold title-text">{list.title}</h5>
                </div>
                <div className="mt-2">
                  <p className="body-p view-p mb-5">{list.task}</p>
                </div>
                <div>
                  <p className="date-p view-time">
                    Date Created:{dateFormat(list.dateCreated)}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  <div>
                    <span className="me-2 edit-span">Edit</span>
                  </div>
                  <div>
                    <div>
                      <span className="status">
                        {" "}
                        Status:{""} {list.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ViewPage;
