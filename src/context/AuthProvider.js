import { createContext, useState } from "react";

const AuthContext = createContext({});
export default AuthContext;


export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [selectedSensors, setSelectedSensors] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        selectedSensors, 
        setSelectedSensors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
