import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { ETypeStatus } from "constants/constant";
import { notify } from "utils/function";

import "./Modal.scss";

const CustomModal = ({ type, variant, hasEdit, content,hasDelete }) => {

  const [show, setShow] = useState(false);
  const [form,setForm] = useState({
    username: "",
    fullName : ""
  });
  const handleSubmit = (event)=>{
    event.preventDefault();
    console.log("form",form);

  }
  const handleChange = (event)=>{
    
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log("Name",name);
    console.log("value",value);
    setForm({
      ...form,
      [name]: value
    })
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onFinishedUpdate = () => {
    handleClose();
    notify(" Update Success", ETypeStatus.SUCCESS);
  };
  const onFinishedDelete = () => {
    handleClose();
    notify(" Delete Success", ETypeStatus.SUCCESS);
  };
  
  return (
    <>
      <Button variant={variant} onClick={handleShow}>
        {type}
      </Button>
    {hasEdit ?  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      > <Form action="#" onSubmit={handleSubmit}>
      
    
        <Modal.Header closeButton>
          <Modal.Title> {content}</Modal.Title>
        </Modal.Header>
        
          <Modal.Body>
          <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control name = "username" onChange={handleChange} value={form.username} type="text" />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Fullname</Form.Label>
        <Form.Control name = "fullName" onChange={handleChange} value={form.fullName} type="text" />
      </Form.Group>
   
     
          </Modal.Body>
      

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit"  onClick={onFinishedUpdate}>
            OK
          </Button>
          
        </Modal.Footer>
        </Form>
      </Modal> : ""
     
       }
    {hasDelete ? 
      <><Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{content}</Modal.Title>
            </Modal.Header>
           
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" onClick={onFinishedDelete}>
               OK
              </Button>
            </Modal.Footer>
          </Modal></>
    : ""}
     
    </>
  );
};

export default CustomModal;
