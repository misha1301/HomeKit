import React from "react";

import "./model.css";

const Model = ({ children, onSubmit }) => {
  
  return (
      <form className="model-container" onSubmit={onSubmit}>
        {children}
      </form>
  );
};

export default Model;
