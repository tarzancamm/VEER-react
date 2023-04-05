import React, { useEffect } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

// Props recieved from app.js
const AdventureModal = ({ modalState, closeModal }) => {
  const adventureHandler = () => {};

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
        <div className="mt-10 flex flex-row justify-around">
          <div>
            <h3 className="font-semibold">What Makes For A Good Adventure?</h3>
            <div className="flex flex-row justify-between">
              <ul className="text-xs mt-2 list-disc ml-4">
                <li>Little Known</li>
                <li>Off The Wall</li>
              </ul>
              <ul className="text-xs mt-2 list-disc ml-4">
                <li>Novel</li>
                <li>Legal</li>
              </ul>
              <ul className="text-xs mt-2 list-disc ml-4">
                <li>Fun/Interesting</li>
                <li>Memorable</li>
              </ul>
            </div>
          </div>
        </div>
        <form onSubmit={adventureHandler}>
          <div className="flex flex-col mt-10">
            <label htmlFor="adventure name">Adventure Title</label>
            <input type="text" className="h-10 mt-2 pl-2 focus:outline-none" />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="adventure cost">Adventure Cost</label>
            <input type="text" className="h-10 mt-2 pl-2 focus:outline-none" />
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="adventure description">Adventure Description</label>
            <textarea
              type="text"
              className="h-24 mt-2 px-2 py-2 resize-none leading-5 focus:outline-none"
              maxLength={500}
            ></textarea>
          </div>
          <div className="flex flex-col mt-4">
            <label htmlFor="adventure location">
              Adventure Coordinates (location)
            </label>
            <input type="text" className="h-10 mt-2 pl-2 focus:outline-none" />
          </div>
          <div className="flex justify-center mt-10">
            <button className="text-white font-semibold bg-red w-28 h-10 rounded-3xl">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AdventureModal;
