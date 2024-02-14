import React, { ReactNode } from 'react'
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import AliceCarousel from 'react-alice-carousel';
import './carousel.scss';

const Carousel = (props: {
  // type: 'string';
  items: any[];
  disableButtonsControls: boolean;
  disableDotsControls: boolean;
  autoPlay: boolean;
  infinite: boolean;
  isResponsive: boolean;
}) => {

  const { items, disableButtonsControls, disableDotsControls, autoPlay, infinite, isResponsive } = props;

  const responsive = {
    0: {
      items: 1,
    },
    320: {
      items: 2,
    },
    400: {
      items: 1,
    },
    576: {
      items: 2,
      numToSlide: 2,
    },
    1024: {
      items: 3,
      numToSlide: 3,
      itemsFit: 'contain'
    },
  }

  // }
  return (
    <AliceCarousel 
      mouseTracking 
      items={items} 
      disableDotsControls={disableDotsControls}
      autoPlay={autoPlay}
      autoHeight
      autoPlayInterval={5000}
      infinite={infinite}
      animationDuration={1000}
      disableButtonsControls={disableButtonsControls}
      responsive={isResponsive ? responsive : undefined}
      controlsStrategy='responsive'
    />
  )
}

export default Carousel