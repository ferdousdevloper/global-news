import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Main from "./LayOut/Main";
import Home from "./Pages/Home";
import ErrorPage from "./Pages/ErrorPage";
import SignInPage from "./Pages/SignInPage";
import RegisterPage from "./Pages/RegisterPage";
import Politics from "./Pages/Politics";
import AllNews from "./Pages/AllNews";
import NewsApp from "./Pages/NewsApp";
import Latest from "./Pages/Latest";
import Entertainment from "./Pages/Entertainment";
import Contact from "./Pages/Contact";
import Business from "./Pages/Business";
import Tech from "./Pages/Tech";
import Feature from "./Pages/Feature";
import Opinion from "./Pages/Opinion";
import Sport from "./Pages/Sport";
import Gallery from "./Pages/Gallery";
import PrivateRoute from "./Routes/PrivateRoute";
import NewsDetail from "./Pages/NewsDetails";

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
        element: <AllNews />,
      },
      {
        path: "/newsapp",
        element: <NewsApp />,
      },
      {
        path: "/latest",
        element: <Latest />,
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
        path: "/news/:id",
        element: (
          <PrivateRoute>
            <NewsDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default Root;
