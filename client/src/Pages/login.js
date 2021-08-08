import React, { useState,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import {useDispatch,useSelector} from 'react-redux';
import {login} from '../actions/auth';
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
const Login = () => {
  const initialState = { email: "", password: "" };
  const [loginData, setLoginData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);}
  const {email,password} = loginData;
  const dispatch = useDispatch();
  const handlechange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const { auth } = useSelector((state) => state);
  const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData));
  };
  useEffect(() => {
    if (auth.token) history.push("/");
  }, [auth.token, history]);
  return (
    <div className="container my-3 ">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form className="login-form">
            <div className="auth-icon">
              <HiUserCircle size="3em" />
              <h5>Sign In</h5>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={(e) => handlechange(e)}
              />
            </div>
            <div className="row">
              <div className="col-sm-9">
                <div className="mb-3">
                  <label htmlFor="password">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    id="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => handlechange(e)}
                  />
                </div>
              </div>
              <div className="col">
                <div className="m-3">
                  <button
                    className="btn btn-light my-2"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="d-grid my-2">
              <button
                className="btn btn-default"
                style={{ color: "white", background: "mediumpurple" }}
                onClick={handleSubmit}
                size="lg"
                block="true"
              >
                Sign In
              </button>
              <span className="form-text">
                Don't have an account?{" "}
                <Link to="/register" style={{ color: "mediumpurple" }}>
                  Sign Up here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
