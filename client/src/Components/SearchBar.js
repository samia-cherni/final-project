import React,{useState, useEffect} from 'react';
import {AiOutlineSearch} from 'react-icons/ai';
import { IoCloseSharp } from "react-icons/io5";
import UserPreview from "./UserPreview";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../api";
import { Link } from 'react-router-dom';
const SearchBar = () => {
     const [search, setSearch] = useState("");
     const [users, setUsers] = useState([]);
     const { auth } = useSelector((state) => state);
     const dispatch = useDispatch();
     
    const handleClose = () => {
      setSearch("");
      setUsers([]);
    };
    const handlesearch = (e) => {
      setSearch(e.target.value.toLowerCase());
    };
    useEffect(() => {
      if (search)
        getDataAPI(`search?name=${search}`, auth.token)
          .then((res) => setUsers(res.data.users))
          .catch((error) =>
            dispatch({
              type: "ALERT",
              payload: { error: error.response.data.msg },
            })
          );
    }, [search, auth.token, dispatch]);
    return (
      <form className="search">
        <div className="search-container">
          <input
            type="text"
            value={search}
            name="search"
            placeholder="search"
            onChange={handlesearch}
            autoComplete="off"
          />
          <div className="clear-search" onClick={handleClose}>
            <IoCloseSharp />
          </div>
          <div className="search-icon">
            <AiOutlineSearch />
          </div>
        </div>
        <div className="user-list">
          {users.map((user) => (
            <Link
              className="user-link"
              key={user._id}
              to={`/profile/${user._id}`}
              onClick={handleClose}
            >
              <UserPreview user={user} />
            </Link>
          ))}
        </div>
      </form>
    );
}

export default SearchBar
