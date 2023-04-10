import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Footer = () => {
  const MySwal = withReactContent(Swal)

  const creditsHandler = () => {
    MySwal.fire({
      color: "#0E181B",
      html: <a href="https://www.flaticon.com/free-icons/hot-air-balloon" title="hot air balloon icons" target="_blank" rel="noreferrer noopener">Hot air balloon icons created by Muhammad_Usman - Flaticon</a>,
      padding: "2rem 2rem 3rem 2rem",
      showConfirmButton: false,
    });
  }

  return (
    <footer className='relative left-0 bottom-0 h-20 w-screen bg-red text-white text-xs flex flex-row items-center justify-around'>
        <p>&#169; 2023 VEER. All Rights Reserved.</p>
        <div className='flex flex-col gap-1'>
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
            <button className='mr-20' onClick={creditsHandler}>Credits</button>
        </div>
    </footer>
  )
}

export default Footer