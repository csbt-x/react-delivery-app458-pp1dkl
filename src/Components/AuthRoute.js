import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useRestaurantContext } from "../Context/restaurantContext";

export default function AuthRoute({ component: Component, ...rest }) {
  const { currentUser } = useRestaurantContext();

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? (
          <Redirect to="/restaurante/" />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
}
