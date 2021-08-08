import React from 'react'
import {AiOutlinePlus} from 'react-icons/ai'

const LoadMore = ({ result, page, load, handleLoadMore }) => {
  return (
    <div className="load-more">
      {result < 3 * (page - 1)
        ? ""
        : !load && (
            <button className="btn btn-dark d-block mx-auto" onClick={handleLoadMore}><AiOutlinePlus/></button>
          )}
    </div>
  );
};

export default LoadMore
