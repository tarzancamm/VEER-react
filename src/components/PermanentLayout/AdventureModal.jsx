import React, {useEffect} from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";

// Props recieved from app.js
const AdventureModal = ({ modalState, closeModal }) => {
  const modalStyles = {
    overlay: {
      zIndex: "100",
    },
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      border: "1px",
      borderRadius: "10px",
      background: "#F7F1DF",
      overflow: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: "85vh",
      width: "85vw",
      fontFamily: "Kantumruy Pro",
    },
  };

  // For screenreaders. Hides other elements when modal is open.
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={closeModal}
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div>
        <button onClick={closeModal} className="text-xl absolute right-4 top-4">
          <RxCross2 />
        </button>
      </div>
    </Modal>
  );
};

export default AdventureModal;
