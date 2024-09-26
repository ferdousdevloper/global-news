// src/layouts/Main.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Main: React.FC = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="py-0 md:py-4">
        <Outlet />
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default Main;
