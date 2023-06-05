import axios from "axios";
import ACTIONS from "../types/authReducerActions";

// Reducer function to handle authentication state changes
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.setToken:
      // Set the authentication token in axios headers and local storage
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + action.payload;
      localStorage.setItem("token", action.payload);

      // Update the state with the new token
      return { ...state, token: action.payload };

    case ACTIONS.clearToken:
      // Clear the authentication token from axios headers and local storage
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");

      // Update the state by removing the token
      return { ...state, token: null };

    // Handle other actions (if any)

    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`
      );
  }
};

export default authReducer;
