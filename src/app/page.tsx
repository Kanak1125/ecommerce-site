'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import LandingMain from '@/components/LandingMain/LandingMain';

export default function Home() {
  const [isHamMenuActive, setIsHamMenuActive] = useState(false);

  return (
    <>
      <div>
        <Navbar 
          isHamMenuActive={isHamMenuActive}
          setIsHamMenuActive={setIsHamMenuActive}
        />
        <LandingMain />
      </div>
    </>
  );
}