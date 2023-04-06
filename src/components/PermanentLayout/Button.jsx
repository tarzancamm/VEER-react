import React from 'react'

const Button = ({buttonText}) => {
  return (
    <button className="text-white font-semibold bg-red w-28 h-10 rounded-3xl">{buttonText}</button>
  )
}

export default Button