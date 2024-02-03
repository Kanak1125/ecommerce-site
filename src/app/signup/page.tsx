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
import { object, string, number, boolean, ref, ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const page = () => {
  const steps = ['Personal', 'Contact', 'Password', 'Finish'];
  const [currentStep, setCurrentStep] = useState(1);

  // define schema for validation here...
  const schema_PersonalInfo = object().shape({
    fullName: string().required("Your name is required"),
    address: string().required("Your address is required"),
  });
  const schema_ContactInfo = object().shape({
    email: string().required("Please enter your email").email(),
    phone: number().required("Enter your phone number"),
  });
  const schema_PasswordInfo = object().shape({
    password: string().required("Your password is Required")
      .min(4, "Must be greater than 4")
      .max(16, "Mustn't be longer than 16"),
    confirm_password: string()
      .label('confirm password')
      .required()
      .oneOf([ref('password'), ''], 'Passwords must match'),
  });
  const schema_Agreement = object().shape({
    terms_and_conditions: boolean().required("You must agree to the terms"),
    privacy_policy: boolean().required("You must agree our privacy policy"),
  });
  
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

  const displayStep = (step: number) => {
    switch(step) {
      case 1:
        return <PersonalInfo 
          // schema={schema}
          register={register}
          errors={errors}
        />
      case 2:
        return <ContactInfo 
          register={register}
          errors={errors}
        />
      case 3:
        return <PasswordInfo 
          register={register}
          errors={errors}
        />
      case 4:
        return <FinishForm 
          register={register}
          errors={errors}
        />
      default: 
        return <PersonalInfo 
          // schema={schema}
          register={register}
          errors={errors}
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

    const onDataSubmit = (data: FieldValues) => {
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
          { displayStep(currentStep) }

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
          <pre>{JSON.stringify(watch())}</pre>
        </form>
    </div>
  )
}

export default page