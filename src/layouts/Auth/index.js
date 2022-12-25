import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }) => {
    return (
        <div className="Auth-layout">
            {children}
            <ToastContainer />
        </div>)
}
export default AuthLayout;