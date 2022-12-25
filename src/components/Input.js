import React from "react";
import { useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const InputComponents = ({
    type,
    name,
    className,
    placeholder,
    ShowHidePassword,
    children,
    ...props
}) => {
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    const renderInput = () => {
        if (ShowHidePassword) {
            return (
                <>
                    <div className='input-wrap'>
                        <input
                            type={passwordType}
                            id={name}
                            name={name}
                            className={`input-field ${name}`}
                            {...props}
                        />
                        <label>{placeholder}</label>
                        <span
                            className='showHiddenPass'
                            onClick={togglePassword}
                        >
                            {passwordType === "password" ? (
                                <AiOutlineEyeInvisible />
                            ) : (
                                <AiOutlineEye />
                            )}
                        </span>
                        {children}
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <div className='input-wrap'>
                        <input
                            type={type}
                            id={name}
                            name={name}
                            className={`input-field ${name}`}
                            {...props}
                        />
                        <label>{name}</label>
                        {children}
                    </div>
                </>
            );
        }
    };
    return <>{renderInput()}</>;
};

export default InputComponents;