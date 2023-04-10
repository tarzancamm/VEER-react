import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { RxCross2 } from "react-icons/rx";
import Swal from 'sweetalert2'
import axios from "axios";
import AuthContext from "../../store/authContext";
import Button from "./Button"

// Props recieved from app.js
const AdventureModal = ({ modalState, closeModal }) => {
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("0")
  const [description, setDescription] = useState("")
  const [coordinates, setCoordinates] = useState("")
  const authCtx = useContext(AuthContext)

  const adventureHandler = (e) => {
      e.preventDefault()

      let body = {
        title,
        cost,
        description,
        coordinates,
        userId: authCtx.userId
      }

      axios
        .post('/add-adventure', body, {
          headers: {
            authorization: authCtx.token
        }
        })
        .then(() => {
          console.log("Adventure successfully added")
          setTitle("")
          setCost("0")
          setDescription("")
          setCoordinates("")
          closeModal()
          Swal.fire({
            icon: "success",
            iconColor: "#EE291B",
            color: "#0E181B",
            title: "Adventure Submitted",
            padding: "2rem 2rem 5rem 2rem",
            showConfirmButton: false,
            timer: "2000",
            timerProgressBar: true,
          });
        })
        .catch((err) => {
          if (err.response) {
            // Client received error in response
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.request) { 
            // Client never received response
            console.log(err.request)
        } else { 
            // Anything else
            console.log('error', err.message)
        }
        })
  };

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
            <h3 className="font-semibold text-lg">What Makes For A Good Adventure?</h3>
            <div className="flex flex-row justify-between mx-2">
              <ul className="text-xs mt-2 list-disc ml-4">
                <li className="mb-1">Little Known</li>
                <li>Off The Wall</li>
              </ul>
              <ul className="text-xs mt-2 list-disc ml-4">
                <li className="mb-1">Memorable</li>
                <li>Novel</li>
              </ul>
              <ul className="text-xs mt-2 list-disc ml-4">
                <li className="mb-1">Fun/Interesting</li>
              </ul>
            </div>
          </div>
        </div>
        <form onSubmit={adventureHandler}>
          <div className="flex flex-col mt-10 pt-10 border-t border-solid border-green">
            <label htmlFor="adventure title">Adventure Title</label>
            <input type="text" className="h-10 mt-2 pl-2 focus:outline-none" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="adventure cost">Cost</label>
            <input type="range" min="0" max="50" step="10" value={cost} list="values" className="h-10 pl-2 text-red accent-red focus:outline-none" onChange={(e) => setCost(e.target.value)} />
            <datalist id="values" className="flex justify-between text-xs">
              <option value="0" label="Free"></option>
              <option value="10" label="$10"></option>
              <option value="20" label="$20"></option>
              <option value="30" label="$30"></option>
              <option value="40" label="$40"></option>
              <option value="50" label="$50+"></option>
            </datalist>
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="adventure description">Description</label>
            <textarea
              type="text"
              className="h-24 mt-2 px-2 py-2 resize-none leading-5 text-sm focus:outline-none"
              placeholder="Tell us about the adventure. 500 character limit..."
              maxLength={500}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="flex flex-col mt-6">
            <label htmlFor="adventure location">
              Coordinates (location)
            </label>
            <input type="text" className="h-10 mt-2 pl-2 focus:outline-none" value={coordinates} onChange={(e) => setCoordinates(e.target.value)} />
          </div>
          <div className="flex justify-center mt-12">
            <Button buttonText="Submit" />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AdventureModal;
