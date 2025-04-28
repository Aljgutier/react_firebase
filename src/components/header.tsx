// pages/Header.tsx

import { Link, Outlet } from "react-router-dom";
import React from "react";
function Header() {
  return (
    <>
      <nav>
        <p>
          <Link to="/">Home</Link>
        </p>
        <p>
          <Link to="/signin">Sign In</Link>
        </p>
        <p>
          <Link to="/signup">Sign Up</Link>
        </p>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
export default Header;
