import {createContext, useState, useEffect, useCallback} from 'react'

// Functions and variables used by AuthContextProvider
const defaultValues = {
    userId: null,
    token: "",
    firstName: "",
    createdAt: "",
    login: () => {},
    logout: () => {}
}

let logoutTimer;
let AuthContext;

// Finds remaining time till expiration of localStorage login data
const calculateRemainingTime = (exp) => {
    const currentTime = new Date().getTime(); //Current time in milliseconds since Jan 1, 1970
    const expTime = exp;
    const remainingTime = expTime - currentTime;
    return remainingTime;
  };
  
  // Returns local data in an object
  const getLocalData = () => {
    const localToken = localStorage.getItem("token");
    const localUserId = localStorage.getItem("userId");
    const localExp = localStorage.getItem("exp");
    const localFirstName = localStorage.getItem('firstName');
    const localCreatedAt = localStorage.getItem('createdAt');
  
    const remainingExpTime = calculateRemainingTime(localExp);
  
    //Set to one hour
    if (remainingExpTime <= 6000) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("exp");
      localStorage.removeItem("firstName");
      localStorage.removeItem("createdAt");
      return null;
    }
  
    return {
      token: localToken,
      userId: +localUserId,
      firstname: localFirstName,
      duration: remainingExpTime,
      createdAt: localCreatedAt,
    };
  };

// Imported by components. Holds default context values. Components connect to authContext through this, but do NOT access these default object values. Components access values inside of "value" prop of AuthContextProvider.
export default AuthContext = createContext(defaultValues)

// Imported by index.js. Used as a wrapper so components have access to context.
export const AuthContextProvider = (props) => {

    const localData = getLocalData();

    let initialToken;
    let initialId;
    let initialFirstName;
    let initialCreatedAt;
  
    if (localData) {
      initialToken = localData.token;
      initialId = localData.userId;
      initialFirstName = localData.firstname;
      initialCreatedAt = localData.createdAt;
    }
  
    //Set initial state to initial Local Data
    const [token, setToken] = useState(initialToken);
    const [userId, setUserId] = useState(initialId);
    const [firstName, setFirstName] = useState(initialFirstName);
    const [createdAt, setCreatedAt] = useState(initialCreatedAt)
  
    //Login and logout functionality (sets or clears localStorage data)
    const logoutHandler = useCallback(() => {
      setToken(null);
      setUserId(null);
      setFirstName(null);
      setCreatedAt(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("exp");
      localStorage.removeItem("firstName");
      localStorage.removeItem("createdAt");
  
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }, []);
  
    const loginHandler = (token, userId, exp, firstName, createdAt) => {
        console.log(createdAt)
      setToken(token);
      setUserId(userId);
      setFirstName(firstName);
      setCreatedAt(createdAt)
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("exp", exp);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("createdAt", createdAt);
  
      const remainingExpTime = calculateRemainingTime(exp);
  
      logoutTimer = setTimeout(logoutHandler, remainingExpTime); //Runs logout function after delay (remainingExpTime)
    };
  
    // Any time localData changes or logoutHandler runs, logoutHandler is run after remainingExp duration
    useEffect(() => {
      if (localData) {
        logoutTimer = setTimeout(logoutHandler, localData.duration);
      }
    }, [localData, logoutHandler]);

 // Holds values to be used by components connected to auth context
    const contextValue = {
        userId: userId,
        token: token,
        firstName: firstName,
        createdAt: createdAt,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}