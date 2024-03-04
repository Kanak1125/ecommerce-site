'use client';

import React from 'react'
import CenteredContainer from '@/components/CenteredContainer'
import '../../signup/signup.scss';
import { useForm } from 'react-hook-form';
import Button from '@/components/Button/Button';
import { object, string, ref, ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const page = () => {
    // schema definition for client-side validation while signing up...
    const schema = object().shape({
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
        watch,
        trigger,
        reset,
        getValues,
    } = useForm({
        resolver: yupResolver(schema),
    });

    // const mutation = useMutation({
    //     mutationFn: (newUser) => {
    //         return axios.post('/some url', newUser);
    //     }
    // })

    const { data, isLoading, error } = useQuery({
        queryKey: ["admin"],
        queryFn: async () => {
            const response = await axios.get("http://localhost:8000/admin");
            return response.data;
        } 
    });

    const handleAdminLogin = async () => {
        const output = await trigger(['email', 'password'], {
            shouldFocus: true,
        });

        // mutation.mutate({})
        
        if (!output) return;

        if (data[0].email === getValues('email') && data[0].password === getValues('password')) {
            console.log("Admin login successful...");
        } else {
            console.log("No  such registered admin here...");
        }
    }

  return (
    <CenteredContainer>
        <h2 className='heading-signup mb-6'>Login (Admin) </h2>
        <form 
          onSubmit={handleSubmit(handleAdminLogin)}
          className='signup-form break-all break-words py-4
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
        <Button 
        text='Login'
        handleBtnClick= {handleAdminLogin}
        align='right'
        isValid={isValid}
        isSubmitting={isSubmitting}
        />
        
        {/* <pre>{JSON.stringify(watch())}</pre> */}
        </form>
    </CenteredContainer>
  )
}

export default page