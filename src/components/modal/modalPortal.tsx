import React from "react";
import reactDom from "react-dom";

const ModalPortal: React.FC = ({ children }) => {
  const el = document.getElementById("modal");
  if (!el) {
    alert("새창을 띄울수 없습니다.");
    return <></>;
  }
  return reactDom.createPortal(children, el);
};

export default ModalPortal;
