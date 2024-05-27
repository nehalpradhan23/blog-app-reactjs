import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main>
      <Header />
      {/* <div className="header-border"></div> */}
      <Outlet />
    </main>
  );
};

export default Layout;
