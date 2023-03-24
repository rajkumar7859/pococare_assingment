import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/user/login", {
        email,
        password,
      });
      // If the registration is successful, log the user in
      localStorage.setItem("accessToken", response.data.accessToken);
      console.log(response.data.accessToken);
      alert("User login successfully")
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Invalid email and password");
      }
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md pb-8 mb-4 mt-16 w-[30%]">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="border border-gray-400 p-2 w-full rounded-lg"
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </form>
   
    </div>
  );
};

export default Login;
