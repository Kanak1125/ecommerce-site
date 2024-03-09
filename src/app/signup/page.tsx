'use client'

import Stepper from '@/components/Stepper/Stepper'
import React, { useEffect, useState } from 'react'
import './signup.scss';
import PersonalInfo from '@/components/steps/PersonalInfo';
import ContactInfo from '@/components/steps/ContactInfo';
import PasswordInfo from '@/components/steps/PasswordInfo';
import FinishForm from '@/components/steps/FinishForm';
import { FieldValues, useForm } from "react-hook-form";
import { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema_PersonalInfo, schema_ContactInfo, schema_PasswordInfo, schema_Agreement } from '@/schema/schema_signup';
import CenteredContainer from '@/components/CenteredContainer';
import Link from 'next/link';

import signUp from '@/services/firebase/auth/signup';
import { useRouter } from 'next/navigation';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoute';
import { updateProfile } from 'firebase/auth';
import { collection, query, doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';

// Need: To include agreements to validation as well...

const page = () => {
  const steps = [{
    name: 'Personal',
    fields: ['fullName', 'address']
  },
  {
    name: 'Contact',
    fields: ['email', 'phone']
  },
  {
    name: 'Password',
    fields: ['password', 'confirm_password']
  },
  {
    name: 'Finish',
    // problem with the following validation...
    fields: ['terms_and_conditions', 'privacy_policy'],
  }];

  const [error, setError] = useState("");
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1);
  const [currentSchema, setCurrentSchema] = useState<ObjectSchema<FieldValues, any, any, any>>(schema_PersonalInfo);
  
  const getCurrentSchema = () => {
    switch (currentStep) {
    case 1:
      return schema_PersonalInfo;
    case 2: 
      return schema_ContactInfo;
    case 3:
      return schema_PasswordInfo;
    // case 4:
    //   return schema_Agreement;
    default: 
      return schema_PersonalInfo;
    }
  }

  useEffect(() => {
    setCurrentSchema(getCurrentSchema())
  }, [currentStep]);

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
    trigger,
    reset,
  } = useForm({
    // defaultValues: {
    //   fullName: "",
    //   address: "",
    //   email: "",
    //   phone: "",
    //   password: "",
    //   confirm_password: "",
    // },
    resolver: yupResolver(currentSchema),
    mode: "onBlur" || "onSubmit",
  });

  console.log(errors);
  
  const incrementStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const fields = steps[currentStep - 1].fields;
    const output = await trigger(fields, {
      shouldFocus: true,
    })

    // if (!output || (currentStep === steps.length)) return;
    if (!output) return;

    if (currentStep === steps.length) {
      await handleSubmit(onDataSubmit)();
      reset();
    }

    setCurrentStep(prevState => prevState + 1);
  }

  const decrementStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (currentStep == 1) return;
    setCurrentStep(prevState => prevState - 1);
  }

  const onDataSubmit = async (data: FieldValues) => {
    // data submission to the server takes place here...
    console.log(data);
    console.log("Submitted...");

    const { result, err } = await signUp(data.email, data.password);

    // const addToDB = async () => {
    //   const docRef = doc(db, 'user', data?.email);
    //   await setDoc(docRef, {
    //     ...data,
    //     id: result?.user.uid,
    //   })
    // }

    if (err) {
      setError("Sign up failed!");
    } else {
      console.log(data);
      // addToDB();
      console.log("Signup successful...");
      // if (result) {
      //     await updateProfile(result.user, {
      //     displayName: data.fullName
      //   });
      // }
      return router.push('/');
    }
  };

  return (
    <ProtectedPublicRoute>
      <CenteredContainer>
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

            {currentStep === 1 && <PersonalInfo 
            steps={steps}
            currentStep={currentStep}
            register={register}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            errors={errors}/>}
            {currentStep === 2 && <ContactInfo 
            steps={steps}
            currentStep={currentStep}
            register={register}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            errors={errors}/>}
            {currentStep === 3 && <PasswordInfo 
            steps={steps}
            currentStep={currentStep}
            register={register}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            errors={errors}/>}
            {currentStep === 4 && <FinishForm 
            steps={steps}
            currentStep={currentStep}
            register={register}
            incrementStep={incrementStep}
            decrementStep={decrementStep}
            isValid={isValid}
            isSubmitting={isSubmitting}
            errors={errors}/>}

            {/* <pre>{JSON.stringify(watch())}</pre> */}
          </form>
          <p className="auth-footer">Already have an account? <Link href={'/login'}>Login</Link></p>
      </CenteredContainer>
    </ProtectedPublicRoute>
  )
}

export default page