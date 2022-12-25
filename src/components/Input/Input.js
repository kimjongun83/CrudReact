import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import './input.scss'

const InputComponent = ({ className, type, name, placeholder, showHiddenPass, ...props }) => {

    const [state, setState] = useState(false);

    const toggleEye = () => {
        setState(prevState => !prevState);
    }

    const renderInput = () => {
        if (showHiddenPass) {
            return (
                <Form.Group className='mt-5 form-input d-flex'>
                    <Form.Control
                        required
                        type={state ? "text" : "password"}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        {...props}
                    />
                    <span className='showEye' onClick={toggleEye}>
                        {state ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </span>
                </Form.Group>
            )
        } else {
            return (
                <Form.Group className='mt-5 form-input'>
                    <Form.Control
                        required
                        type={type}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        {...props}
                    />
                </Form.Group>
            )
        }
    }
    return (
        <>
            {renderInput()}
        </>
    );
}
export default InputComponent;

