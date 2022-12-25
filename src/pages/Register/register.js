import ApiHepler from 'services/services.js'
import './register.scss'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import InputComponent from 'components/Input/Input.js';
import ButtonComponent from "components/Button/Button.js"
import Form from 'react-bootstrap/Form';
import { validate, notify } from 'utils/function.js';
import { ETypeStatus } from 'constants/constant.js';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
        validate,
        onSubmit: (values) => {
            registerSubmit(values);
        }
    });
    const resetForms = () => {
        formik.values.name = "";
        formik.values.email = "";
        formik.values.password = "";
        formik.values.confirm_password = "";
    };

    const registerSubmit = async (object) => {
        try {
            setLoading(true);
            ApiHepler.setJwtToken(null);
            const response = await ApiHepler.post({ path: 'auth/register', payload: JSON.stringify(object) })
            if (response.success === true) {
                setLoading(false);
                notify("Sign Up Success", ETypeStatus.SUCCESS);
                resetForms();
                navigate("/login");
            }
        } catch (error) {
            notify(error.data.email[0], ETypeStatus.ERROR);
            setLoading(false);
        }
    };

    return (
        <div className="register d-flex align-items-center justify-content-center">
            <div className='container'>
                <Form onSubmit={formik.handleSubmit} disabled={loading}>
                    <h1 className='mb-4'>Register</h1>
                    <p className='text-center'>Already have an account?
                        <Link to="/login">Sign In</Link>
                    </p>

                    <InputComponent
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Username"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    ></InputComponent>
                    {formik.errors.name && <span className="text-danger">{formik.errors.name}</span>}

                    <InputComponent
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                    ></InputComponent>
                    {formik.errors.email && <span className="text-danger">{formik.errors.email}</span>}

                    <InputComponent
                        showHiddenPass={true}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                    ></InputComponent>
                    {formik.errors.password && <span className="text-danger">{formik.errors.password}</span>}

                    <InputComponent
                        showHiddenPass={true}
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                    ></InputComponent>
                    {formik.errors.confirm_password && <span className="text-danger">{formik.errors.confirm_password}</span>}

                    <ButtonComponent className={"mt-5 form-input btn-primary btn-submit"} name={"Sign Up"} type={"submit"} isLoading={loading}></ButtonComponent>

                </Form>
            </div>
        </div >)
}
export default Register;