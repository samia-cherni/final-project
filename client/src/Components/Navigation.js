import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillHome,
} from "react-icons/ai";
import { IoCompass } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import SearchBar from "./SearchBar";


const Navigation = () => {
  const { auth,theme} = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <div className="head">
      <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-around align-middle">
        <div className="custom-text-nav">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => window.scrollTo({ top: 0 })}
          >
            {theme ? (
              <img
                src="/brand-dark.png"
                alt="brand-img"
                width="70px"
                height="60px"
                style={{ filter: "invert(1)"}}
              />
            ) : (
              <img
                src="/brand-light.png"
                alt="brand-img"
                width="70px"
                height="60px"
              />
            )}
          </Link>
        </div>
        <SearchBar />
        <div className="menu">
          <ul className="navbar-nav flex-row position-relative">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/">
                <AiFillHome size="1.5rem" className="navigation-icon" />
              </Link>
            </li>
            <li className="nav-item mx-1">
              <Link className="nav-link" to="/discover">
                <IoCompass size="1.5rem" className="navigation-icon" />
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="/"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={auth.user.avatar}
                  className="avatar"
                  alt="user-avatar"
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link
                    className="dropdown-item"
                    to={`/profile/${auth.user._id}`}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <label
                    htmlFor="theme"
                    className="dropdown-item"
                    onClick={() => dispatch({ type: "THEME", payload: !theme })}
                  >
                    {theme ? "Light Mode" : "Dark Mode"}
                  </label>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={() => dispatch(logout())}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
