import React from 'react'

const Footer = () => {
  return (
    <footer className='relative left-0 bottom-0 h-20 w-screen bg-red text-white text-xs flex flex-row items-center justify-around'>
        <p>&#169; 2023 VEER. All Rights Reserved.</p>
        <div className='flex flex-col gap-2'>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
        </div>
    </footer>
  )
}

export default Footer