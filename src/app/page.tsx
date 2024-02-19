'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import LandingMain from '@/components/LandingMain/LandingMain';

export default function Home() {
  return (
    <>
      <div>
        <Navbar />
        <LandingMain 
          // data={data}
        />
      </div>
    </>
  );
}