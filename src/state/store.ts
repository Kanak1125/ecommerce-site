import { create } from 'zustand';

type Product = {
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

type ProductStore = {
    products: Product[];
    setProducts: (items: Product[]) => void;
}

type CartItem = {
    id: number;
    quantity: number;
}

type CartStore = {
    cartItems: CartItem[];
    getItemQuantity: (id: number, state: CartStore) => number;
    setCurrentQuantity: (id: number, qty: string) => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (items: Product[]) => set(() => ({ products: items })),
}));

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [],
    getItemQuantity: (id: number, state: CartStore) => 
    state.cartItems.find((item: CartItem) => item.id === id)?.quantity, 

    setItemQuantity: (id: number, qty: string) => set((state: CartStore) => {
        if (!state.cartItems.some((item: CartItem) => item.id === id)) {
            return [
                ...state.cartItems,
                {
                    id: +id,
                    quantity: parseInt(qty)
                }
            ]
        } else {
            return state.cartItems.map((item: CartItem) => {
                if (item.id == id) {
                    return {
                        ...item,
                        quantity: parseInt(qty),
                    }
                } else {
                    return item;
                }
            })
        }
    })
}))