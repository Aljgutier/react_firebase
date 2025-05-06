// pages/signup.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase-config";

import { ToastContainer, toast } from "react-toastify";

import visibilityIcon from "../assets/visibilityIcon.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [screenName, setUserName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // this profile is local to client app not in cloud/firebase
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: screenName,
        });
      }

      //firestore
      const docData = {
        email: email,
        userName: screenName,
        timestamp: serverTimestamp(),
      };

      await setDoc(doc(db, "users", user.uid), docData);

      navigate("/");
    } catch (error) {
      // Add toast notification user feedback
      toast.error("Bad User Credentials");
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formHeading">Sign-Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="inputGroup">
          <label htmlFor="screenName">Screen Name:</label>
          <div className="inputAlign">
            <input
              type="text"
              className="inputField"
              id="screenName"
              value={screenName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
        </div>
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
          <button type="submit">Sign Up</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Signup;
