'use client'

import Stepper from '@/components/Stepper/Stepper'
import React, { useState } from 'react'
import './signup.scss';
import Button from '@/components/Button/Button';
import PersonalInfo from '@/components/steps/PersonalInfo';
import ContactInfo from '@/components/steps/ContactInfo';
import PasswordInfo from '@/components/steps/PasswordInfo';
import FinishForm from '@/components/steps/FinishForm';
import { FieldValues, useForm } from "react-hook-form";
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_PersonalInfo, schema_ContactInfo, schema_PasswordInfo, schema_Agreement } from '@/schema/schema_signup';

// need to work out on the back button of the signup page...
// FIX: validation errors...

const page = () => {
  const steps = ['Personal', 'Contact', 'Password', 'Finish'];
  const [currentStep, setCurrentStep] = useState(1);
  
  let currentSchema: ObjectSchema<FieldValues, any, any, any>;
  switch (currentStep) {
    case 1:
      currentSchema = schema_PersonalInfo;
      break;
    case 2: 
      currentSchema = schema_ContactInfo;
      break;
    case 3:
      currentSchema = schema_PasswordInfo;
      break;
    case 4:
      currentSchema = schema_Agreement;
      break;
    default: 
      currentSchema = schema_PersonalInfo;
      break;
  }
  // integrate yup with useForm hook...
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors,
      isValid,
      isSubmitting, 
    },
    watch,
  } = useForm({
    resolver: yupResolver(currentSchema),
    mode: "all",
  });

  console.log(errors);

  // const displayStep = (step: number) => {
  //   switch(step) {
  //     case 1:
  //       return <PersonalInfo 
  //         // schema={schema}
  //         register={register}
  //         errors={errors}
  //       />
  //     case 2:
  //       return <ContactInfo 
  //         register={register}
  //         errors={errors}
  //       />
  //     case 3:
  //       return <PasswordInfo 
  //         register={register}
  //         errors={errors}
  //       />
  //     case 4:
  //       return <FinishForm 
  //         register={register}
  //         errors={errors}
  //       />
  //     default: 
  //       return <PersonalInfo 
  //         // schema={schema}
  //         register={register}
  //         errors={errors}
  //       />
  //   }
  // }
  
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

  const onDataSubmit = (data: FieldValues) => {
    // data submission to the server takes place here...
    console.log(data);
  };

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h2 className='heading-signup mb-6'>Sign up</h2>
        <form 
          onSubmit={handleSubmit(onDataSubmit)}
          className='signup-form break-all break-words
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
          {/* { displayStep(currentStep) } */}
          {currentStep === 1 && <PersonalInfo register={register} errors={errors}/>}
          {currentStep === 2 && <ContactInfo register={register} errors={errors}/>}
          {currentStep === 3 && <PasswordInfo register={register} errors={errors}/>}
          {currentStep === 4 && <FinishForm register={register} errors={errors}/>}

          <div className="btns-container">
            {currentStep !==1 &&    
              <Button 
              text="Back"
              handleBtnClick= {decrementStep}
              isValid={isValid}
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
          {/* <pre>{JSON.stringify(watch())}</pre> */}
        </form>
    </div>
  )
}

export default page