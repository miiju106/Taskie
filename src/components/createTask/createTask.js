import React from "react";
// import "react-calendar/dist/css/Calendar.css";
import TopNav from "../topNav/topNav";
import { Container, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


const CreateTask = () => {
  return (
    <section className="main-div m-auto">
      <TopNav />
      <Container className="text-start ">
        <Col lg={6} className="m-auto">
          <Form className="m-auto">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Title</Form.Label>
              <Form.Control type="type" placeholder="Title of the task" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-semibold">Date Created</Form.Label>
              <Form.Control type="datetime-local" placeholder="dd-mm-yyyy" onChange={e => console.log(e.target.value)}/>
              
              
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-semibold">Task</Form.Label>
              <Form.Control as="textarea" rows={6}  placeholder="Summarize your task" onChange={e => console.log(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" className=" rounded-pill py-2 px-4 fw-bold"> Submit</Button>
            
          </Form>
        </Col>
      </Container>
    </section>
  );
};

export default CreateTask;
