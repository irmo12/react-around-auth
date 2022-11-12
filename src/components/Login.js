import React, { useState } from "react";
import { Link, withRouter } from 'react-router-dom';
import api from "../utils/api";

function Login({handleSubmit}) {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

 { 
    return (
      <div className="login">
        <h1 className="login__welcome">
          Welcome back!
        </h1>
        <form onSubmit={handleSubmit} className="login__form">
          <input required id="email" name="email" type="text" value={email} onChange={e=>setEmail(e.target.value)} />
          <input required id="password" name="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="login__button-container">
            <button type="submit" className="login__link">Log in</button>
          </div>
        </form>
        <div className="login__signup">
          <Link to="/register" className="signup__link">Not a member yet? Sign up here!</Link>
        </div>
      </div>
    );
  }
}

export default Login;