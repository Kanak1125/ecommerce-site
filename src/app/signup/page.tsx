'use client'

import Stepper from '@/components/Stepper/Stepper'
import React, { useState } from 'react'
import './signup.scss';
import Button from '@/components/Button/Button';

const page = () => {

    const steps = ['Personal', 'Contact', 'Password', 'Finish'];
    const [currentStep, setCurrentStep] = useState(steps[0]);

    const handleBtnClick = () => {
        
    }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center'>
        <h2 className='heading-signup'>Sign up</h2>
        <form 
        //   onSubmit={handleForm}
          className='flex flex-col w-[80%] max-w-[444px] mx-auto px-4 rounded  backdrop-blur-sm border-2 border-white/25'
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
          <h2 className='subheading'>Personal Information</h2>
          <label htmlFor="fullName" className='label'>Full Name: </label>
          <input 
            type="text"
            // ref={emailRef}
            id="fullName" 
            className='input-fields'
            required
          />
          <label htmlFor="address" className='label'>Address: </label>
          <input 
            type="text"
            // ref={emailRef}
            id="address" 
            className='input-fields'
            required
          />
          {/* <label htmlFor="email">Email: </label> */}
          {/* <input 
            type="email"
            // ref={emailRef}
            id="email" 
            placeholder='example@mail.com'
            className='mb-5 border-2 border-white/25 py-1 px-2 mt-1 rounded bg-transparent focus:border-white/50 outline-none transition-all duration-300 focus:bg-white/5 '
            required
          /> */}
          
          <Button handleBtnClick= { handleBtnClick }/>
          {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
        </form>
    </div>
  )
}

export default page