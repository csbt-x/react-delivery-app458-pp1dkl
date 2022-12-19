import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useRestaurantContext } from "../Context/restaurantContext";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useRestaurantContext()

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}