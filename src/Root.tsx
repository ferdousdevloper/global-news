import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from './LayOut/Main';

const Root = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
     
    },
  ]);
export default Root;