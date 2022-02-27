import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
// import { SITEMAP } from 'Shared/sitemap';

const Mainpage: React.FC = () => {
  const navgate = useNavigate();
  useEffect(() => {
    navgate("/perfume", { state: {}, replace: true });
  });
  return <></>;
  // return <>Main page<Link to={SITEMAP.PRIVATE.ADD_PERFUME}>일단 넘기는 버튼</Link></>
};

export default Mainpage;
