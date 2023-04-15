import React from "react";
import { Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Room from "../../components/roomSection/Room";
import "./main.css";

const Main = () => {
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerWidth);

  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  const windowSize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", windowSize);
    return () => {
      window.removeEventListener("resize", windowSize);
    };
  }, []);

  useEffect(() => {
    const mouseClickHandler = (e) => {
      if (!menuRef?.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", mouseClickHandler);
    return () => {
      document.removeEventListener("mousedown", mouseClickHandler);
    };
  }, []);

  return (
    <>
      <header></header>
      <main>
        <Room roomName="Льошок" />
        <Room roomName="Рекупаратор" />
      </main>
      <nav>
        <div className="nav-content"></div>
      </nav>
    </>
  );
};

export default Main;
