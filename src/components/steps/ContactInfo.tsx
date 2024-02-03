import React from 'react'

const ContactInfo = () => {
  return (
    <>
        <h2 className='subheading'>Contact Information</h2>
        <label htmlFor="email">Email: </label> 
        <input 
          type="email"
          // ref={emailRef}
          id="email" 
          placeholder='example@mail.com'
          className='input-fields '
          required
        />
        <label htmlFor="ph-number">Phone: </label> 
        <input 
          type="telephone"
          // ref={emailRef}
          id="ph-number" 
          className='input-fields'
          required
        />
    </>
  )
}

export default ContactInfo