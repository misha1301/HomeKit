import React from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import GuessLayout from "./layouts/GuessLayout";
import RequireAuth from "./provider/RequireAuth";
import PersistLogin from "./components/persistLogin/PersistLogin";
import { Main, NotFound, Login, Register } from "./pages";
import "./App.css";
import "./msgpopup/msgpopup.css";

function App() {
  const ROLES_LIST = {
    Admin: 5001,
    Editor: 4001,
    User: 3001,
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<GuessLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<PersistLogin/>}>
          <Route element={<RequireAuth  allowedRoles={[5001,4001,3001]}/>}>
            <Route path="main" element={<Main />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
