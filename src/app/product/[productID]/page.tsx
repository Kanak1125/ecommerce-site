'use client';

import Navbar from "@/components/Navbar/Navbar";
import ProductDetails from "@/components/ProductDetails/ProductDetails";

const page = ({ params } : {
  params: { productID: string; }
}) => {
    return (
      <div>
        <Navbar />
        <ProductDetails id={ params.productID }/>
      </div>
    )
}

export default page