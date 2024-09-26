// src/layouts/Main.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";


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
        <Toaster></Toaster>
      </div>
    </div>
  );
};

export default Main;
