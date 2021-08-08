import React from 'react'


const Popup = ({ msg, handleShow, variant }) => {
  return (
    <div
      className="position-fixed"
      style={{ top: "1%", right: "2%", minWidth: "10%", zIndex: 22 }}
    >
      <div
        className={`alert alert-dismissible fade show ${variant}`}
        role="alert"
      >
        <div>
          <h4 className="alert-heading">{msg.title}</h4>
          <button
            className="ml-5 mb-1 btn-close"
            data-bs-dismiss="alert"
            style={{ float: "right", color: "grey" }}
            onClick={handleShow}
          ></button>
        </div>
        <p>{msg.body}</p>
      </div>
    </div>
  );
};

export default Popup
