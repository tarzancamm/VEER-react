import React from "react";
import {GiBatMask} from 'react-icons/gi'
import {GiAirplane} from 'react-icons/gi'

const HowToVeer = () => {
  return (
    <div className='relative top-20'>
      <h1 className="mt-12 text-center font-sans font-medium text-2xl">Find Things To Do In Europe</h1>
      <div className="mt-12 flex flex-row justify-around gap-8">
        <div className="flex flex-col justify-start items-center gap-4 ml-4 text-center">
            <GiBatMask className="text-8xl" />
            <p className="-mt-6 text-sm border-2 border-solid border-red rounded-3xl bg-red text-white px-2">1</p>
            <p>Create a Free Profile</p>
            <p className="text-xs text-left">You’ll be able to save your favorite adventures and add your own for others to experience.</p>
        </div>
        <div className="flex flex-col justify-start items-center gap-4 mr-4 text-center">
            <GiAirplane className="text-8xl" />
            <p className="-mt-6 text-sm border-2 border-solid border-red rounded-full bg-red text-white px-2">2</p>
            <p>VEER Into An Adventure</p>
            <p className="text-xs text-left">Click a country on the map below to find a random adventure to go on during your next trip to Europe!</p>
        </div>
      </div>
    </div>
  );
};

export default HowToVeer;
