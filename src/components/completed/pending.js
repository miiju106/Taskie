import { Container, Row, Col } from "react-bootstrap";
import "../mainPage/mainPage.css";

import TopNav from "../topNav/topNav";
import Card from "react-bootstrap/Card";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";


const Pending = () => {

  const taskArray = useSelector((state) => state.taskList.tasks);
  const pendingList = taskArray.filter((item) => item.completed == false);

  return (
    <section className="main-div m-auto">
      <TopNav />
      <Container className="text-start ">
        <Row className="">
        
          <Col sm={2} md={8} lg={9} className="task-main">
            <Row md={2} className="task-row">
              {
                (pendingList.length == 0  ? (
                  <h5 className="h5-text">There are no Pending Tasks...</h5>
                ) : (
                  pendingList.map((list) => (
                    <Col className="">
                      <Card className="border-0 bg-white card-task mb-2 p-3">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-semibold  h5-text">{list.title}</h5>
                          
                        </div>
                        <div className="mt-2">
                          <p className="body-p">{list.task}</p>
                        </div>
                        <div>
                          <p className="date-p">{list.dateCreated}</p>
                        </div>
                        <div className="d-flex justify-content-between ">
                          <div>
                            <span className="me-2">Edit</span>
                            <span>View</span>
                          </div>
                          <div>
                            <div>
                              <span>Pending</span>
                              
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                  ))
                ))
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Pending