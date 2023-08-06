import React, { useState } from "react";
import axios from "axios";
import "./Login.scss";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.log("error in login");
      console.log(error);
    }
  };

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <h4>UserName</h4>
        <input
          type="text"
          className="inp"
          placeholder="tester"
          onChange={(e) => setUsername(e.target.value)}
        />
        <h4>Password</h4>
        <input
          type="password"
          className="inp"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn" type="submit">
          Login
        </button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
