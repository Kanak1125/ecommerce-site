import React from 'react'
import './button.scss';

const Button = (props: {
    text: string;
    handleBtnClick: React.MouseEventHandler<HTMLButtonElement>;
    isValid: boolean;
    isSubmitting: boolean;
}) => {
    const {text, handleBtnClick, isValid, isSubmitting} = props;
  return (
    <button 
        type="submit" 
        value={text} 
        className={`btn ${text == 'Next' && 'next-btn'}`}
        onClick={(e) => handleBtnClick(e)}
        disabled={isSubmitting || !isValid}
    >{ text }</button>
    // <input 
    //     type="submit" 
    //     value={text} 
    //     className={`btn ${text == 'Next' && 'next-btn'}`}
    //     onClick={(e) => handleBtnClick(e)}
    // />
  )
}

export default Button