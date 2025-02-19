import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import axios from "../../utils/api";
import { toast } from "react-toastify";

const DeleteModal = ({ showDeleteModal, setShowDeleteModal, chosenId, taskTitle }) => {
  const [loading, setLoading] = useState(false);

  
  


  const handleDelete = async () => {
    if (chosenId) {
      try {
        setLoading(true);
        const resp = await axios.delete(`/user/delete-tasks/${chosenId}`);
        console.log(resp)
        toast.success("Tasks Deleted Successfully");
        setShowDeleteModal(false);
      } catch (error) {
        console.log(error.message);
        toast.error("Deleting Failed");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        dialogClassName="modal-90w "
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header className="border-0 mb-0 " closeButton></Modal.Header>
        <Container fluid className="text-start ">
          <Col className="m-auto px-2 py-4">
            <Modal.Body>
              <p>Are you sure you want to delete the task with the title - <span className="text-uppercase">{taskTitle}</span> ?</p>
            </Modal.Body>

            <div className="w-100 d-flex justify-content-center gap-3 flex-md-row flex-column">
              <Button
                variant="primary"
                className="rounded-pill py-2 px-4 fw-bold w-100 "
                onClick={handleDelete}
              >
                {loading ? "Deleting" : "Yes"}
              </Button>

              <Button
                variant="secondary"
                className="rounded-pill py-2 px-4 fw-bold w-100"
                onClick={()=>setShowDeleteModal(false)}
              >
                No
              </Button>
            </div>
          </Col>
        </Container>
      </Modal>
    </>
  );
};

export default DeleteModal;
