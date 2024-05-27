import React, { useContext, useState } from "react";
import "./LoginRegister.css";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("wrong credentials");
    }
  }
  // ================================================================
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    // <div className="flex w-full h- justify-center items-center top-0 right-0 bg-green-400">
    <form
      className="max-md:px-3 sm:max-w-[400px] mx-auto flex flex-col gap-4  pt-[100px]"
      onSubmit={login}
    >
      <h1 className="text-center text-3xl">Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border-2 border-black p-3"
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-black p-3"
      />
      <button className="bg-green-400 py-4 hover:bg-green-600">Login</button>
    </form>
    // </div>
  );
};

export default LoginPage;
