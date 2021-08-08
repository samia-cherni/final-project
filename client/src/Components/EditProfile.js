import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {updateUserProfile} from '../actions/profile';
import { IoCloseSharp } from "react-icons/io5";

const EditProfile = ({ user, setEdit }) => {
  const initState = {
    name:"",
    email: "",
    about: "",
    gender: "",
    avatar: "",
  };
  const [updateData, setUpdateData] = useState(initState);
  const { name, email, about, gender, avatar } = updateData;
  const { auth } = useSelector((state) => state);
  useEffect(() => {
   setUpdateData(user);
  }, [user])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({updateData,auth}));
  };
  return (
    <div className="edit-profile">
      <button className="edit-btn-close" onClick={() => setEdit(false)}>
        <IoCloseSharp className="edit-profile-icon" />
      </button>
      <form>
        <h5>Edit your profile</h5>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="form-control"
            id="name"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            className="form-control"
            id="email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="avatar" className="form-label">
            Avatar
          </label>
          <input
            type="text"
            name="avatar"
            value={avatar}
            className="form-control"
            id="avatar"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <select
            className="form-select"
            name="gender"
            id="gender"
            value={gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="About">About</label>
          <textarea
            className="form-control mb-3"
            placeholder="About me..."
            id="About"
            cols="30"
            rows="4"
            name="about"
            value={about}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="edit-profile-submit d-block w-100"
          onClick={handleSubmit}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
