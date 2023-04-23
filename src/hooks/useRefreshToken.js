import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get(
        "/refresh",
        {
          headers: { ContentType: "application/json" },
          withCredentials: true,
        }
      );
    
      setAuth((prev) => {
        console.log(prev);
        return {
          ...prev,
          username: response.data.username,
          roles: response.data.roles,
          accessToken: response.data.accessToken,
        };
      });
      
      console.log(response.data.accessToken);

      return response.data.accessToken;
    } catch (error) {
      console.log(error.response);
    }
  };
  return refresh;
};

export default useRefreshToken;
