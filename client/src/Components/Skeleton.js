import React from 'react'

const Skeleton = () => {
    return (
      <div className="position-relative my-5">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
}

export default Skeleton
