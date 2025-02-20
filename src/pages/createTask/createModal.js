import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import "./createModal.css";
import axios from "../../utils/api";
import { toast } from "react-toastify";


const CreateModal = ({ show, setShow, singleTask, setSingleTask }) => {
  const [formOutput, setFormOutput] = useState({});
  const [loading, setLoading] = useState(false);

  // updates formOutput only if an id of the selected Task as being passed to the modal
  useEffect(() => {
    if (singleTask.id) {
      setFormOutput((formOutput) => ({
        ...formOutput,
        ...singleTask,
      }));
    }
  }, [singleTask]);


  // handling each input then merging them as an object
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormOutput({
      ...formOutput,
      [name]: value,
    });
  };

  // handles task update
  const handleUpdate = async () => {
    const updatedItem = Object.keys(singleTask).reduce((acc, current) => {
      if (formOutput[current] !== singleTask[current]) {
        acc[current] = formOutput[current];
      }
      return acc;
    }, {});

    if (Object.keys(updatedItem).length !== 0) {
      try {
        setLoading(true);
        const resp = await axios.put(
          `/user/update-tasks/${singleTask.id}`,
          updatedItem
        );

        toast.success("Tasks Updated Successfully");
        setShow(false);
      } catch (error) {
        console.log(error.message);
        toast.error("Updating Failed");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      toast.error("None of the Fields were updated");
    }
  };

  // handles new Task 
  const handlePost = async () => {
    try {
      if (formOutput.title && formOutput.desc && formOutput.body) {
        setLoading(true);
        const resp = await axios.post("/user/add-tasks", formOutput);
        toast.success("Tasks Uploaded Successfully");
        setFormOutput({});
        setShow(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Uploading Failed");
    } finally {
      setLoading(false);
    }
  };

  // handles submission based on either updating a task or creating a new task
  const handleSubmit = async (e) => {
    e.preventDefault();
    return formOutput?.id ? await handleUpdate() : await handlePost();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setFormOutput({});
        }}
        dialogClassName="modal-90w "
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="border-0 mb-0 " closeButton></Modal.Header>
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
                  value={formOutput.title || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Description</Form.Label>
                <Form.Control
                  type="type"
                  placeholder="Short Description of the task"
                  name="desc"
                  title="Description of the task"
                  value={formOutput.desc || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label className="fw-semibold">Tasks </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Write your task"
                  name="body"
                  title="Enter the task"
                  value={formOutput.body || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className={`rounded-pill py-2 px-4 fw-bold w-full ${
                  !formOutput.title || !formOutput.desc || !formOutput.body
                    ? "bg-[##5A05BA]/50"
                    : "bg-[#5A05BA]"
                }`}
                disabled={
                  !formOutput.title || !formOutput.desc || !formOutput.body
                }
              >
                {loading
                  ? formOutput?.id
                    ? "Updating"
                    : "Submitting"
                  : formOutput?.id
                  ? "Update"
                  : "Submit"}
              </Button>
            </Form>
          </Col>
        </Container>
      </Modal>
    </>
  );
};

export default CreateModal;
