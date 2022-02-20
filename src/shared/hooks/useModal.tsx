import Modal from "Components/modal";
import React, { useCallback, useState } from "react";

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const controlOpenModal = useCallback((open?: boolean) => {
    if (open === undefined) {
      setIsOpen((prev) => !prev);
      return;
    }
    setIsOpen(open);
  }, []);
  return {
    isOpen,
    Modal: ({ children }: { children?: React.ReactNode }) => (
      <Modal isOpen={isOpen} controlOpenModal={controlOpenModal}>
        {children}
      </Modal>
    ),
    controlOpenModal,
  };
};

export default useModal;
