import { Container, Row, Col } from "react-bootstrap";
import "../mainPage/mainPage.css";
import TopNav from "../topNav/topNav";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Completed = () => {

  // taskArray is the input gotten from the user
  const taskArray = useSelector((state) => state.taskList.tasks);
  const completedList = taskArray.filter((item) => item.completed == true);

  const navigate = useNavigate()


  // navigating to the view page using the id property of the taskArray(input gotten from the user)
  const selectedTask = (idNumber, list) => {
    navigate(`/view/${idNumber}`, { state: { id: idNumber} });
  };

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
      <Container className="text-start " fluid>
        <Row className="">
        
          <Col md={8} lg={9} className="task-main">
            <Row md={2} className="task-row">
              {
                (completedList.length == 0  ? (
                  <h5 className="h5-text-text">There are no Completed Tasks...</h5>
                ) : (
                  completedList.map((list) => (
                    <Col className="">
                      <Card className="border-0 card-task mb-2 p-3">
                        <div className="d-flex justify-content-between">
                          <h5 className="fw-semibold  h5-text">{list.title}</h5>
                          
                        </div>
                        <div className="mt-2">
                          <p className="body-p">{(list.task).slice(0, 100)}...</p>
                        </div>
                        <div>
                          <p className="date-p">{dateFormat(list.dateCreated)}</p>
                        </div>
                        <div className="d-flex justify-content-between ">
                          <div>
                            <span className="me-2">Edit</span>
                            <span className="view-span" onClick={()=> selectedTask(list.id)}>View</span>
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
                ))
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Completed;
