import React, { useContext, useState, useEffect, useReducer } from "react";
import {useNavigate} from 'react-router-dom'
import Modal from "react-modal";
import axios from 'axios'
import AuthContext from "../../store/authContext";
import {RxCross2} from 'react-icons/rx';
import Button from "./Button";


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
      return { value: action.payload, isValid: action.payload.length > 7 };
    case "INPUT_BLUR":
      return { value: prevState.value, isValid: prevState.value.length > 7 };
    default:
      return { value: "", isValid: false };
  }
};


// Props received from app.js
const LoginModal = ({ modalState, closeModal }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [register, setRegister] = useState(false)
  const [loginValid, setLoginValid] = useState(true)
  const [registerValid, setRegisterValid] = useState(true)
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
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

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
        authCtx.login(res.data.token, res.data.userId, res.data.exp, res.data.firstName, res.data.createdAt)
      })
      .then(() => {
        closeModal()
        navigate('/profile')
      })
      .catch((err) => {
        setRegisterValid(false)
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
        authCtx.login(res.data.token, res.data.userId, res.data.exp, res.data.firstName, res.data.createdAt)
      })
      .then(() => {
        closeModal()
        navigate('/profile')
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        setLoginValid(false)
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
      background: '#F7F1DF',
      overflow: 'auto',
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      height: '85vh',
      width: '85vw',
      fontFamily: 'Kantumruy Pro',
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
      <div>
        <button onClick={closeModal} className='text-xl absolute right-4 top-4'><RxCross2 /></button>
        <h3 className="mt-8 text-center text-xl font-bold">{register ? 'Sign Up' : "Log in"}</h3>
        <div className="mt-4 mb-12 text-center">
          {register ? <p>Already have an account? <button onClick={() => setRegister(false)} className="text-red font-semibold underline cursor-pointer" >Login</button></p> : <p>Need an account? <button onClick={() => setRegister(true)} className="text-red font-medium underline cursor-pointer">Sign Up</button></p>}
        </div>
       {!loginValid && <p className="text-xs mb-4 text-red">Incorrect email or password</p>}
       {!registerValid && <p className="text-xs mb-4 text-red">Email already in use or invalid email/password</p>}
        <form onSubmit={submitHandler} className="flex flex-col gap-6">
          {register && <div className="flex flex-col">
            <label htmlFor="First Name">First Name</label>
            <input type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-10 mt-2 pl-2 focus:outline-none" />
          </div>}
          {register && <div className="flex flex-col">
            <label htmlFor="Last Name">Last Name</label>
            <input type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-10 mt-2 pl-2 focus:outline-none" />
          </div>}
          <div className="flex flex-col">
            <label htmlFor="Email Address">Email Address</label>
            <input type="text" value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} className={emailIsValid ? "h-10 mt-2 pl-2 focus:outline-none" : "h-10 mt-2 pl-2 focus:outline-none border border-solid border-red"} />
            {!emailIsValid && <p className="text-xs italic">*Enter a valid email address</p>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="Passsord">Password</label>
            <input type="password" value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} className={passwordIsValid ? "h-10 mt-2 pl-2 focus:outline-none" : "w-72 h-10 mt-2 pl-2 focus:outline-none border border-solid border-red"} />
            {!passwordIsValid && <p className="text-xs italic">*Password must be at least 8 characters</p>}
          </div>
          <div className="flex justify-center">
            <Button buttonText={register ? 'Sign Up' : 'Login'} />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
