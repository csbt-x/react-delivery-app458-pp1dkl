import React, { useRef, useState, useEffect } from "react";
import { useRestaurantContext } from "../../../Context/restaurantContext";
import UploadForm from "../../../Components/UploadForm";
import { Link, useHistory } from "react-router-dom";
import { projectFirestore } from '../../../Firebase/config';

const Orders = () => {
  const [error, setError] = useState("");
  const history = useHistory();
 
useEffect(() => {
    const unsub = projectFirestore.collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({...doc.data(), id: doc.id});
        });
        console.log(documents)
      });
    return () => unsub();
  }, []);

  return (
    <div>
    {error && <h3 variant="danger">{error}</h3>}
     Orders
    </div>
  );
};

export default Orders;