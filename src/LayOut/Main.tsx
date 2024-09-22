// src/layouts/Main.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Main: React.FC = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default Main;
