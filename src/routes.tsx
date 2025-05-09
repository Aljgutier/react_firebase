// src/router.tsx
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import UserPage from "./pages/userPage";
import ResetPassword from "./pages/resetPassword";
import Header from "./components/header";
import PrivateRoute from "./components/pivateRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="reset_password" element={<ResetPassword />} />

      {/* Protect userPage route */}
      <Route element={<PrivateRoute />}>
        <Route path="user_page" element={<UserPage />} />
      </Route>
    </Route>
  )
);

export default router;
