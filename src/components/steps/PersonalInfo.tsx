import React from 'react'
import Button from '../Button/Button';

const PersonalInfo = ( props: {
    // schema: Schema;
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
  // define schema for validation here...
  const {register, errors, currentStep, steps, incrementStep, isValid, isSubmitting } = props;
  // console.log(errors?.fullName);
  return (
    <>
        <h2 className='subheading'>Personal Information</h2>
        <label htmlFor="fullName" className='label'>Full Name: </label>
        <input 
            type="text"
            {...register("fullName", {
              required: "Name is required",
            })}
            id="fullName" 
            className='input-fields'
        />
        {errors.fullName?.message && <p className="text-red-400 text-sm my-1">{errors.fullName?.message}</p>}
        <label htmlFor="address" className='label'>Address: </label>
        <input 
            type="text"
            {...register("address", {
              required: "Address is required"
            })}
            id="address" 
            className='input-fields'
        />
        <p className="text-red-400 text-sm my-1">{errors.address?.message}</p>
        
        <div className="btns-container">
            <Button 
            text={currentStep == steps.length ? 'Finish' : 'Next'}
            handleBtnClick= {incrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            />
            {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
        </div>
    </>
  )
}

export default PersonalInfo