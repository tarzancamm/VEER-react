import './App.css';
import {Routes, Route, Navigate} from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen';
import Header from './components/PermanentLayout/Header';

function App() {
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
