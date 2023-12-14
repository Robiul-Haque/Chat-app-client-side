/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivetRoute = ({ children }) => {
    const { loginUser, loadingSpinner } = useContext(AuthContext);

    if (loadingSpinner) {
        return (
            <span className="loading loading-spinner loading-md"></span>
        )
    }

    if (loginUser.email) {
        return children;
    } else {
        <Navigate to='sign-in'></Navigate>
    }
};

export default PrivetRoute;