import React, { useRef, useState } from "react";
import { useRestaurantContext } from "../../../Context/restaurantContext";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

const SideBar = () => {
  const { logout} = useRestaurantContext();
  const [error, setError] = useState("");
  const history = useHistory();

  return (
    <div className="nav" id="navbar">
      <nav className="nav__container">
        <div>
          <a href="#" className="nav__link nav__logo">
            <i className="bx bxs-disc nav__icon" />
            <span className="nav__logo-name">Deliveru</span>
          </a>

          <div className="nav__list">
            <div className="nav__items">
              <h3 className="nav__subtitle">Menu</h3>

              <Link to='/restaurante/' className="nav__link active">
                <i className="bx bx-home nav__icon" />
                <span className="nav__name">Dashboard</span>
              </Link>

              <Link to='/restaurante/ordenes' className="nav__link">
                <i className="bx bx-purchase-tag nav__icon" />
                <span className="nav__name">Ordenes</span>
              </Link>
              <Link to='/restaurante/platillos' className="nav__link">
                <i className="bx bx-dish nav__icon" />
                <span className="nav__name">Platillos</span>
              </Link>
              <Link to='/restaurante/clientes' className="nav__link">
                <i className="bx bx-user nav__icon" />
                <span className="nav__name">Clientes</span>
              </Link>
              <a onClick={logout} className="nav__link">
                <i className="bx bx-log-out nav__icon" />
                <span className="nav__name">Log Out</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
