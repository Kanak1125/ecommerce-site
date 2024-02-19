'use client';

import React, { useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import CategoryProducts from '@/components/CategoryProducts/CategoryProducts';

const page = ({ params }: {
    params: { categoryID: string; };
}) => {

  // useEffect(() => {
  //   fetch("http://localhost:8000/api/home")
  //   .then(res => res.json())
  //   .then(data => console.log(data));
  // }, []);
  return (
    <div>
        <Navbar />
        <CategoryProducts id={ params.categoryID }/>
    </div>
  )
}

export default page