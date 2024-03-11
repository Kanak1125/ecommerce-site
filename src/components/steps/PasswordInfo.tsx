import React from 'react'
import Button from '../Button/Button';

const PasswordInfo = (props: {
    steps: {
      name: string,
      fields?: string[],
    }[];
    currentStep: number;
    incrementStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
    decrementStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
    isValid: boolean;
    isSubmitting: boolean;
    register: any;  // this needs to be considered...
    // shouldSubmit: boolean
    errors: any
  }) => {

    const { register, errors, currentStep, steps, incrementStep, decrementStep, isValid, isSubmitting } = props;
  return (
    <>
        <h2 className='subheading'>Setup your Password</h2>
        <label htmlFor="password" className='label'>Password: </label> 
        <input 
          type="password"
          {...register("password")}
          id="password" 
          className='input-fields '
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.password?.message}</p>
        <label htmlFor="confirm-password" className='label'>Confirm password: </label> 
        <input 
          type="password"
          {...register("confirm_password")}
          id="confirm-password" 
          className='input-fields '
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.confirm_password?.message}</p>
    
        <div className="btns-container">
            {currentStep !==1 &&    
              <Button 
              text="Back"
              align=''
              handleBtnClick= {decrementStep}
              isValid={isValid}  // for backing the form we don't need to validate it...
              isSubmitting={isSubmitting}
              />
            }
            <Button 
            text={currentStep == steps.length ? 'Finish' : 'Next'}
            align='right'
            handleBtnClick= {incrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            />
          </div>
    </>
  )
}

export default PasswordInfo