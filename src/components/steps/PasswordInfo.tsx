import React from 'react'

const PasswordInfo = (props: {
    register: any;  // this needs to be considered...
    errors: any
  }) => {

    const { register, errors } = props;
  return (
    <>
        <h2 className='subheading'>Setup your Password</h2>
        <label htmlFor="password" className='label'>Password: </label> 
        <input 
          type="password"
        //   ref={password}
          {...register("password")}
          id="password" 
          className='input-fields '
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.password?.message}</p>
        <label htmlFor="confirm-password" className='label'>Confirm password: </label> 
        <input 
          type="password"
          // ref={emailRef}
          {...register("confirm_password")}
          id="confirm-password" 
          className='input-fields '
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.confirm_password?.message}</p>
    </>
  )
}

export default PasswordInfo