import React, {useState, useContext} from 'react'
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import LoginModal from './components/PermanentLayout/LoginModal';
import AdventureModal from './components/PermanentLayout/AdventureModal';
import AuthContext from './store/authContext';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [adventureModalOpen, setAdventureModalOpen] = useState(false)
  const {token} = useContext(AuthContext)

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function openAdventureModal() {
    setAdventureModalOpen(true)
  }

  function closeAdventureModal() {
    setAdventureModalOpen(false)
  }

  return (
    <div className={modalIsOpen ? 'font-default text-black overflow-hidden' : 'font-default text-black'}>
      {modalIsOpen && <LoginModal modalState={modalIsOpen} closeModal={closeModal} />}
      {adventureModalOpen && <AdventureModal modalState={adventureModalOpen} closeModal={closeAdventureModal} />}
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<HomeScreen openModal={openModal} />} />
        <Route path='/profile' element={token ? <ProfileScreen openModal={openModal} openAdventureModal={openAdventureModal} /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
