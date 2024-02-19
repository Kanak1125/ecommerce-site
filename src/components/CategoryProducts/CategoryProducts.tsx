'use client';

import React, { useState, useEffect } from 'react'
import CardSkeletonLoader from '../CardSkeletonLoader/CardSkeletonLoader';
import { useProductStore } from '@/state/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '../product_card/Card';

const CategoryProducts = ({ id }: {
    id: string;
} ) => {
    const categoryProducts = useProductStore((state) => state.products);  // access the products state from the global state...
  const setProducts = useProductStore((state) => state.setProducts);

  const { data, isLoading, error } = useQuery({
    queryKey: [id],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products/');
      return response.data;
    }
  });

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  return (
    <main className="container max-w-[1200px]  
    mx-auto py-4">
        <h2 className='heading'>{ id }</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-8'>
          {
            isLoading ? 
            Array(11).fill(0).map((el, i) => (
              <CardSkeletonLoader key={i}/>
            ))
            :
            categoryProducts.map(item => {
              const {id, image, title, price} = item;
              return (
                <Card
                  key={id}
                  id={id}
                  imgUrl={image}
                  title={title}
                  price={price}
              />)
          })}
        </div>
    </main>
  )
}

export default CategoryProducts