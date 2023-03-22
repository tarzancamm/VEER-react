import React from "react";
import Modal from "react-modal";
import {RxCross2} from 'react-icons/rx';

const LoginModal = ({ modalState, closeModal }) => {
  const modalStyles = {
    overlay: {
      zIndex: "100",
    },
    content: {
      position: 'absolute',
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: '1px',
      borderRadius: '10px',
      background: '#F8F3E4',
      overflow: 'auto',
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: '85%',
      width: '85%',
    },
  };

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={closeModal}
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
    >
      <div className="">
        <button onClick={closeModal} className='float-right text-2xl block'><RxCross2 /></button>
        <form>
          <label htmlFor=""></label>
          <input type="text" placeholder="Email" />
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
