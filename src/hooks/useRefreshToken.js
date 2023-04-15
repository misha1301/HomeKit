import axios from "../../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  
  // const security = JSON.parse(localStorage.getItem("security"));
  // const accessToken = security?.accessToken.toString();
  // const refreshToken = security?.refreshToken.toString();

  const refresh = async () => {
    // console.log(accessToken);
    // console.log(refreshToken);
    try {
      const response = await axios.post(
        "/refresh-token",
        {
          "accessToken": localStorage.getItem("accessToken"),
          "refreshToken": localStorage.getItem("refreshToken")
        },
        {
          headers: { ContentType: "application/json" },
          withCredentials: true,
        }
      );
      
      console.log("refreshToken is", response.data.refreshToken);
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAuth((prev) => {
        console.log(JSON.stringify(prev));
        return {
          ...prev,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        };
      });

      return response.data.accessToken;
    } catch (error) {
      console.log(error.response);
    }
  };
  return refresh;
};

export default useRefreshToken;
