// export type Inputs = {
//     example
// }
import { User } from 'firebase/auth';
import { ReactNode } from 'react';

export interface ProtectedRouteProps {
  children: ReactNode;
}

export type Item = {
  id: string;
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
  id: string;
  name: string;
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
  id: string;
  quantity: number;
}

export type CartStore = {
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  getItemQuantity: (id: string) => number | undefined;
  setItemQuantity: (id: string, qty: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  removeQuantity: (id: string) => void;
  updateFirestore: () => void;
}

export type AuthStore = {
  currentUser: User | null;
  loading: boolean;
  setCurrentUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
}