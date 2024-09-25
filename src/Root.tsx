import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./LayOut/Main";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import Politics from "./Pages/Politics";

const Root = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/latest",
        element: <Latest />,
      },
      {
        path: "/category/politics",
        element: <Politics />,
      },
      {
        path: "/category/entertainment",
        element: <Entertainment />,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/category/business",
        element: <Business />,
      },
      {
        path: "/category/tech",
        element: <Tech />,
      },
      {
        path: "/category/feature",
        element: <Feature />,
      },
      {
        path: "/category/opinion",
        element: <Opinion />,
      },
      {
        path: "/category/sports",
        element: <Sport />,
      },
      {
        path: "/category/gallery",
        element: <Gallery />,
      },
      {
        path: "/category/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/login",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
    ],
  },
]);
export default Root;
