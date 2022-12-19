import React, { useRef, useState } from "react";
import { useRestaurantContext } from "../../Context/restaurantContext";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signup } = useRestaurantContext();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value)
      //await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  };

  return (
    <div>
    {error && <h3 variant="danger">{error}</h3>}
      <form onSubmit={handleSubmit}>
       <input type="email" ref={emailRef} required />
       <input type="password" ref={passwordRef} required />
       <button disabled={loading} type="submit">
              Sign Up
            </button>
      </form>
    </div>
  );
};

export default Login;
