import Link from 'next/link'
import React from 'react'

const FinishForm = () => {
  return (
    <div className='my-6 mx-1'>
        <input type="checkbox" name="terms-and-conditions"id="terms-and-conditions" 
        className='mr-2'
        />
        I agree to the 
        <Link href="" className='font-semibold underline text-accent-color'>Terms and Conditions</Link> of this site.
    </div>
  )
}

export default FinishForm