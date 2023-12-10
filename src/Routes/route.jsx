import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../Component/SignIn";
import SignUp from "../Component/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <div>Chat Page</div>
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