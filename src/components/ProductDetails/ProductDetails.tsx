import React, { useState } from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import Breadcrumbs from '../components/Breadcrumbs';
import ProductSkeletonLoader from '@/components/ProductSkeletonLoader/ProductSkeletonLoader';
// import { useShoppingCart } from '../context/ShoppingCartContext';
import { useCartStore } from '@/state/store';
import {BsStarFill, BsStarHalf} from 'react-icons/bs';
import { formatCurrency } from '@/utils/formatCurrency';
import './productDetails.scss';

const ProductDetails = ({ id: productID }: {
    id: string;
}) => {
    // const { getItemQuantity, setItemQuantity } = useShoppingCart();
    const getItemQuantity = useCartStore((set) => set.getItemQuantity);
    const setItemQuantity = useCartStore((set) => set.setItemQuantity);
  
    const {isLoading, error, data, isFetching} = useQuery({
      queryKey: [`product-${productID}`],
      queryFn: async () => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productID}`);
        return response.data;
      },
      staleTime: 1000 * 60 * 10
    });
  
    const [quantity, setQuantity] = useState(getItemQuantity(parseInt(productID)) || 0);
  
    function incrementQuantity() {
        setQuantity((prevQuantity: number) => prevQuantity + 1);
    }
  
    function decrementQuantity() {
        if (quantity === 0) return; 
        setQuantity((prevQuantity: number) => prevQuantity - 1);
    }
    function handleQuantity(e: any) {
        const value = e.target.value;
        const parsedValue = parseInt(value); // the value we get from the input field is string so parsing to INTEGER type...
        setQuantity(!isNaN(parsedValue) ? parsedValue : value);
    }
  
    // if (error) return <h1 className='text-center'>Error: {error}</h1>
  
    return (
      <main className='max-w-[1200px] mx-auto px-10 py-10 min-h-screen '>
        {/* <Breadcrumbs/> */}
        <h2 className='product-detail-heading'>Product Detail </h2>
  
        {
          isLoading || isFetching ? <ProductSkeletonLoader /> 
          :
          <div className="flex flex-col my-6 md:flex-row items-center gap-10">
            <div className="w-full h-[360px] md:basis-2/5 bg-white rounded py-8">
              <img src={data?.image} alt="" className="w-full h-full object-contain" />
            </div>
            <div className="my-4 p-2 md:basis-3/5">
              <h2 className='text-2xl font-semibold'>{data?.title}</h2>
              <p className='product-price'>{formatCurrency(data?.price)}</p>
              <div className="product-ratings">
                  <BsStarFill size={18}/>
                  <BsStarFill size={18}/>
                  <BsStarFill size={18}/>
                  <BsStarFill size={18}/>
                  <BsStarHalf size={18}/>
              </div>
              <p className='product-availability'>Availability: In stock</p>
              <p className="product-description">{data?.description}</p>
              <div className="mt-10 flex items-center ">
                  <label htmlFor="quantity" title='Quantity' className='mr-4'>Qty:</label>
                  <button 
                    className="qty-update-btn" 
                    onClick={() => incrementQuantity()}
                  >+</button>
                  <input 
                      type="number" 
                      name="" 
                      id="quantity" 
                      className='qty-number'
                      value={quantity} 
                      min={0} 
                      max={5}
                      // onChange={(e) => setQuantity()}
                      onChange={(e) => handleQuantity(e)}
                      readOnly
                  />
                  <button 
                    className={`qty-update-btn 
                    ${quantity === 0 ? 'cursor-not-allowed' : ''}`} 
                    onClick={() => decrementQuantity()}
                  >-</button>
              </div>
              <div className='my-8'>
                <button 
                  className={`product-btn add-to-cart-btn ${quantity === 0 ? "cursor-not-allowed" : ""}`}
                  // onClick={() => setItemQuantity(productID, quantity)}  
                  // disabled = {quantity === 0}
                >Add to cart</button>
                <button className="product-btn buy-now-btn">Buy now</button>
              </div>
            </div>
          </div>
        }
      </main>
    )
}

export default ProductDetails