import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import TopNav from "../../components/topNav/topNav";
import "./viewPage.css";
import axios from "../../utils/api";

const ViewPage = () => {
  const [viewData, setViewData] = useState({});

  const location = useLocation();
  const chosenId = location.state.id;

  // View tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const resp = await axios.get(`/user/get-task/${chosenId}`);
        const task = resp.data.task;

        setViewData(task);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTask();
  }, [chosenId]);

  // date Created Format
  const dateFormat = (date) => {
    const dateOutput = date?.split("T");
    const year = dateOutput[0];
    const time = dateOutput[1];

    return `${year}, ${time}`;
  };
console.log(viewData.createdAt)
  return (
    <section className="main-div m-auto">
      <TopNav />
      <Container fluid>
        <Row>
          <Col lg={10} md={9} className="p-0">
            {viewData && (
              <Card className="border-0 rounded-0 view-cont text-start mb-2 p-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-semibold title-text">{viewData.title}</h5>
                </div>
                <div className="mt-2">
                  <p className="body-p view-p mb-5">{viewData.body}</p>
                </div>
                <div>
                  <p className="date-p view-time">
                    {/* Date Created:{dateFormat(viewData.createdAt)} */}
                  </p>
                </div>
                <div className="d-flex gap-2">
                  {/* <div>
                    <span className="me-2 edit-span">Edit</span>
                  </div> */}
                  <div>
                    <div>
                      <span className="status">
                        {" "}
                        Status:{""}{" "}
                        {viewData.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ViewPage;
