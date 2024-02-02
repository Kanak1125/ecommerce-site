import React, { useState } from 'react';
import "./stepper.scss";

const Stepper = ( props: {
  steps: string[];
  currentStep: string;
} ) => {
  // steps may be added LayoutRouter...
  
  const { steps, currentStep } = props;
  const renderSteps: any = steps.map((step, i) => (
    <div key={i} className='step'>
      <div className='step-idx'>{i + 1}</div>
      <p className='step-title'>{ step }</p>
    </div>
  ));

  return (
    <div className='flex justify-between items-center text-center my-8'>
      { renderSteps }
    </div>
  )
}

export default Stepper;