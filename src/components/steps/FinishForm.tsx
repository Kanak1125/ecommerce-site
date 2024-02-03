import Link from 'next/link'
import React from 'react'

const FinishForm = (props: {
    register: any;
    errors: any
  }) => {

    const { register, errors } = props;
  return (
    <>
    <div className='my-6 mx-1'>
        <input type="checkbox"
        {...register("terms_and_conditions")}
        name="terms-and-conditions"id="terms-and-conditions" 
        className='mr-2'
        />
        I agree to the 
        <Link href="" className='ml-1 font-semibold underline text-accent-color'>Terms and Conditions</Link>.
    </div>
    <p className="text-red-400 text-sm my-1">{errors.terms_and_conditions?.message}</p>
    <div className='my-6 mx-1'>
        <input type="checkbox"
        {...register("privacy_policy")}
        name="privacy-policy"
        id="privacy-policy" 
        className='mr-2'
        />
        I agree to the 
        <Link href="" className='ml-1 font-semibold underline text-accent-color'>Privacy policy</Link>.
    </div>
    <p className="text-red-400 text-sm my-1">{errors.privacy_policy?.message}</p>
    </>
  )
}

export default FinishForm