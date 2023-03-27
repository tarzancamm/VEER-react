import React from 'react'
import Header from '../components/PermanentLayout/Header'
import HowToVeer from '../components/Home/HowToVeer'
import VeerMap from '../components/Home/VeerMap'
import Footer from '../components/PermanentLayout/Footer'

const HomeScreen = ({openModal}) => {
  return (
    <div className="h-auto">
      <Header openModal={openModal} />
      <HowToVeer />
      <div className='w-screen h-20 bg-green mt-36'></div>
      <VeerMap />
      <Footer />
    </div>
  )
}

export default HomeScreen