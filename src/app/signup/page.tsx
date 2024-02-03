'use client'

import Stepper from '@/components/Stepper/Stepper'
import React, { useState } from 'react'
import './signup.scss';
import Button from '@/components/Button/Button';
import PersonalInfo from '@/components/steps/PersonalInfo';
import ContactInfo from '@/components/steps/ContactInfo';
import PasswordInfo from '@/components/steps/PasswordInfo';
import FinishForm from '@/components/steps/FinishForm';
import { useForm } from "react-hook-form";
import { object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const page = () => {
  // define schema for validation here...
  const schema = object().shape({
    fullName: string().required("Your name is required"),
    address: string().required("Your address is required"),
  });
  console.log(schema.fields.fullName);
  
  // integrate yup with useForm hook...
  const { register, handleSubmit, formState: {
    errors
  }} = useForm({
    resolver: yupResolver(schema),
  });
  console.log(errors);

  const steps = ['Personal', 'Contact', 'Password', 'Finish'];
  const [currentStep, setCurrentStep] = useState(1);

  const displayStep = (step: number) => {
    switch(step) {
      case 1:
        return <PersonalInfo 
          schema={schema}
          register={register}
        />
      case 2:
        return <ContactInfo />
      case 3:
        return <PasswordInfo />
      case 4:
        return <FinishForm />
      default: 
        return <PersonalInfo 
          schema={schema}
          register={register}
        />
    }
  }
    const incrementStep = (e: React.MouseEvent<HTMLButtonElement>) => {
      // e.preventDefault();
      console.log("Next...");

      if (currentStep === steps.length) return;

      setCurrentStep(prevState => prevState + 1);
      console.log(currentStep);
    }
    const decrementStep = (e: React.MouseEvent<HTMLButtonElement>) => {
      // e.preventDefault();
      console.log("Prev...");

      if (currentStep == 1) return;
        
      setCurrentStep(prevState => prevState - 1);
      console.log(currentStep);
    }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center border-2'>
        <h2 className='heading-signup mb-6'>Sign up</h2>
        <form 
          onSubmit={handleSubmit(data => console.log(data))}
          className='signup-form
          '
        >
          {/* {error && */}
            {/* <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded'>
              {error} 
            </div>*/}
          {/* } */}
          <Stepper 
            steps={ steps }
            currentStep={ currentStep }
          />
          { displayStep(currentStep) }

          <div className="btns-container">
            {currentStep !==1 &&    
              <Button 
              text="Back"
              handleBtnClick= {decrementStep}/>
            }
            <Button 
            text={currentStep == steps.length ? 'Finish' : 'Next'}
            handleBtnClick= {incrementStep}
            />
            {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
          </div>
        </form>
    </div>
  )
}

export default page