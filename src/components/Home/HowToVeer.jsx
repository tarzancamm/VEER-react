import React from "react";
import {MdHiking} from 'react-icons/md'
import {GiAirplane} from 'react-icons/gi'

const HowToVeer = () => {
  return (
    <div className='relative top-20'>
      <h1 className="mt-12 text-center font-sans font-medium text-2xl">Find Things To Do In Utah</h1>
      <div className="mt-12 flex flex-row justify-around max-w-full">
        <div className="flex flex-col justify-start items-center gap-4 text-center w-4/5">
            <MdHiking className="text-8xl" />
            <p className="-mt-2 text-sm border-2 border-solid border-red rounded-3xl bg-red text-white px-2">1</p>
            <p>Create a Free Profile</p>
            <p className="text-xs text-center w-4/5">You’ll be able to save your favorite adventures and add your own for others to experience.</p>
        </div>
        <div className="flex flex-col justify-start items-center gap-4 text-center w-4/5">
            <GiAirplane className="text-8xl" />
            <p className="-mt-2 text-sm border-2 border-solid border-red rounded-full bg-red text-white px-2">2</p>
            <p>VEER Into An Adventure</p>
            <p className="text-xs text-center w-4/5">Click a marker on the map below to view the adventure.</p>
        </div>
      </div>
    </div>
  );
};

export default HowToVeer;
