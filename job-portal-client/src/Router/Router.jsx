import {
    createBrowserRouter
} from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
import About from "../Pages/About";
import PostJob from "../Pages/PostJob";
import MyJobs from "../Pages/MyJobs.jsx";
import SalaryPage from "../Pages/SalaryPage.jsx";
import UpdateJob from "../Pages/UpdateJob.jsx";
import Login from "../components/Login.jsx";
import JobDetails from "../Pages/JobDetails.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {path: "/", element: <Home/>},
            {path: "/about", element: <About/>},
            {path: "/post-job", element: <PostJob/>},
            {path: "/my-job", element: <MyJobs/>},
            {path: "/salary", element: <SalaryPage/>},
            {
                path: "/edit-job/:id",
                element: <UpdateJob/>,
                loader: ({params}) => fetch(`${process.env.BACKEND_URL}/all-jobs/${params.id}`)
            },
            {path: "/login", element: <Login/>},
            {path: "/job/:id", element: <JobDetails/>},

        ]
    },
]);

export default router;