import React from 'react';
import { Link } from 'react-router-dom';
import { SITEMAP } from 'Shared/sitemap';


const Mainpage: React.FC = () => {
  return <>Main page<Link to={SITEMAP.PRIVATE.ADD_PERFUME}>일단 넘기는 버튼</Link></>
}

export default Mainpage