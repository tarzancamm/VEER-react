import React from 'react'
import Header from '../components/PermanentLayout/Header'
import HowToVeer from '../components/Home/HowToVeer'

const HomeScreen = ({openModal}) => {
  return (
    <div className='homescreen'>
      <Header openModal={openModal} />
      <HowToVeer />

    </div>
  )
}

export default HomeScreen