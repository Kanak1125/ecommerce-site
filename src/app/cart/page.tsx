'use client';

import {useEffect, useState} from 'react'
import Link from 'next/link';
import { useProductStore, useCartStore, useAuthStore } from '@/state/store';
import { BsTrash3 } from 'react-icons/bs';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { formatCurrency } from '@/utils/formatCurrency';

import Navbar from '@/components/Navbar/Navbar';
import { CartItem, Product } from '@/types/type';

import './cart.scss';
import '../../components/ProductDetails/productDetails.scss';
import ProtectedRoute from '@/components/ProtectedRoute';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';

const page = () => {
    const products = useProductStore((state) => state.products);  // access the products state from the global state...
    const cartItems = useCartStore((state) => state.cartItems);
    const { currentUser } = useAuthStore();

    // select and get only the getItemQuantity piece of state using the selector function...
    const setCartItems = useCartStore((state) => state.setCartItems);
    const getItemQuantity = useCartStore((state) => state.getItemQuantity);
    const setItemQuantity = useCartStore((state) => state.setItemQuantity);
    const removeQuantity = useCartStore((state) => state.removeQuantity);
    const increaseItemQuantity = useCartStore((state) => state.increaseQuantity);
    const decreaseItemQuantity = useCartStore((state) => state.decreaseQuantity);
    const updateFirestore = useCartStore((state) => state.updateFirestore);
    
    const [cartItemData, setCartItemData] = useState<Product[]>([]);

    useEffect(() => {
        setCartItemData(products.filter(item => {
            return cartItems.find(d => item.id == d.id) // comparing string data type with num id...
        }));
    }, [cartItems, products]);

    useEffect(() => {
      setCartItems([]);
      const getCartItems = async (userID: string) => {
        try {
          const cartRef = doc(db, 'cart', userID);
          const cartSnap = await getDoc(cartRef);
          if (cartSnap.exists()) {
          const productData = cartSnap.data() as CartItem[]; // Explicitly cast productData to Product type
            // setCurrentItem(productData);
            console.log(Object.values(productData));
            setCartItems(Object.values(productData));

          } else {
            console.log('No such product exists!');
          }
        } catch (error) {
          console.error('Error getting product:', error);
        }
      }

      currentUser && getCartItems(currentUser?.uid);
    }, [currentUser]);

    console.log(products, cartItems);
    
    const shoppingCartList = cartItemData.map((item, index) => {
        const {id, image, title, price} = item;
        const quantity = getItemQuantity(id) || 0;
        const amount = formatCurrency(price * quantity);
        
          // const parsedId = id.toString();
          return (
            <li key={index}>
              <div className="cart-item-container">
                <Link href={`/product/${id}`} className='md:basis-1/6'>
                  <div className="w-full h-[200px] md:w-[160px] md:h-[160px] overflow-hidden bg-white py-4 md:rounded">
                    <img src={image} alt="" className='w-full h-full object-contain'/>
                  </div>
                </Link>
                <Link href={`/products/${id}`} className='text-1xl font-semibold m-3 md:basis-4/12'>
                  <p >{title}</p>
                </Link>
                <div className="mt-3 px-3 flex items-center md:basis-3/12 md:mx-auto md:justify-center">
                  <button 
                    className="qty-update-btn" 
                    onClick={() => {
                      increaseItemQuantity(id)
                      updateFirestore()
                    }}
                  >+</button>
                  
                  <input 
                      type="number" 
                      name="" 
                      id="quantity" 
                      className='qty-number'
                      value={getItemQuantity(id)} 
                      min={1} 
                      max={5}
                      onChange={(e) => setItemQuantity(id, e.target.value)}
                      // onChange={(e) => handleQuantity(e)}
                  />
                 
                  <button 
                    className="qty-update-btn" 
                    onClick={() => {
                      decreaseItemQuantity(id)
                      updateFirestore()
                    }}
                  >-</button>
                  <p className='mx-5 md:mx-auto text-1xl font-bold'>{amount}</p>
                  <div 
                    className='bg-accent ml-10 md:order-last md:hidden p-2 rounded cursor-pointer'
                    onClick={() => {
                      removeQuantity(id);
                      updateFirestore();
                    }}  
                  >
                    <BsTrash3 size={18} className=' text-primary'/>
                  </div>
                </div>
                <button
                 className="checkout-btn"
                 >Buy now</button>
                <BsTrash3 
                  size={24} 
                  className='md:order-last hidden md:block md:basis-1/12 rounded cursor-pointer'
                  onClick={() => {
                    removeQuantity(id);
                    updateFirestore();
                  }}  
                />
              </div>
              <hr className='border-2 border-primary'/>
            </li>
          )
        })

        
  const totalAmount = cartItemData.reduce((acc, current) => {
    const quantity = getItemQuantity(current.id) || 0;
    return acc + current.price * quantity;
}, 0);
  return (
    <ProtectedRoute>
      <Navbar />
      <main className='max-w-screen-xl mx-auto px-10 py-10 min-h-screen '>
        {
          cartItems.length === 0 ? <h2 className='text-2xl font-bold text-center text-secondary'>Your shopping Cart is empty </h2>
          :
          <>
            <h2 className='text-2xl font-bold'>Your shopping Cart </h2>
            <SimpleBar className='h-[444px] mt-10 '>
              <ul className=''>
                {/* <li> */}
                  {shoppingCartList}
                  
                {/* </li> */}
              </ul>
            </SimpleBar>
            <div className='my-5 text-2xl flex justify-between'>
              <p className='font-semibold'>Total: </p>
              <p className='font-bold'>{formatCurrency(totalAmount)}</p>
            </div>
          </>  
        }
      </main>
    </ProtectedRoute>
  )
}

export default page