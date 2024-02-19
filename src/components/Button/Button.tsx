import React from 'react'
import './button.scss';

const Button = (props: {
    text: string;
    handleBtnClick: React.MouseEventHandler<HTMLButtonElement>;
    isValid: boolean;
    align: string;
    isSubmitting: boolean;
}) => {
    const {text, handleBtnClick, isSubmitting, align} = props;

    return (
    <button 
        type="submit" 
        value={text} 
        className={`btn ${align == 'right' && 'next-btn'}`}
        onClick={(e) => handleBtnClick(e)}
        disabled={text === 'Finish' && isSubmitting}
    >{ text }</button>
  )
}

export default Button