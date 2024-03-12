// 'use client'

// import Stepper from '@/components/Stepper/Stepper'
// import React, { useEffect, useState } from 'react'
// import './signup.scss';
// import PersonalInfo from '@/components/steps/PersonalInfo';
// import ContactInfo from '@/components/steps/ContactInfo';
// import PasswordInfo from '@/components/steps/PasswordInfo';
// import FinishForm from '@/components/steps/FinishForm';
// import { FieldValues, useForm } from "react-hook-form";
// import { ObjectSchema } from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { schema_PersonalInfo, schema_ContactInfo, schema_PasswordInfo, schema_Agreement } from '@/schema/schema_signup';
// import CenteredContainer from '@/components/CenteredContainer';
// import Link from 'next/link';

// import signUp from '@/services/firebase/auth/signup';
// import { useRouter } from 'next/navigation';
// import ProtectedPublicRoute from '@/components/ProtectedPublicRoute';
// import { updateProfile } from 'firebase/auth';
// import { collection, query, doc, setDoc } from 'firebase/firestore';
// import { db } from '@/services/firebase/config';

// // Need: To include agreements to validation as well...

// const page = () => {
//   const steps = [{
//     name: 'Personal',
//     fields: ['fullName', 'address']
//   },
//   {
//     name: 'Contact',
//     fields: ['email', 'phone']
//   },
//   {
//     name: 'Password',
//     fields: ['password', 'confirm_password']
//   },
//   {
//     name: 'Finish',
//     // problem with the following validation...
//     fields: ['terms_and_conditions', 'privacy_policy'],
//   }];

//   const [shouldSubmit, setShouldSubmit] = useState(false);
//   const [error, setError] = useState("");
//   const router = useRouter();

//   const [currentStep, setCurrentStep] = useState(1);
//   const [currentSchema, setCurrentSchema] = useState<ObjectSchema<FieldValues, any, any, any>>(schema_PersonalInfo);
  
//   const getCurrentSchema = () => {
//     switch (currentStep) {
//     case 1:
//       return schema_PersonalInfo;
//     case 2: 
//       return schema_ContactInfo;
//     case 3:
//       return schema_PasswordInfo;
//     // case 4:
//     //   return schema_Agreement;
//     default: 
//       return schema_PersonalInfo;
//     }
//   }

//   useEffect(() => {
//     setCurrentSchema(getCurrentSchema())
//   }, [currentStep]);

