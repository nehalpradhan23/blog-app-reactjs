import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const Header = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((response) => {
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/");
  }

  const username = userInfo?.username;
  // =========================================================================

  return (
    <>
      <header className="flex justify-between items-center border-b max-md:px-2 py-2">
        <Link to="/" className="text-3xl font-bold">
          My Blog
        </Link>
        <nav>
          {username && (
            <div className="flex gap-4">
              <Link className="hover:text-blue-700 font-bold" to="/create">
                Create new post
              </Link>
              <a className="hover:text-blue-700 font-bold" onClick={logout}>
                Logout
              </a>
            </div>
          )}
          {!username && (
            <div className="flex gap-4">
              <Link className="hover:text-blue-700 font-bold" to="/login">
                Login
              </Link>
              <Link className="hover:text-blue-700 font-bold" to="/register">
                Register
              </Link>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
