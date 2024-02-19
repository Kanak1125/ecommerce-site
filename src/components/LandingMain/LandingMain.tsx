import React, { useState, useEffect } from 'react'
import './landingMain.scss';
import Carousel from '../Carousel/Carousel';
import CategoryLinks from '../Category_Links/CategoryLinks';

// icons...
import { LuShirt } from "react-icons/lu";
import { PiHandbagSimple } from "react-icons/pi";
import { TbSunglasses } from "react-icons/tb";
import { GiConverseShoe } from "react-icons/gi";
import { FiWatch } from "react-icons/fi";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

import ItemCard from '../ItemCard';
import Card from '../product_card/Card';

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Item } from '@/types/type';
import CardSkeletonLoader from '../CardSkeletonLoader/CardSkeletonLoader';
import { useProductStore } from '@/state/store';

import "react-alice-carousel/lib/scss/alice-carousel.scss";
import AliceCarousel from 'react-alice-carousel';

const handleDragStart = (e: React.MouseEvent<HTMLElement>) => e.preventDefault();

const categories = [
  {
    // id: ,
    name: 'Clothing',
    icon: <LuShirt />
  },
  {
    name: 'Handbags',
    icon: <PiHandbagSimple />
  },
  {
    name: 'Sunglasses',
    icon: <TbSunglasses />
  },
  {
    name: 'Shoes',
    icon: <GiConverseShoe />
  },
  {
    name: 'Watches',
    icon: <FiWatch />
  },
];


const cards = [
  {
    text: "timeless elegance with every tick of the clock.",
    class: "bg-watch",
  },
  {
    text: "carry your world with you, in style.",
    class: "bg-bag",
  },
  {
    text: "step into comfor and confidence, every time.",
    class: "bg-shoes",
  },
];

const images = [
  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" onDragStart={handleDragStart} role="presentation" />,
]

const LandingMain = () => {
  const products = useProductStore((state) => state.products);  // access the products state from the global state...
  const setProducts = useProductStore((state) => state.setProducts);

  
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products/');
      return response.data;
    }
  });
  
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
    console.log(products);
  }, [data, setProducts]);

  const categoryLinks = categories.map(item => (
    <CategoryLinks>
      {item.icon}
      <p className='category-name '>{item.name}</p>
    </CategoryLinks>
  ))

  const cardItems = cards.map(item => (
    <ItemCard class__Name={item.class} text={ item.text } />
  ))

  const newArrivalsContent = 
    isLoading ? 
    Array(11).fill(0).map((el, i) => (
      <CardSkeletonLoader key={i}/>
    ))
    :
    products?.map((item: Item) => {
      const {id, image, title, price} = item;
      return (
        <Card
          key={id}
          id={id}
          imgUrl={image}
          title={title}
          price={price}
      />)
  });

  if (error) {
    return <div>Error fetching the data</div>;
  }
  
  return (
    <main className="container max-w-[1200px] 
    border-2 border-red-800 
    mx-auto py-4">
       <Carousel 
        items={images}
        disableButtonsControls={true}
        disableDotsControls={false}
        autoPlay={true}
        infinite={true}
        isResponsive={false}
       />
       <section className="category-section">
          <h2 className='font-bold '>Category</h2>
          <div className="category">
            {categoryLinks}
          </div>
       </section>
       <div className="card-section">
          { cardItems }
       </div>
       <div className="new-arrivals">
          <h2 className='text-2xl font-bold'>New Arrivals</h2>
          <div className='new-arrival-items-container '>
            <Carousel 
              items={newArrivalsContent}
              disableButtonsControls={false}
              disableDotsControls={true}
              autoPlay={false}
              infinite={false}
              isResponsive={true}
            />
          </div>
          {/* <button className="slider-navigator slider-navigator-left">
            <FaChevronLeft />
          </button>
          <button className="slider-navigator slider-navigator-right">
            <FaChevronRight />
          </button> */}
       </div>
    </main>
  )
}

export default LandingMain