//   // integrate yup with useForm hook...
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { 
//       errors,
//       isValid,
//       isSubmitting, 
//     },
//     watch,
//     trigger,
//     reset,
//   } = useForm({
//     // defaultValues: {
//     //   fullName: "",
//     //   address: "",
//     //   email: "",
//     //   phone: "",
//     //   password: "",
//     //   confirm_password: "",
//     // },
//     resolver: yupResolver(currentSchema),
//     mode: "onBlur" || "onSubmit",
//   });

//   console.log(errors);
  
//   const incrementStep = async (e: React.MouseEvent<HTMLButtonElement>) => {
//     const fields = steps[currentStep - 1].fields;
//     const output = await trigger(fields, {
//       shouldFocus: true,
//     })

//     // if (!output || (currentStep === steps.length)) return;
//     if (!output) return;
//     if (currentStep === 3) setShouldSubmit(true); // submit okay flag for signup...

//     if (currentStep === steps.length) {
//       await handleSubmit(onDataSubmit)();
//       reset();
//     }

//     setCurrentStep(prevState => prevState + 1);
//   }

//   const decrementStep = (e: React.MouseEvent<HTMLButtonElement>) => {
//     if (currentStep == 1) return;
//     setCurrentStep(prevState => prevState - 1);
//   }

//   const onDataSubmit = async (data: FieldValues) => {
//     // data submission to the server takes place here...
//     console.log(shouldSubmit);
//     if (!shouldSubmit) return;
//     console.log(data);
//     console.log("Submitted...");

//     const { result, err } = await signUp(data.email, data.password);

//     const addToDB = async () => {
//       const docRef = doc(db, 'user', data?.email);
//       await setDoc(docRef, {
//         ...data,
//         id: result?.user.uid,
//       })
//     }

//     if (err) {
//       setError("Sign up failed!");
//     } else {
//       console.log(data);
//       addToDB();
//       console.log("Signup successful...");
//       if (result) {
//           await updateProfile(result.user, {
//           displayName: data.fullName
//         });
//       }
//       return router.push('/');
//     }
//   };

//   return (
//     <ProtectedPublicRoute>
//       <CenteredContainer>
//           <h2 className='heading-signup mb-6'>Sign up</h2>
//           <form 
//             onSubmit={handleSubmit(onDataSubmit)}
//             className='signup-form break-all break-words
//             '
//           >
//             {/* {error && */}
//               {/* <div className='bg-red-100 border-2 border-red-400 text-red-400 mt-2 p-3 rounded'>
//                 {error} 
//               </div>*/}
//             {/* } */}
//             <Stepper 
//               steps={ steps }
//               currentStep={ currentStep }
//             />

//             {currentStep === 1 && <PersonalInfo 
//             steps={steps}
//             currentStep={currentStep}
//             register={register}
//             incrementStep={incrementStep}
//             decrementStep={decrementStep}
//             isValid={isValid}
//             isSubmitting={isSubmitting}
//             errors={errors}/>}
//             {currentStep === 2 && <ContactInfo 
//             steps={steps}
//             currentStep={currentStep}
//             register={register}
//             incrementStep={incrementStep}
//             decrementStep={decrementStep}
//             isValid={isValid}
//             isSubmitting={isSubmitting}
//             errors={errors}/>}
//             {currentStep === 3 && <PasswordInfo 
//             steps={steps}
//             currentStep={currentStep}
//             register={register}
//             incrementStep={incrementStep}
//             decrementStep={decrementStep}
//             isValid={isValid}
//             isSubmitting={isSubmitting}
//             errors={errors}/>}
//             {currentStep === 4 && <FinishForm 
//             steps={steps}
//             currentStep={currentStep}
//             register={register}
//             incrementStep={incrementStep}
//             decrementStep={decrementStep}
//             isValid={isValid}
//             isSubmitting={isSubmitting}
//             errors={errors}/>}

//             {/* <pre>{JSON.stringify(watch())}</pre> */}
//           </form>
//           <p className="auth-footer">Already have an account? <Link href={'/login'}>Login</Link></p>
//       </CenteredContainer>
//     </ProtectedPublicRoute>
//   )
// }

// export default page


'use client';

import React, { useState } from 'react'
import CenteredContainer from '@/components/CenteredContainer'
import Button from '@/components/Button/Button'
import { object, string, ref } from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../app/signup/signup.scss';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoute';
import { useAuthStore } from '@/state/store';
import signUp from '@/services/firebase/auth/signup';
import { updateProfile } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { loading } = useAuthStore();
  const signupSchema = object().shape({
    email: string().required("Please enter your email").email(),
    password: string().required("Your password is Required")
    .min(4, "Must be greater than 4")
    .max(16, "Mustn't be longer than 16"),
    confirm_password: string()
      .label('confirm password')
      .required()
      .oneOf([ref('password'), ''], 'Passwords must match'),
  });

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid,
      isSubmitting,
    },
    reset,
  } = useForm({
    resolver: yupResolver(signupSchema),
    mode: "onBlur" || "onSubmit",
  });

  const signup = async(data: FieldValues) => {
    const { result, err } = await signUp(data.email, data.password);

    // here need to assign the role to the user...
    const addToDB = async () => {
        const docRef = doc(db, 'user', data?.email);
        await setDoc(docRef, {
          ...data,
          id: result?.user.uid,
        })
      }
  
      if (err) {
        setError("Sign up failed!");
      } else {
        console.log(data);
        addToDB();
        console.log("Signup successful...");
        if (result) {
            await updateProfile(result.user, {
            displayName: data.fullName
          });
      }
    }

    if (!loading && err) {
      setError("Signup in failed...");
      console.log("Failed to signup");
    } else {
      return router.push('/');
    }
  };

  const signupSuccess = () => {
    console.log("Signup successful...");
    // reset();
  }

  return (
    <ProtectedPublicRoute>
      <CenteredContainer>
          <h2 className='heading-signup mb-6'>Sign Up</h2>
          <form 
            onSubmit={handleSubmit(signup)}
            className='signup-form break-all break-words
            '
          >
            <label htmlFor="email" className='label'>Email: </label>
            <input 
              type="email"
              {...register("email")}
              id="email" 
              placeholder='example@mail.com'
              className='input-fields '
            />
            <p className="text-red-400 text-sm my-1">{errors.email?.message}</p>
            <label htmlFor="password" className='label'>Password: </label> 
            <input 
              type="password"
              {...register("password")}
              id="password" 
              className='input-fields '
              required
            />
            <p className="text-red-400 text-sm my-1">{errors.password?.message}</p>
            <label htmlFor="confirm_password" className='label'>Confirm Password: </label> 
            <input 
              type="password"
              {...register("confirm_password")}
              id="confirm_password" 
              className='input-fields '
              required
            />
            <p className="text-red-400 text-sm my-1">{errors.confirm_password?.message}</p>

              {error && <p className=' text-red-400 text-sm'>{error}</p>}
            <div className="btns-container">
              <Button 
              text={'Register'}
              align='right'
              // handleBtnClick= {signup}
              handleBtnClick= {signupSuccess}
              isValid={isValid}
              isSubmitting={isSubmitting}
              />
              {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
            </div>
            

            {/* <pre>{JSON.stringify(watch())}</pre> */}
          </form>
          <p className="auth-footer">Don't have an account? <Link href={'/login'}>Login</Link></p>
      </CenteredContainer>
    </ProtectedPublicRoute>
  )
}

export default page