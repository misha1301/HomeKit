import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import GuessLayout from "./layouts/GuessLayout";
import RequireAuth from "./provider/RequireAuth";
import { Main, NotFound, Login, Register } from "./pages";
import "./App.css";
import "./msgpopup/msgpopup.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route  element={<GuessLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="main" element={<Main />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
