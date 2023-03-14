import './App.css';
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import AuthScreen from './screens/AuthScreen'
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext} from 'react'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/auth' element={<AuthScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
    </div>
  );
}

export default App;
