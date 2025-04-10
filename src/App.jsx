import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AppLayout from "./Layout/AppLayout";
import SignUp from "./Pages/SignUp";
import MailverificationSuccess from "./Pages/MailverificationSuccess";
import { Toaster } from "react-hot-toast";
import Dashboard from "./Pages/Dashboard";
import Email from "./Components/ForgetPassword/Email";
import Otpverify from "./Components/ForgetPassword/Otpverify";
import ChangePassword from "./Components/ForgetPassword/ChangePassword";
import { EmailProvider } from "./Components/Context Api Store/EmailContext";
import UploadDP from "./Components/UploadDP";
import SingleBlog from "./Pages/SingleBlog";
import Blogs from "./Pages/Blogs";
import EditBlog from "./Components/EditBlog";

const router = createBrowserRouter([
  {
    path: "",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/mailverified",
        element: <MailverificationSuccess />,
      },
      {
        path: "/send-otp",
        element: <Email />,
      },
      {
        path: "/verify-otp",
        element: <Otpverify />,
      },
      {
        path: "/password-change",
        element: <ChangePassword />,
      },
      {
        path: "/blogs",
        element: <Blogs/>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/upload",
    element: <UploadDP />,
  },
  {
    path: "/readblog/:id",
    element: <SingleBlog />,
  },
  {
    path: "/editblog/:id",
    element: <EditBlog />,
  },
]);

const App = () => {
  return (
    <EmailProvider>
      <Toaster position="top-right" />
      <RouterProvider router={router} />
    </EmailProvider>
  )
}

export default App;
