import React, { useRef, useState, useEffect } from "react";
import { useRestaurantContext } from "../../../Context/restaurantContext";
import UploadForm from "../../../Components/UploadForm";
import { Link, useHistory } from "react-router-dom";
import {
  projectFirestore,
  timestamp,
  projectStorage
} from "../../../Firebase/config";

const AddDish = () => {
  //const { dishes, getDishes, uploadImage } = useRestaurantContext();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState();
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onAdd = async () => {
    const dish = {
      name,
      desc,
      price
    };
    const dishCreated = await uploadImage(dish, file);
    console.log(dishCreated);
  };

  const uploadImage = async (dish, file) => {
    const storageRef = await projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("dishes");

    storageRef.put(file).on(
      "state_changed",
      snap => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      err => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        const result = await collectionRef.add({
          name: dish.name,
          desc: dish.desc,
          price: dish.price,
          url,
          createdAt
        });
        setProgress(0);
        return result;
      }
    );
  };

  return (
    <div>
      {error && <h3 variant="danger">{error}</h3>}
      <h1>Agregar Platillo</h1>
      {file && <img className="dish-img" alt="dish img" src={URL.createObjectURL(file)} />}
      <UploadForm setFile={setFile} file={file} />
      <div className="form-group">
        <input
          type="text"
          className="form-control input-default "
          placeholder="Nombre"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <textarea
          placeholder="Descripcion"
          className="form-control input-default "
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Precio"
          className="form-control input-default "
          type="number"
          value={price}
          onChange={e => setPrice(parseInt(e.target.value))}
        />
      </div>
      
        <button className="addButton" onClick={onAdd}>
          Agregar
        </button>
     
    </div>
  );
};

export default AddDish;
