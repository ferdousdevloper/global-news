import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const GotoTop = () => {
  const goToBtn = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  return (
    <div className="top-btn" onClick={goToBtn}>
      <Link className="text-2xl text-pink-300 font-semibold  bg-green-700 p-3 rounded-3xl outline-none hidden lg:flex hover:bg-pink-300 hover:text-green-700">
        <FaArrowAltCircleUp />
      </Link>
    </div>
  );
};

export default GotoTop;
