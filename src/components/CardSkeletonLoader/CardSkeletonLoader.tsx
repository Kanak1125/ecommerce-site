import React from 'react'

const CardSkeletonLoader = () => {
  return (
    <div className='w-full rounded-lg p-6 mx-auto card-shadow transition-all duration-300 ease-in-out relative group overflow-hidden animate-pulse'>
      <div className='img-container w-full h-[260px] bg-slate-200 rounded-lg'></div>
      <div className="card-info pt-5 text-accent">
          <p className='h-6 rounded-full bg-slate-200'></p>
          <p className='mt-4 h-6 rounded-full bg-slate-200'></p>
          <p className='mt-4 text-lg font-bold w-full bg-slate-200 h-4 rounded-full'></p>
      </div>
    </div>
  )
}

export default CardSkeletonLoader