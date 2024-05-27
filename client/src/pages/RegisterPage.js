import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("Registration sucessful");
      // return <Navigate to={"/login"} />;
      setRedirect(true);
    } else {
      alert("Registration failed");
    }
  }

  if (redirect) return <Navigate to="/login" />;
  // ====================================================================
  return (
    <form
      className="max-md:px-3 sm:max-w-[400px] mx-auto flex flex-col gap-4  pt-[100px]"
      onSubmit={register}
    >
      <h1 className="text-center text-3xl">Register</h1>
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
      <button className="bg-green-400 py-4 hover:bg-green-600">Register</button>
    </form>
  );
};

export default RegisterPage;
