import React from 'react'
import Button from '../Button/Button';

const ContactInfo = (props: {
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
    errors: any
  }) => {

    const { register, errors, currentStep, steps, incrementStep, decrementStep, isValid, isSubmitting } = props;
  return (
    <>
        <h2 className='subheading'>Contact Information</h2>
        <label htmlFor="email" className='label'>Email: </label> 
        <input 
          type="email"
          {...register("email")}
          id="email" 
          placeholder='example@mail.com'
          className='input-fields '
        />
        <p className="text-red-400 text-sm my-1">{errors.email?.message}</p>
        <label htmlFor="ph-number" className='label'>Phone: </label> 
        <input 
          type="telephone"
          {...register("phone")}
          id="ph-number" 
          className='input-fields'
        />
        <p className="text-red-400 text-sm my-1">{errors.phone?.message}</p>

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

export default ContactInfo