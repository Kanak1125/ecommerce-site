// export type Inputs = {
//     example
// }
import { User } from 'firebase/auth';
import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export type Item = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  }
}

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { 
      rate: number; 
      count: number; 
  }
}

export type ProductStore = {
  products: Product[];
  setProducts: (items: Product[]) => void;
}

export type CartItem = {
  id: number;
  quantity: number;
}

export type CartStore = {
  cartItems: CartItem[];
  getItemQuantity: (id: number) => number | undefined;
  setItemQuantity: (id: number, qty: string) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeQuantity: (id: number) => void;
}

export type AuthStore = {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}