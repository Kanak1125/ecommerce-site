import React from 'react'
import './landingMain.scss';
import Carousel from '../Carousel/Carousel';
import CategoryLinks from '../Category_Links/CategoryLinks';

// icons...
import { LuShirt } from "react-icons/lu";
import { PiHandbagSimple } from "react-icons/pi";
import { TbSunglasses } from "react-icons/tb";
import { GiConverseShoe } from "react-icons/gi";
import { FiWatch } from "react-icons/fi";
import ItemCard from '../ItemCard';

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

const LandingMain = () => {
  const categoryLinks = categories.map(item => (
    <CategoryLinks>
      {item.icon}
      <p className='category-name'>{item.name}</p>
    </CategoryLinks>
  ))

  const cardItems = cards.map(item => (
    <ItemCard class__Name={item.class} text={ item.text } />
  ))
  return (
    <main className="container max-w-[1200px] border-2 border-red-800 mx-auto py-4">
       <Carousel />
       <section className="category-section">
          <h2 className='font-bold '>Category</h2>
          <div className="category">
            {categoryLinks}
          </div>
       </section>
       <div className="card-section">
          { cardItems }
       </div>
    </main>
  )
}

export default LandingMain