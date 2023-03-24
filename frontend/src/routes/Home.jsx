import React from 'react';

const Home = ({ name, email }) => {
  return (
    <div>
      <h1>Welcome {name}</h1>
      <p>Email: {email}</p>
    </div>
  );
};

export default Home;
