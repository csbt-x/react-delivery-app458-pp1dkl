import React, { useState } from "react";
import { useRestaurantContext } from "../../Context/restaurantContext";
import { BrowserRouter as Router, Link, Switch, Route, useHistory } from "react-router-dom";
import Dashboard from './Dashboard/Dashboard'
import Orders from './Orders/Orders'
import Dishes from './Dishes/Dishes'
import AddDish from './Dishes/AddDish'
import Customers from './Customers/Customers'
import SideBar from './SideBar/SideBar'

const Restaurant = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useRestaurantContext();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div>
        <SideBar />
      </div>
      <div className="w-100 text-center mt-2">
        <div>
          <Switch>
           <Route exact path={`/restaurante/`} component={Dashboard} />
            <Route path={`/restaurante/ordenes`} component={Orders} />
            <Route path={`/restaurante/platillos`} component={Dishes} />
            <Route path={`/restaurante/agregar`} component={AddDish} />
            <Route path={`/restaurante/clientes`} component={Customers} />
          </Switch>
        </div>
      </div>
    </>
  );
};

export default Restaurant;
