import React, { useContext, useState, useEffect, useReducer } from "react";
import {useNavigate} from 'react-router-dom'
import Modal from "react-modal";
import axios from 'axios'
import AuthContext from "../../store/authContext";
import {RxCross2} from 'react-icons/rx';


// Reducers
const emailReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.payload, isValid: action.payload.includes("@") };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.includes("@") };
    default:
      return { value: "", isValid: false };
  }
};

const passwordReducer = (prevState, action) => {
  switch (action.type) {
    case "USER_INPUT":
      return { value: action.payload, isValid: action.payload.length > 8 };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.length > 8 };
    default:
      return { value: "", isValid: false };
  }
};


// Props received from app.js
const LoginModal = ({ modalState, closeModal }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [register, setRegister] = useState(false)
  // const [loginValid, setLoginValid] = useState(true)
  // const [registerValid, setRegisterValid] = useState(true)
  const navigate = useNavigate()
  const authCtx = useContext(AuthContext)

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: true,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: true,
  });

  // Handlers for sending data to useReducer (input & validation)
  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", payload: e.target.value });
  };
  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", payload: e.target.value });
  };
  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };
  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };


  const submitHandler = (e) => {
    e.preventDefault()

    const body = {
      firstName,
      lastName,
      email: emailState.value,
      password: passwordState.value
    }


    register && axios.post('/register', body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.userId, res.data.exp)
      })
      .then(() => {
        closeModal()
        navigate('/profile')
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

    !register && axios.post('/login', body)
      .then((res) => {
        authCtx.login(res.data.token, res.data.userId, res.data.exp)
      })
      .then(() => {
        closeModal()
        navigate('/profile')
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
  }


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

  // For screenreaders. Hides other elements when modal is open.
  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])

  return (
    <Modal
      isOpen={modalState}
      onRequestClose={closeModal}
      style={modalStyles}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <div className="">
        <button onClick={closeModal} className='float-right text-2xl block'><RxCross2 /></button>
        <h3>{register ? 'Sign Up' : "Login"}</h3>
       {register ? <p>Already have an account? <button onClick={() => setRegister(false)}>Login</button></p> : <p>Need an account? <button onClick={() => setRegister(true)}>Sign Up</button></p>}
        <form onSubmit={submitHandler}>
          {register && <input type='text' placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />}
          {register && <input type='text' placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />}
          <input type="text" placeholder="Email" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
          <input type="password" placeholder="Password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
          <button>{register ? 'Sign Up' : 'Login'}</button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
