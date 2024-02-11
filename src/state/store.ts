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

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (items: Product[]) => set(() => ({ products: items })),
}));