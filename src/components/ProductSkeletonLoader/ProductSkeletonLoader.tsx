import React from 'react'
import './productSkeletonLoader.scss';

const ProductSkeletonLoader = () => {
    return (
        <div className="flex flex-col my-6 md:flex-row items-center gap-10 animate-pulse">
            <div className="w-full h-[360px] md:basis-2/5 bg-slate rounded py-8"></div>
            <div className="my-4 p-2 md:basis-3/5 w-full">
              <h2 className=' h-6 w-full rounded-full bg-slate'></h2>
              <h2 className='mt-4 h-6 w-full rounded-full bg-slate'></h2>
              <p className='my-5 h-4 bg-slate rounded-full'></p>
              <div className="my-3 w-[20%] h-4 bg-slate rounded-full"></div>
              <p className='mb-5 w-[30%] h-4 bg-slate rounded-full'></p>
              <p className="h-4 w-full bg-slate rounded-full"></p>
              <p className="mt-2 h-4 w-full bg-slate rounded-full"></p>
              <p className="mt-2 h-4 w-full bg-slate rounded-full"></p>
              <p className="mt-2 h-4 w-full bg-slate rounded-full"></p>
              <p className="mt-2 h-4 w-full bg-slate rounded-full"></p>
              <div className="mt-10 h-4 w-[30%] bg-slate rounded-full"></div>
              <div className='my-10 w-[40%] h-10 rounded-full bg-slate'></div>
            </div>
        </div>
      )
}

export default ProductSkeletonLoader