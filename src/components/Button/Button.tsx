import React from 'react'
import './button.scss';

const Button = (props: {
    text: string;
    handleBtnClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    const {text, handleBtnClick} = props;
  return (
    <button 
        type="submit" 
        value={text} 
        className={`btn ${text == 'Next' && 'next-btn'}`}
        onClick={(e) => handleBtnClick(e)}
    >{ text }</button>
    // <input 
    //     type="submit" 
    //     value={"Next"} 
    //     className='btn next-btn'
    // />
  )
}

export default Button