import React from 'react'
import Header from '../components/PermanentLayout/Header'
import HowToVeer from '../components/Home/HowToVeer'
import VeerMap from '../components/Home/VeerMap'
import Footer from '../components/PermanentLayout/Footer'

const HomeScreen = ({openModal}) => {
  return (
    <div className="relative min-h-full min-w-screen">
      <Header openModal={openModal} />
      <main>
        <HowToVeer />
        <section className='w-screen h-20 bg-green mt-36'></section>
        <VeerMap />
      </main>
      <Footer />
    </div>
  )
}

export default HomeScreen