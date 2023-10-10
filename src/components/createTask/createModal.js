import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { update} from "../store/taskSlice";
import { useSelector, useDispatch } from "react-redux";

const CreateModal = ({ show, setShow }) => {
  const [formOutput, setFormOutput] = useState({});
  const [todo, setTodo] = useState([])
  const dispatch = useDispatch()
  const taskArray = useSelector((state) => state.taskList.tasks);

  // console.log("onSubmit", todo)
  console.log("taskArray", taskArray)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormOutput({
      ...formOutput,
      [name]: value,
      completed: false,
      id: Math.random(),
    });
  };

  


  const handleSubmit = (e) => {
    e.preventDefault();

    if (formOutput.title && formOutput.dateCreated && formOutput.task) {
      dispatch(update(formOutput))
         setShow(!show)
               
    }

    return;
  };



  
 

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="border-0 mb-0" closeButton></Modal.Header>
        <Container fluid className="text-start ">
          <Col className="m-auto px-2 py-4">
            <Form onSubmit={handleSubmit} className="m-auto">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-semibold">Title</Form.Label>
                <Form.Control
                  type="type"
                  placeholder="Title of the task"
                  name="title"
                  title="Enter title of the task"
                  value={formOutput.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="fw-semibold">Date Created</Form.Label>
                <Form.Control
                  type="datetime-local"
                  placeholder="dd-mm-yyyy"
                  name="dateCreated"
                  title="Enter date of the task created"
                  value={formOutput.dateCreated}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fw-semibold">Task</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Write your task"
                  name="task"
                  title="Enter the task"
                  value={formOutput.task}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                className=" rounded-pill py-2 px-4 fw-bold"
                             
              >
                {" "}
                Submit
              </Button>
              
            </Form>
           
          </Col>
        </Container>
      </Modal>
    </>
  );
};

export default CreateModal;
