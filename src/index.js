import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Login from "./pages/login/Login";

ReactDOM.render(
  <React.StrictMode>
    {!localStorage.getItem("user") && <Login />}
    {localStorage.getItem("user") && <App />}
  </React.StrictMode>,
  document.getElementById("root")
);
