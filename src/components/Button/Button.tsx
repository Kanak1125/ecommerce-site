import React from 'react'
import './button.scss';

const Button = (props: {
    text: string;
    handleBtnClick: React.MouseEventHandler<HTMLButtonElement>;
    isValid: boolean;
    isSubmitting: boolean;
}) => {
    const {text, handleBtnClick, isSubmitting} = props;

    return (
    <button 
        type="submit" 
        value={text} 
        className={`btn ${text == 'Next' && 'next-btn'}`}
        onClick={(e) => handleBtnClick(e)}
        disabled={text === 'Finish' && isSubmitting}
    >{ text }</button>
  )
}

export default Button