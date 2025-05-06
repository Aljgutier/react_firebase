// pages/Header.tsx
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect after logout
    } catch (error) {
      toast.error("Error signing out:");
    }
  };

  const handleHome = () => {
    if (auth.currentUser) {
      navigate("/user");
    } else {
      navigate("/");
    }
  };

  const handleSignIn = () => navigate("/signin");
  const handleSignUp = () => navigate("/signup");

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <button onClick={handleHome} className="nav-button">
            React-Firebase-App
          </button>
        </div>
        <div className="navbar-links">
          <button onClick={handleHome} className="nav-button">
            Home
          </button>

          {auth.currentUser ? (
            <button onClick={handleSignOut} className="nav-button">
              Sign Out
            </button>
          ) : (
            <>
              <button onClick={handleSignIn} className="nav-button">
                Sign-In
              </button>
              <button onClick={handleSignUp} className="nav-button">
                Sign-Up
              </button>
            </>
          )}
        </div>
      </nav>
      <div>
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
}

export default Header;
