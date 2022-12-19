import React, { useRef, useState } from "react";
import { useRestaurantContext } from "../../../Context/restaurantContext";
import { Link, useHistory } from "react-router-dom";

const Dashboard = () => {
  const { currentUser } = useRestaurantContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();


  return (
    <div>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <div variant="danger">{error}</div>}
          <strong>Name:</strong> {currentUser.displayName}
          <br />
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Id:</strong> {currentUser.uid}
        </div>
  );
};

export default Dashboard;