import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Pages/Sign-in/SignIn";
import SignUp from "../Pages/Sign-up/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Dashboard></Dashboard>
            },
            {
                path: "sign-in",
                element: <SignIn></SignIn>
            },
            {
                path: "sign-up",
                element: <SignUp></SignUp>
            }
        ]
    },
]);

export default router;