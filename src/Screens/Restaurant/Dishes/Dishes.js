import React, { useRef, useState, useEffect } from "react";
import { useRestaurantContext } from "../../../Context/restaurantContext";
import UploadForm from "../../../Components/UploadForm";
import { Link, useHistory } from "react-router-dom";
import { projectFirestore } from "../../../Firebase/config";
import "./dishStyles.css";

const Dishes = () => {
  const [error, setError] = useState("");
  const [dishes, setDishes] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const unsub = projectFirestore
      .collection("dishes")
      .orderBy("createdAt", "desc")
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDishes(documents);
        console.log(documents);
      });
    return () => unsub();
    // this is a cleanup function that react will run when
    // a component using the hook unmounts
  }, []);

  return (
    <div>
      {error && <h3 variant="danger">{error}</h3>}
      <div className="dish-header">
        <h1> Dishes</h1>
        <Link to="/restaurante/agregar" className="nav__link active">
          <span >Agregar</span>
        </Link>
      </div>
      <div className="dish-wrapper">
        <div className="dish-container">
          {dishes.map(dish => {
            return (
              <div className="dish-card" key={dish.id}>
                <div className="dish-img-cont">
                  <img className="dish-img" alt="image" src={dish.url} />
                </div>
                <div className="dish-info-cont">
                  <h3>{dish.name}</h3>
                  <h3>${dish.price}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dishes;
