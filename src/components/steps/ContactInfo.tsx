import React from 'react'

const ContactInfo = (props: {
    register: any;  // this needs to be considered...
    errors: any
  }) => {

    const { register, errors } = props;
  return (
    <>
        <h2 className='subheading'>Contact Information</h2>
        <label htmlFor="email" className='label'>Email: </label> 
        <input 
          type="email"
          // ref={emailRef}
          {...register("email")}
          id="email" 
          placeholder='example@mail.com'
          className='input-fields '
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.email?.message}</p>
        <label htmlFor="ph-number" className='label'>Phone: </label> 
        <input 
          type="telephone"
          // ref={emailRef}
          {...register("phone")}
          id="ph-number" 
          className='input-fields'
          required
        />
        <p className="text-red-400 text-sm my-1">{errors.phone?.message}</p>
    </>
  )
}

export default ContactInfo