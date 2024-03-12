'use client';

import React, { useState } from 'react'
import CenteredContainer from '@/components/CenteredContainer'
import Button from '@/components/Button/Button'
import { object, string } from 'yup';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FieldValues, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import signIn from '@/services/firebase/auth/signin';
import '../../app/signup/signup.scss';
import ProtectedPublicRoute from '@/components/ProtectedPublicRoute';
import { useAuthStore } from '@/state/store';

const page = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { loading } = useAuthStore();
  const loginSchema = object().shape({
    email: string().required("Please enter your email").email(),
    password: string().required("Your password is Required")
    .min(4, "Must be greater than 4")
    .max(16, "Mustn't be longer than 16"),
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
    resolver: yupResolver(loginSchema),
    mode: "onBlur" || "onSubmit",
  });

  const login = async(data: FieldValues) => {
    const { result, err } = await signIn(data.email, data.password);

    if (!loading && err) {
      setError("Login in failed...");
      console.log("Failed to login");
    } else {
      return router.push('/');
    }
  };

  const loginSuccess = () => {
    console.log("Login successful...");
    // reset();
  }

  return (
    <ProtectedPublicRoute>
      <CenteredContainer>
          <h2 className='heading-signup mb-6'>Login</h2>
          <form 
            onSubmit={handleSubmit(login)}
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

              {error && <p className=' text-red-400 text-sm'>{error}</p>}
            <div className="btns-container">
              <Button 
              text={'Login'}
              align='right'
              // handleBtnClick= {login}
              handleBtnClick= {loginSuccess}
              isValid={isValid}
              isSubmitting={isSubmitting}
              />
              {/* <Link href={'/forgot-password'} className='text-center my-2 hover:underline text-white'>Forgot Password?</Link> */}
            </div>
            

            {/* <pre>{JSON.stringify(watch())}</pre> */}
          </form>
          <p className="auth-footer">Don't have an account? <Link href={'/signup'}>Sign Up</Link></p>
      </CenteredContainer>
    </ProtectedPublicRoute>
  )
}

export default page