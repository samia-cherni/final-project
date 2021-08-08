import React from 'react';
import { useSelector } from 'react-redux';

const UserPreview = ({children, user}) => {
  const {theme}=useSelector(state=>state);
    return (
      <div className="d-flex p-2 align-items-center border preview justify-content-between">
        <div className="d-flex p-2 align-items-center">
          <img
            style={{ filter: theme ? "invert(1)" : "invert(0)" }}
            src={user.avatar}
            className="avatar"
            alt="user-avatar"
          />
          <div className="mx-2">
            <span>{user.name}</span>
          </div>
        </div>
        {children}
      </div>
    );
}

export default UserPreview
