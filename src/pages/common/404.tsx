import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FaultDirection: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return <></>;
};

export default FaultDirection;
