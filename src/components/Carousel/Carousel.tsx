import React from 'react'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import AliceCarousel from 'react-alice-carousel';
import './carousel.scss';

const handleDragStart = (e: React.MouseEvent<HTMLElement>) => e.preventDefault();

const images = [
    <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
    <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
    <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
]

const Carousel = () => {
  return (
    <AliceCarousel 
      mouseTracking 
      items={images} 
      autoPlay
      autoPlayInterval={5000}
      infinite
      animationDuration={1000}
      disableButtonsControls
      controlsStrategy='responsive'
    />
  )
}

export default Carousel