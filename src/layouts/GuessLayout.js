import React from "react";
import { Outlet } from "react-router-dom";

import './guess.css';

const GuessLayout = () => {
  return (
    <div className="guess-layout">
        <Outlet />
    </div>
  );
};

export default GuessLayout;
