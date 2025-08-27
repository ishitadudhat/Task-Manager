import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/form.css';
import { UserDataContext } from '../context/UserContext';

const Form = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  // Login States
  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');

  // Signup States
  const [name, setName] = useState('');
  const [signEmail, setSignEmail] = useState('');
  const [signPassword, setSignPassword] = useState('');

  // Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, {
        email: logEmail,
        password: logPassword,
      });

      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setLogEmail('');
        setLogPassword('');
        navigate('/tasks');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  // Signup Handler
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, {
        fullname: name,
        email: signEmail,
        password: signPassword,
      });

      if (res.status === 201) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        setName('');
        setSignEmail('');
        setSignPassword('');
        navigate('/tasks');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="section">
      <div className="container">
        <div className="row full-height justify-content-center">
          <div className="col-12 text-center align-self-center py-5">
            <div className="section pb-5 pt-5 pt-sm-2 text-center">
              <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
              <label htmlFor="reg-log"></label>

              <div className="card-3d-wrap mx-auto">
                <div className="card-3d-wrapper">

                  {/* Login Form */}
                  <div className="card-front">
                    <form onSubmit={handleLogin}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logemail"
                              className="form-style"
                              placeholder="Your Email"
                              autoComplete="off"
                              value={logEmail}
                              onChange={(e) => setLogEmail(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logpass"
                              className="form-style"
                              placeholder="Your Password"
                              autoComplete="off"
                              value={logPassword}
                              onChange={(e) => setLogPassword(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">Submit</button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">Forgot your password?</a>
                          </p>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Sign Up Form */}
                  <div className="card-back">
                    <form onSubmit={handleSignup}>
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="fullname"
                              className="form-style"
                              placeholder="Your Full Name"
                              autoComplete="off"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="email"
                              className="form-style"
                              placeholder="Your Email"
                              autoComplete="off"
                              value={signEmail}
                              onChange={(e) => setSignEmail(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="password"
                              className="form-style"
                              placeholder="Your Password"
                              autoComplete="off"
                              value={signPassword}
                              onChange={(e) => setSignPassword(e.target.value)}
                              required
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button type="submit" className="btn mt-4">Register</button>
                        </div>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
