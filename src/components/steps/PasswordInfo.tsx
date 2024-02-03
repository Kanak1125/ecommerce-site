import React from 'react'

const PasswordInfo = () => {
  return (
    <>
        <h2 className='subheading'>Setup your Password</h2>
        <label htmlFor="password">Password: </label> 
        <input 
          type="password"
          // ref={emailRef}
          id="password" 
          className='input-fields '
          required
        />
        <label htmlFor="confirm-password">Confirm password: </label> 
        <input 
          type="password"
          // ref={emailRef}
          id="confirm-password" 
          className='input-fields '
          required
        />
    </>
  )
}

export default PasswordInfo