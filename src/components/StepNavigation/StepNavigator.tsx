// this component is not currently in use...

import React from 'react'
import Button from '../Button/Button';

const StepNavigator = ( props : {
    steps: string[];
    currentStep: number;
    incrementStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
    decrementStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isValid: boolean;
    isSubmitting: boolean;
}) => {

    const {steps, currentStep, incrementStep, decrementStep, isValid, isSubmitting } = props;
  return (
    <div className="btns-container">
        {currentStep !==1 &&    
          <Button 
          text="Back"
          handleBtnClick= {decrementStep}
          isValid={isValid}  // for backing the form we don't need to validate it...
          isSubmitting={isSubmitting}
          />
        }
        <Button 
        text={currentStep == steps.length ? 'Finish' : 'Next'}
        handleBtnClick= {incrementStep}
        isValid={isValid}
        isSubmitting={isSubmitting}
        />
        {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
    </div>
  )
}

export default StepNavigator