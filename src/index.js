import React from "react";
//import ReactDOM from 'react-dom';
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
