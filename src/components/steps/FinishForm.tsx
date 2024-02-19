import Link from 'next/link'
import React from 'react'
import Button from '../Button/Button';

const FinishForm = (props: {
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

    const { register, currentStep, steps, incrementStep, decrementStep, isValid, isSubmitting, errors } = props;
  return (
    <>
    <div className='my-6 mx-1'>
        <input type="checkbox"
        {...register("terms_and_conditions", {
          required: true,
        })}
        // {...register("checkbox")}
        name="terms-and-conditions"id="terms-and-conditions" 
        className='mr-2'
        // value={'T'}
        />
        I agree to the 
        <Link href="" className='ml-1 font-semibold underline text-accent-color'>Terms and Conditions</Link>.
    </div>
    <div className='my-6 mx-1'>
        <input type="checkbox"
        {...register("privacy_policy", {
          required: true,
        })}
        // {...register("checkbox")}
        name="privacy-policy"
        id="privacy-policy" 
        className='mr-2'
        // value={'P'}
        />
        I agree to the 
        <Link href="" className='ml-1 font-semibold underline text-accent-color'>Privacy policy</Link>.
    </div>
    <div className="errors py-1 mb-4">
        <p className="text-red-400 text-sm my-1">{errors.terms_and_conditions?.message}</p>
        <p className="text-red-400 text-sm my-1">{errors.privacy_policy?.message}</p>
    </div>

    <div className="btns-container">
      {currentStep !==1 &&    
        <Button 
        text="Back"
        align=''  // defaults to left...
        handleBtnClick= {decrementStep}
        isValid={isValid}  // for backing the form we don't need to validate it...
        isSubmitting={isSubmitting}
        />
      }
      <Button 
      text='Create'
      align='right'
      handleBtnClick= {incrementStep}
      isValid={isValid}
      isSubmitting={isSubmitting}
      />
      </div>
    </>
  )
}

export default FinishForm