import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { RestaurantProvider } from "./Context/restaurantContext";
import AuthRoute from "./Components/AuthRoute";
import PrivateRoute from "./Components/PrivateRoute";
import Login from './Screens/Login/Login';
import Restaurant from './Screens/Restaurant/App';
import "./style.css";

export default function App() {
  return (
    <div>
    <Router>
      <RestaurantProvider>
          <Switch>
            <AuthRoute exact path="/" component={Login} />
            <PrivateRoute path="/restaurante" component={Restaurant} />
          </Switch>
          </RestaurantProvider>
        </Router>
    </div>
  );
}
