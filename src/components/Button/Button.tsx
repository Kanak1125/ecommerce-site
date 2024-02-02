import React from 'react'
import './button.scss';

const Button = (props: {
    handleBtnClick: () => void;
}) => {
    const {handleBtnClick} = props;
  return (
    <button 
        type="submit" 
        value={"Next"} 
        className='btn next-btn'
        onClick={handleBtnClick}
    >Next</button>
    // <input 
    //     type="submit" 
    //     value={"Next"} 
    //     className='btn next-btn'
    // />
  )
}

export default Button