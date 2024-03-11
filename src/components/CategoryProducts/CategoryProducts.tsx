'use client';

import React, { useState, useEffect } from 'react'
import CardSkeletonLoader from '../CardSkeletonLoader/CardSkeletonLoader';
import { useProductStore } from '@/state/store';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from '../product_card/Card';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/services/firebase/config';
import { Product } from '@/types/type';
import './categoryProducts.scss';

const CategoryProducts = ({ id }: {
    id: string;
} ) => {
    const categoryProducts = useProductStore((state) => state.products);  // access the products state from the global state...
  const setProducts = useProductStore((state) => state.setProducts);

  const isLoading = false;
  const error = false;
  
  // const { data, isLoading, error } = useQuery({
  //   queryKey: [id],
  //   queryFn: async () => {
  //     const response = await axios.get('https://fakestoreapi.com/products/');
  //     return response.data;
  //   }
  // });

  const [currentCategorizedProducts, setCurrentCategorizedProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   if (data) {
  //     setProducts(data);
  //   }
  // }, [data, setProducts]);

  useEffect(() => {
  const productsDb = collection(db, "products");
    const unsubscribe = onSnapshot(query(productsDb, where('category', '==', id)), (querySnapshot) => {
      const productsData: Product[] = [];
      querySnapshot.forEach((doc) => {
        // Extract data from each document
        const productData: Product = {
          id: doc.id,
          title: doc.data().name,
          category: doc.data().category,
          description: doc.data().description,
          price: doc.data().price,
          image: doc.data().image,
          rating: {
            rate: 5,
            count: 5,
          }
        };
        productsData.push(productData);
      });
      // Set the products state with the updated data
      setCurrentCategorizedProducts(productsData);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  if (currentCategorizedProducts.length === 0) {
    return (
      !isLoading && <h2 className='no-item-msg'>No items in <span className='capitalize'>{id}</span>.</h2>
    )
  }

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
            currentCategorizedProducts.map(item => {
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