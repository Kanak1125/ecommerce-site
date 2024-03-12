'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import LandingMain from '@/components/LandingMain/LandingMain';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>
      <div>
        <ToastContainer />
        <Navbar />
        <LandingMain 
          // data={data}
        />
      </div>
    </>
  );
}