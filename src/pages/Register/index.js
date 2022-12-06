import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ApiHelper from "../../services/service";
import ClipLoader from "react-spinners/ClipLoader";
import "./index.css";
import { isValidEmail } from "../../utils/function";
import Form from "react-bootstrap/Form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonComponent from "../../components/Button";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassowrd, setErrorPassword] = useState("");
  const [errorConfirm, setErrorConfirm] = useState("");

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        setLoaded(false);
      }, 1000);
    }
  }, [loaded]);
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeNameConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
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
  const validateName = (name, min) => {
    let checkName = false;
    if (!name) {
      setErrorName("Name is not blank");
    } else {
      setErrorName("");
    }
    return !checkName;
  };

  const validateEmail = (email) => {
    let checkEmail = false;
    if (!email) {
      setErrorEmail("Email is not blank");
    } else if (!isValidEmail(email)) {
      setErrorEmail("Please check email type");
    } else {
      setErrorEmail("");
    }
    return !checkEmail;
  };
  const validatePassword = (password, min, max) => {
    let checkPassword = false;

    if (!password) {
      setErrorPassword("Password is not blank");
    } else if (password.length < min) {
      setErrorPassword(`Password must be at least ${min} character.`);
    } else if (password.length > max) {
      setErrorPassword(`Password must be less than ${max} character.`);
    } else if (!/[A-Z]/.test(password)) {
      setErrorPassword(
        "password should contain at least 1 uppercase character"
      );
    } else if (!/[0-9]/.test(password)) {
      setErrorPassword("password should contain at least 1 number character");
    } else if (!/[$@%^&*()}{[\]}!]/.test(password)) {
      setErrorPassword("password should contain at least 1 special character");
    } else {
      setErrorPassword("");
    }
    return !checkPassword;
  };
  const passwordMatch = (password, confirm_password) => {
    let checkMatch = false;
    if (!confirm_password) {
      setErrorConfirm("ConfirmPassword is not blank");
    } else if (password !== confirm_password) {
      setErrorConfirm("Password does not match");
    } else {
      setErrorConfirm("");
    }
    return !checkMatch;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateName(name, 4);
    validateEmail(email);
    validatePassword(password, 8, 16);
    passwordMatch(password, confirm_password);
    let validateForms =  validateName(name, 4) && validateEmail(email) && validatePassword && passwordMatch
    if(validateForms ){
      try {
        ApiHelper.setJwtToken(null);
        const resposne = await ApiHelper.post({
          path: "auth/register",
          payload: JSON.stringify({
            name: name,
            email: email,
            password: password,
            confirm_password: confirm_password,
          }),
        });
  
        if (resposne.success === true) {
          setLoaded(true);
          showToastMessageSuccess(resposne.message);
        }
      } catch (error) {
        setLoaded(true);
        showToastMessageError(error.message);
      }
    }
  
   
  };

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
          <Form autoComplete="off" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 ">
              <Form.Label>Name</Form.Label>
              <Form.Control
                className="name"
                name="name"
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={handleChangeName}
              />
              <p className="text-danger">{errorName}</p>
            </Form.Group>
            <Form.Group className="mb-3 ">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                className="email"
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleChangeEmail}
              />
              <p className="text-danger">{errorEmail}</p>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Label>Password</Form.Label>
              <Form.Control
                className="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChangePassword}
              />
              <p className="text-danger">{errorPassowrd}</p>
            </Form.Group>

            <Form.Group className="mb-3 ">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                className="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Password"
                value={confirm_password}
                onChange={handleChangeNameConfirmPassword}
              />
              <p className="text-danger">{errorConfirm}</p>
            </Form.Group>
            <ButtonComponent
              className="btn-primary w-100"
              name={"Register"}
              type={"submit"}
              onClick={showToastMessageError || showToastMessageSuccess}
            ></ButtonComponent>
            <ToastContainer autoClose={1000} hideProgressBar={true} />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
