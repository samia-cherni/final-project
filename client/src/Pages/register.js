import React,{useState,useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import {Link} from 'react-router-dom'
import { register } from '../actions/auth';
const Register = () => {
    const {auth,alert} = useSelector(state=>state);
    console.log({ auth, alert });
    const history=useHistory();
    useEffect(() => {
      if (auth.token) history.push("/");
    }, [auth.token, history]);
    const initialState = { firstName:"", lastName:"", email: "", password: "",confirmPassword:"" };
    const [registerData, setRegisterData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = (e) => {e.preventDefault();
      setShowPassword(!showPassword);}
    const { firstName, lastName, email, password, confirmPassword } =
      registerData;
    const dispatch = useDispatch();
    const handlechange = (e) => {
      const { name, value } = e.target;
      setRegisterData({ ...registerData, [name]: value });
    };
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(register(registerData));
    };
    return (
      <div>
        <div className="container my-3 ">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form className="login-form">
                <div className="auth-icon">
                  <HiUserCircle size="3em" />
                  <h5>Sign Up</h5>
                </div>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="form-control"
                    value={firstName}
                    id="firstName"
                    name="firstName"
                    onChange={(e) => handlechange(e)}
                  />
                  <span className="form-text text-danger">
                    {alert.firstName ? alert.firstName : ""}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    id="lastName"
                    name="lastName"
                    onChange={(e) => handlechange(e)}
                  />
                  <span className="form-text text-danger">
                    {alert.lastName ? alert.lastName : ""}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    name="email"
                    id="email"
                    onChange={(e) => handlechange(e)}
                  />
                  {alert.email ? (
                    <span className="form-text text-danger">{alert.email}</span>
                  ) : (
                    <span className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </span>
                  )}
                </div>
                <div className="row">
                  <div className="col-sm-9">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        name="password"
                        id="password"
                        onChange={(e) => handlechange(e)}
                      />
                      <span className="form-text text-danger">
                        {alert.password ? alert.password : ""}
                      </span>
                    </div>
                  </div>
                  <div className="col">
                    <div className="m-3">
                      <button
                        className="btn btn-light my-3"
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                    onChange={(e) => handlechange(e)}
                  />
                  <span className="form-text text-danger">
                    {alert.confirmPassword ? alert.confirmPassword : ""}
                  </span>
                </div>
                <div className="d-grid my-2">
                  <button
                    className="btn btn-default"
                    style={{ color: "white", background: "mediumpurple" }}
                    onClick={handleSubmit}
                    size="lg"
                    block="true"
                  >
                    Sign Up
                  </button>
                  <span className="form-text text-secondary">
                    Already have an account?{" "}
                    <Link to="/" style={{ color: "mediumpurple" }}>
                      Sign In here
                    </Link>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register
