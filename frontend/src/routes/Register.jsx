import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
       setLoading(true)
      const response = await axios.post('https://sore-pink-cockroach-hat.cyclic.app/user/register', { name, email, password });
         setLoading(false)
         alert("User register successfully")
         navigate("/login")
    } catch (err) {
      if(err.response && err.response.status===401)
       {
        alert("User is already register")
        setLoading(false)
       }
      console.log(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white shadow-md rounded-[1rem] px-8 pt-6 pb-8 mb-4 mt-12 w-[30%]">
      <h2 className="text-3xl font-bold underline mb-8">Register</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">Name</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">Email</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">Password</label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
            loading ? "cursor-not-allowed opacity-25" : ""
          }`} type="submit" disabled={loading} >{loading?"Loading...":"Register"}</button>
      </form>
    </div>
  );
};

export default Register;
