import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const parseObjectToFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });
    return formData;
};
export const objectToQueryString = (obj, prefix) => {
    return Object.keys(obj).map(objKey => {
        if (obj.hasOwnProperty(objKey)) {
            const key = prefix ? `${prefix}[${objKey}]` : objKey;
            const value = obj[objKey];

            return typeof value === "object" ?
                this.objectToQueryString(value, key) :
                `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
        return null;
    }).join("&");
}
export const handleErrors = (response) => {
    if ([200, 201].includes(response.status)) {
        return response
    }

    throw response
}

export const validate = (values) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Username cannot be blank";
    } else if (!/^([^0-9]*)$/.test(values.name)) {
        errors.name = "Username must not contain numbers"
    } else {
        delete errors.name;
    }

    if (!values.email) {
        errors.email = "Email cannot be blank";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(values.email).toLowerCase())) {
        errors.email = "Email address is invalid!";
    } else {
        delete errors.email;
    }

    if (!values.password) {
        errors.password = "Password cannot be blank";
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password should contains uppercase character";
    } else if (!/[$@%^&*()}{[\]}!]/.test(values.password)) {
        errors.password = "Password must contains at least 1 special character"
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contains at least 1 number character";
    } else if (!(values.password.length >= 6)) {
        errors.password = "Password needs to be 6 character or more";
    } else {
        delete errors.password;
    }

    if (!values.confirm_password) {
        errors.confirm_password = "Confirm password cannot be blank";
    } else if (!(values.confirm_password === values.password)) {
        errors.confirm_password = "Password is not match!";
    } else {
        delete errors.confirm_password;
    }

    return errors;
};
export const validateLogin = (values) => {
    const errors = {};

    if (!values.email) {
        errors.email = "Email cannot be blank";
    } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(values.email).toLowerCase())) {
        errors.email = "Email address is invalid!";
    } else {
        delete errors.email;
    }

    if (!values.password) {
        errors.password = "Password cannot be blank";
    } else if (!/[A-Z]/.test(values.password)) {
        errors.password = "Password should contains uppercase character";
    } else if (!/[$@%^&*()}{[\]}!]/.test(values.password)) {
        errors.password = "Password must contains at least 1 special character"
    } else if (!/[0-9]/.test(values.password)) {
        errors.password = "Password must contains at least 1 number character";
    } else if (!(values.password.length >= 6)) {
        errors.password = "Password needs to be 6 character or more";
    } else {
        delete errors.password;
    }

    return errors;
};

export const notify = (text, type) => {
    if (type === "success") {
        toast.success(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    } else {
        toast.error(text, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
};