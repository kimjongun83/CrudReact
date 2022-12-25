import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import ItemTable from "./table/ItemTable";
import FormComponent from "components/Form/Form";
import ModalComponent from "components/Modal/Modal";
import { notify } from "utils/function";
import { ETypeStatus } from "constants/constant";
import Form from "react-bootstrap/Form";

const Dashboard = () => {
  const [user, setUser] = useState([
    { id: 1, name: "Mark", fullName: "Otto" },
    { id: 2, name: "Mark", fullName: "Otto" },
    { id: 3, name: "Mark", fullName: "Otto" },
  ]);

  const [showAdd, setShowAdd] = useState(false);

  const [form, setForm] = useState({
    id:0,
    name: "",
    fullName: "",
  });

  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleClose = () => setShow(false);

  const handleClickDeleteModal = (id) => {
    let updateItem = user.find((item) => {
      return item.id === id;
    });
    setForm(updateItem);
    setShowDeleteModal(true);
    // setUser(deleteItem);
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const onFinished = () => {
    const { id } = form;
    const newUser = structuredClone(user);

    if (id === newUser[id].id) {
      console.log(`id`, id);
      newUser[id] = form;
      setUser(newUser);
    
    }

    handleClose();
    notify("Update Success", ETypeStatus.SUCCESS);
  };

  const onFinishedDelete = () => {
    const { id } = form;
    const removeItem = user.filter((item) => {
      return item.id !== id;
    });
    setUser(removeItem);
    handleCloseDelete();

    notify("Delete Success", ETypeStatus.SUCCESS);
  };
  const handleClickEditModal = (id) => {
    let updateItem = user.find((item) => {
      return item.id === id;
    });
    setForm(updateItem);
    setShow(true);
  };
  const onSubmit = (userAdd) => {
    userAdd.id = user.length + 1;
    const newUser = [...user, userAdd];
    setUser(newUser);
  };
  return (
    <>
      <Button
        className="m-3"
        variant="info"
        onClick={() => setShowAdd(!showAdd)}
      >
        Add
      </Button>
      {showAdd && <FormComponent onSubmit={onSubmit} />}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Full Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <ItemTable
            user={user}
            handleClickEditModal={handleClickEditModal}
            handleClickDeleteModal={handleClickDeleteModal}
          />
        </tbody>

        <ModalComponent
          title={"Edit"}
          handleClose={handleClose}
          show={show}
          onFinished={onFinished}
        >
          <Form.Group className="mb-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter user name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
          </Form.Group>
        </ModalComponent>

        <ModalComponent
          title={"Delete"}
          handleClose={handleCloseDelete}
          show={showDeleteModal}
          onFinished={onFinishedDelete}
        >
          Are you sure you want to delete this item?
        </ModalComponent>
      </Table>
    </>
  );
};
export default Dashboard;
