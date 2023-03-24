import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import PrivateRoute from '../privateroute/PrivateRoute';

const AllRoutes = () => {
  

  return (
    <div>
      <Navbar />
      <Routes>
       <Route path='/' element={ <PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
