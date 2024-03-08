import { create } from 'zustand';
import { Product, ProductStore, CartItem, CartStore, AuthStore } from '@/types/type';

// auth store...
export const useAuthStore = create<AuthStore>((set) => ({
    currentUser: null,
    loading: true,
    setCurrentUser: (user) => set({ currentUser: user }),
    setLoading: (isLoading) => set({ loading: isLoading }),
}));

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    setProducts: (items: Product[]) => set(() => ({ products: items })),
}));

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [{id: 2, quantity: 10}, {id: 1, quantity: 10},],
    getItemQuantity: (id: number) => 
    get().cartItems.find((item: CartItem) => item.id === id)?.quantity, 

    // the following quantity will be received from the DOM, so typed string...
    setItemQuantity: (id: number, qty: string) => set((state: CartStore): CartStore | Partial<CartStore> => {
        if (!state.cartItems.some((item: CartItem) => item.id === id)) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        id: +id,
                        quantity: parseInt(qty)
                    }
                ]
            };
        } else {
            return {
                ...state,
                cartItems: state.cartItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return {
                            ...item,
                            quantity: parseInt(qty),
                        };
                    } else {
                        return item;
                    }
                }),
            };
        }
    }),

    increaseQuantity: (id: number) => set((state: CartStore) => {
        if (state.cartItems.find(item => item.id === id) == null) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        id: +id,
                        quantity: 1,
                    }
                ]
            }
        } else {
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === id) {
                        return  {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    } else {
                        return item;
                    }
                })
            }
        }
    }),

    decreaseQuantity: (id: number) => set((state: CartStore) => {
        if (state.cartItems.find(item => item.id === id)?.quantity == 1) {
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== id),
            }
        } else {
            return {
                ...state,
                cartItems: state.cartItems.map(item => {
                    if (item.id === id) {
                        return  {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                    } else {
                        return item;
                    }
                })
            }
        }
    }),

    removeQuantity: (id: number) => set((state: CartStore) => {
        return {
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== id)
        }
    })
}));