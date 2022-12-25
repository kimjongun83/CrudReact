import ApiHepler from 'services/services.js'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import './login.scss';
import InputComponent from 'components/Input/Input.js';
import ButtonComponent from "components/Button/Button.js"
import Form from 'react-bootstrap/Form';
import { parseObjectToFormData, validateLogin, notify } from 'utils/function.js';
import { ETypeStatus } from 'constants/constant.js';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: validateLogin,
        onSubmit: (values) => {
            loginSubmit(values);
        }
    });

    const resetForms = () => {
        formik.values.email = "";
        formik.values.password = "";
    };

    const loginSubmit = async (object) => {
        try {
            setLoading(true);
            const response = await ApiHepler.post({ path: 'auth/login', payload: parseObjectToFormData(object) })
            if (response.success === true) {
                ApiHepler.setJwtToken(null);
                setLoading(false);
                ApiHepler.storeAccessToken(response.data.access_token);
                notify("Sign In Success", ETypeStatus.SUCCESS);
                resetForms();
                navigate('/dashboard')
            }
        } catch (error) {
            notify('Error', ETypeStatus.ERROR);
            setLoading(false);
        }
    };

    return (
        <div className="login d-flex align-items-center justify-content-center">
            <div className='container'>
                <Form onSubmit={formik.handleSubmit} disabled={loading}>
                    <h1 className='mb-4'>Login</h1>
                    <p className='text-center'>Don't have an account?
                        <Link to="/register">Sign Up</Link>
                    </p>

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

                    <ButtonComponent className={"mt-5 form-input btn-primary"} name={"Sign In"} type={"submit"} isLoading={loading}>
                    </ButtonComponent>

                </Form>
            </div>
        </div >)
}
export default Login;