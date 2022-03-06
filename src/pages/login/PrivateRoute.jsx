import React from "react";
import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("user")) {
          // not logged in so redirect to login page with the return url
          return <Navigate to="/login" />;
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

export default { PrivateRoute };
