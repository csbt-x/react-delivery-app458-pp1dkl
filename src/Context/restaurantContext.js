import React, { useContext, useState, useEffect } from "react";
import {
  projectAuth,
  projectFirestore,
  timestamp,
  projectStorage
} from "../Firebase/config.js";
 
const RestaurantContext = React.createContext();

export function useRestaurantContext() {
  return useContext(RestaurantContext);
}

export function RestaurantProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return projectAuth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return projectAuth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return projectAuth.signOut();
  }

  function updateName(name) {
    return currentUser.updateProfile({ displayName: name });
  }

  const getDishes = async (collection = "dishes") => {
    const unsub = await projectFirestore
      .collection("dishes")
      .orderBy("createdAt", "desc")
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDishes(documents);
      });
    //unsub();
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

  const createDish = async dish => {
    const collectionRef = await projectFirestore.collection("dishes");
    const createdAt = await timestamp();
    const result = await collectionRef.add({ ...dish, createdAt });
    return result;
  };

  const getOrders = async (collection = "orders") => {
    const unsub = await projectFirestore
      .collection(collection)
      //.orderBy('createdAt', 'desc')
      .onSnapshot(snap => {
        let documents = [];
        snap.forEach(doc => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setOrders(documents);
      });
    return () => unsub();
  };

  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateName,
    dishes,
    uploadImage,
    getDishes,
    progress
  };
  return (
    <RestaurantContext.Provider value={value}>
      {!loading && children}
    </RestaurantContext.Provider>
  );
}
