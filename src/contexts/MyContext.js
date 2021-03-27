import React, { createContext, useState } from "react";
import Axios from "axios";
export const MyContext = createContext();

// Define the base URL

const MyContextProvider = (props) => {
  const [state, setState] = useState({
    showLogin: true,
    isAuth: false,
    theUser: null,
  });

  // Root State

  // Toggle between Login & Signup page
  const toggleNav = () => {
    const showLogin = !state.showLogin;
    setState({
      ...state,
      showLogin,
    });
  };

  // On Click the Log out button
  const logoutUser = () => {
    localStorage.removeItem("loginToken");
    setState({
      ...state,
      isAuth: false,
    });
  };

  const registerUser = async (user) => {
    // Sending the user registration request
    const register = await Axios.post("register.php", {
      name: user.name,
      email: user.email,
      password: user.password,
    });

    return register.data;
  };

  const loginUser = async (user) => {
    // Sending the user Login request
    const login = await Axios.post("login.php", {
      email: user.email,
      password: user.password,
    });
    return login.data;
  };

  // Checking user logged in or not
  const isLoggedIn = async () => {
    const loginToken = localStorage.getItem("loginToken");

    // If inside the local-storage has the JWT token
    if (loginToken) {
      //Adding JWT token to axios default header
      Axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;

      // Fetching the user information
      const { data } = await Axios.get("user-info.php");

      // If user information is successfully received
      if (data.success && data.user) {
        setState({
          ...state,
          isAuth: true,
          theUser: data.user,
        });
      }
    }
  };

  const contextValue = {
    rootState: state,
    toggleNav: toggleNav,
    isLoggedIn: isLoggedIn,
    registerUser: registerUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  return (
    <MyContext.Provider value={contextValue}>
      {props.children}
    </MyContext.Provider>
  );
};
export default MyContextProvider;
