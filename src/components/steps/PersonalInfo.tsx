import React from 'react'
import { Schema } from 'yup'
import { UseFormRegister } from 'react-hook-form';

const PersonalInfo = ( props: {
    schema: Schema;
    register: any;  // this needs to be considered...
  }) => {
  // define schema for validation here...
  const {register, schema} = props;
  
  return (
    <>
        <h2 className='subheading'>Personal Information</h2>
        <label htmlFor="fullName" className='label'>Full Name: </label>
        <input 
            type="text"
            // ref={emailRef}
            {...register("fullName", {
              required: "Name is required"
            })}
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
    </>
  )
}

export default PersonalInfo