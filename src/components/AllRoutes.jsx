import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./landing/Landing";
import Login from "./auth/Login";
import PrivateRoute from "../utils/PrivateRoute";
import Dashboard from "./dashboard/Dashboard";
import Income from "./income/Income"; 
import Expenses from "./expenses/Expenses";
import Transactions from "./transactions/Transactions";
import Savings from "./savings/Savings";
import Signup from "./auth/Signup";
import About from "./about/About";

const AllRoutes = () => {
  return (
    <Routes>
      {/* public Routes  */}

      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/about" element={<About />} />

      {/* Private Routes  */}

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/income"
        element={
          <PrivateRoute>
            <Income />
          </PrivateRoute>
        }
      />
      <Route
        path="/expenses"
        element={
          <PrivateRoute>
            <Expenses />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />
      <Route
        path="/savings"
        element={
          <PrivateRoute>
            <Savings />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
