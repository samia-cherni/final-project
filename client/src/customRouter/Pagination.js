import React from 'react';
import {useParams} from 'react-router-dom';
import NotFound from '../Components/NotFound';
import { useSelector } from 'react-redux';




const generatePage =(pageName)=>{
    const component = () => require(`../Pages/${pageName}`).default;
    try {
        return React.createElement(component())
    } catch (error) {
        return <NotFound/>
    }
}

const Pagination = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let pageName = "";

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};
export default Pagination;
