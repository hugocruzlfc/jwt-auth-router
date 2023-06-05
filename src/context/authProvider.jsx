import { createContext, useMemo, useReducer } from "react";
import authReducer from "../hooks/authReducer";
import ACTIONS from "../types/authReducerActions";

export const AuthContext = createContext();

// Initial state for the authentication context
const initialData = {
  token: localStorage.getItem("token"),
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // const [token, setToken_] = useState(localStorage.getItem("token"));

  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData);

  // useEffect(() => {
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //     localStorage.setItem("token", token);
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //     localStorage.removeItem("token");
  //   }
  // }, [token]);

  const setToken = (newToken) => {
    dispatch({ type: ACTIONS.setToken, payload: newToken });
  };

  // Function to clear the authentication token
  const clearToken = () => {
    // Dispatch the clearToken action to update the state
    dispatch({ type: ACTIONS.clearToken });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      clearToken,
    }),
    [state] //token
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
