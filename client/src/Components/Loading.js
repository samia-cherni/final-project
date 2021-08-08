import React from 'react';

const Loading = () => {
    return (
      <>
        <div className="loading-container loading">
          <svg width="200" height="200" viewBox="15 20 70 70">
            <polygon
              points="63,57.5 50,65 37,57 37,42.5 50,35 63,42.5"
              fill="none"
              strokeWidth="3"
              stroke="darkgray"
            />
            <text fill="#fff" x="33" y="80">Loading</text>
          </svg>
        </div>
      </>
    );
}

export default Loading
