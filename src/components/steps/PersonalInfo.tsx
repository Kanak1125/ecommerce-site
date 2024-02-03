import React from 'react'
import { Schema } from 'yup'
import { FieldErrors, UseFormRegister } from 'react-hook-form';

const PersonalInfo = ( props: {
    // schema: Schema;
    register: any;  // this needs to be considered...
    errors: any
  }) => {
  // define schema for validation here...
  const {register, errors} = props;
  console.log(errors?.fullName);
  return (
    <>
        <h2 className='subheading'>Personal Information</h2>
        <label htmlFor="fullName" className='label'>Full Name: </label>
        <input 
            type="text"
            // ref={emailRef}
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
            // ref={emailRef}
            id="address" 
            className='input-fields'
        />
        <p className="text-red-400 text-sm my-1">{errors.address?.message}</p>
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