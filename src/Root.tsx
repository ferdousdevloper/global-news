import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./LayOut/Main";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import Politics from "./Pages/Politics";
import AllNews from "./Pages/AllNews";
import NewsForm from "./Pages/NewsForm";

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
        path: "/category/politics",
        element: <Politics />,
      },
      {
        path: "/login",
        element: <SignInPage></SignInPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/all-news",
        element: <AllNews/>
      },
      {
        path: '/news-post',
        element: <NewsForm/>
      }
    ],
  },
]);
export default Root;
