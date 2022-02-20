import React, { useEffect } from "react";
import styled from "styled-components";
import ModalPortal from "./modalPortal";
interface Props {
  isOpen: boolean;
  controlOpenModal: (open?: boolean) => void;
}
const Modal: React.FC<Props> = ({ children, controlOpenModal, isOpen }) => {
  useEffect(() => {
    const handleWheelPrevent = (e: WheelEvent) => {
      e.preventDefault();
    };
    window.addEventListener("wheel", handleWheelPrevent, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheelPrevent);
    };
  }, []);
  return (
    <ModalPortal>
      {isOpen && (
        <ModalComponent>
          <Dim onClick={() => controlOpenModal(false)} />
          <Content>{children}</Content>
        </ModalComponent>
      )}
    </ModalPortal>
  );
};

export default Modal;

const ModalComponent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 200;
`;
const Dim = styled.section`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;
const Content = styled.div`
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  min-height: 100px;
  min-width: 100px;
`;
