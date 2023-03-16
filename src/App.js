import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import {useContext} from 'react'
import AuthContext from './store/authContext'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import Header from './components/PermanentLayout/Header'

function App() {
  // const {token} = useContext(AuthContext)

  return (
    <div>
      <Header />
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<HomeScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Routes>
    </div>
  );
}

export default App;
