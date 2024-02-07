import React, { ReactNode } from 'react'

const CenteredContainer = ({ children } : {
    children: ReactNode
}) => {
  return (
    <div className='centered-container  flex flex-col items-center justify-center'>
        { children }
    </div>
  )
}

export default CenteredContainer