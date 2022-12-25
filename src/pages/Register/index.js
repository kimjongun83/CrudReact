import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ApiHelper from "services/service";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";

import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "components/Button";
import { useFormik } from 'formik';
import * as Yup from "yup";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Register = () => {
  const [loaded, setLoaded] = useState(false);
  const formik = useFormik({
      initialValues: {
          name: "",
          email: "",
          password: "",
          confirm_password: "",
      },
      validationSchema: Yup.object({
        name: Yup.string()
            .required("Please Enter a username")
            .min(4, "Must be 4 characters or more"),
        email: Yup.string()
            .required("Please Enter your Email")
            .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Please enter a valid email"),
        password: Yup.string()
            .required('Please Enter your password')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        confirm_password: Yup.string()
            .required("Required")
            .oneOf([Yup.ref("password"), null], "Password must match "),
    }),
    onSubmit: (values, { resetForm }) => {
        console.log(values);
        register(values);
        resetForm({ values: '' });
    }

});

  const showToastMessageError = (error) => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const showToastMessageSuccess = (success) => {
    toast.success(success, {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const register = async (object)=>{
    
    try {
      setLoaded(true)
      ApiHelper.setJwtToken(null);
      const resposne = await ApiHelper.post({
        path: "auth/register",
        payload: JSON.stringify(object),
      });

      if (resposne.success === true) {
        setLoaded(false);
        showToastMessageSuccess(resposne.message);
      }
    } catch (error) {
      showToastMessageError(error.message);
      setLoaded(false);
    }
   }

  return (
    <div className="container">
     <div className={`loading ${loaded !== true ? "hide" : ""}`}>
        <ClipLoader color={"white"} loading={loaded} cssOverride={override} />
      </div>
      <div className="row py-5 mt-4 align-items-center">
        <div className="col-md-5 pr-lg-5 mb-5 mb-md-0">
          <img
            src="https://bootstrapious.com/i/snippets/sn-registeration/illustration.svg"
            alt=""
            className="img-fluid mb-3 d-none d-md-block"
          />
          <h1>Create an Account</h1>
          <p className="font-italic text-muted mb-0">
            Create a minimal registeration page using Bootstrap 4 HTML form
            elements.
          </p>
          <p className="font-italic text-muted">
            Snippet By
            <a href="https://bootstrapious.com" className="text-muted">
              <u>Bootstrapious</u>
            </a>
          </p>
        </div>

        <div className="col-md-7 col-lg-6 ml-auto">
          <Form autoComplete="off"onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3 ">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <p className="text-danger">{formik.errors.name}</p>
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
               {formik.errors.email && <span className="text-danger">{formik.errors.email}</span>}
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="password"
                name="password"
                type="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && <span className="text-danger">{formik.errors.password}</span>}
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
              />
                {formik.errors.confirm_password && <span className="text-danger">{formik.errors.confirm_password}</span>}
            </Form.Group>
            <ButtonComponent
              className="btn-primary w-100"
              name={"Register"}
              type={"submit"}>
            
            </ButtonComponent>
            <ToastContainer autoClose={1000} hideProgressBar={true} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
