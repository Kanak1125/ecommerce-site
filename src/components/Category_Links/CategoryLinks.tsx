import React, { ReactNode } from 'react'
import Link from 'next/link';
import './categoryLink.scss';

const CategoryLinks = ({ children }: { children: ReactNode }) => {
  return (
    <Link href={'/'} className='category-link'>
        { children }
    </Link>
  )
}

export default CategoryLinks