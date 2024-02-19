import React from 'react'
import Link from 'next/link';
import {BsHeart, BsHeartFill} from 'react-icons/bs';
import { formatCurrency } from './../../utils/formatCurrency';
import './card.scss';

const Card = (props: {
    id: number;
    imgUrl: string;
    title: string;
    price: number;
}) => {
  const {id, imgUrl, title, price} = props;

  return (
    <div className='card group' title={title}>
      <div className='fav-icon-container group-hover:translate-y-0 group-hover:opacity-100'>
        <BsHeart size={24}/>
      </div>
      <Link href={`/products/${id}`}>
        <div className='w-full h-[260px] '>
            <img src={imgUrl} alt="" className='w-full h-full object-contain'/>
        </div>
      </Link>
      <div className="card-info">
          <Link href={`/products/${id}`}>
            <h3 className=' font-medium line-clamp-1'>{title}</h3>
          </Link>
          <p className='price'>
            {formatCurrency(price)}
            {/* {(price)} */}
          </p>
      </div>
    </div>
  )
}

export default Card