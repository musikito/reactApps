import React from 'react';
import Register from "./components/Register";
import Login from "./components/Login"

const App = () => {
  return (
    <div>
      <h1>Simple Auth</h1>
      <Register />
      <Login />
    </div>
  );
};

export default App;
