import React, { useRef, useState } from "react";
import "./login.css";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  localStorage.clear();
  const isFetching = false;
  const username = useRef();
  const password = useRef();
  const [isAuth, setIsAuth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const usernamex = username.current.value;
      const passwordx = password.current.value;
      console.log(usernamex + " " + passwordx);
      const body = {
        usernamex,
        passwordx,
      };
      console.log(body);
      const response = await fetch("http://localhost:9000/main-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const jsonData = await response.json();
      console.log("in fetch login");
      console.log(jsonData);
      if (jsonData.isAuthenticated) {
        setIsAuth(true);
        localStorage.setItem("isAuthed", true);
        localStorage.setItem("user", jsonData.user);

        window.location = "/";
      } else {
        localStorage.clear();
        window.location = "/login";
      }
    } catch (err) {
      console.error(err.message);
      window.location = "/login";
      localStorage.clear();
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Melzcafe</h3>
          <span className="loginDesc">
            Your local one stop cafe for the best coffee, breakfast & lunch!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="username"
              required
              className="loginInput"
              ref={username}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />

            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
