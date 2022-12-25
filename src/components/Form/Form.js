import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import React, { useState } from "react";

const FormComponent = ({ onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(form);
  };
  const [form, setForm] = useState({
    name: "",
    fullName: "",
  });
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <Form className="m-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>UserName</Form.Label>
        <Form.Control
          type="text"
          placeholder="User Name"
          onChange={handleChange}
          value={form.name}
          name="name"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>FullName</Form.Label>
        <Form.Control
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
          value={form.fullName}
          name="fullName"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mb-3">
        Submit
      </Button>
    </Form>
  );
};
export default FormComponent;
