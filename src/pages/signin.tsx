// pages/signin.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../firebase-config";
import visibilityIcon from "../assets/visibilityIcon.svg";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredential.user) {
        navigate("/user");
      }
    } catch (error) {
      // Add toast notification user feedback
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formHeading">Sign-In</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <div className="inputAlign">
            <input
              type="email"
              className="inputField"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="inputGroup">
          <label htmlFor="password">Password:</label>
          <div className="inputAlign passwordInputContainer">
            <input
              className="inputField"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="passwordToggleIcon"
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>
        </div>

        <div className="buttonAlign">
          <button type="submit">Sign In</button>
        </div>
      </form>

      <ToastContainer />

      <p className="linkAlign">
        <Link to="/resetPassword">Reset Password</Link>
      </p>
    </div>
  );
};

export default Signin;
