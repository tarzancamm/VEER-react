import React, {useState} from 'react'
import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import LoginModal from './components/PermanentLayout/LoginModal';

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div className={modalIsOpen ? 'font-default text-black overflow-hidden' : 'font-default text-black'}>
      {modalIsOpen && <LoginModal modalState={modalIsOpen} closeModal={closeModal} />}
      <Routes>
        <Route path='*' element={<Navigate to='/' />} />
        <Route path='/' element={<HomeScreen openModal={openModal} />} />
        <Route path='/profile' element={<ProfileScreen openModal={openModal} />} />
      </Routes>
    </div>
  );
}

export default App;
