import { create } from 'zustand';
import { Product, ProductStore, CartItem, CartStore, AuthStore } from '@/types/type';
import { v4 as uuid } from 'uuid';
// import useLocalStorage from '../utils/hooks/useLocalStorage';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase/config';

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
    cartItems: [],
    // cartItems: useLocalStore(["cart-items"] | []);
    setCartItems: (items: CartItem[]) => set(() => ({ cartItems: items})),
    getItemQuantity: (id: string) => 
    get().cartItems.find((item: CartItem) => item.id === id)?.quantity, 

    // the following quantity will be received from the DOM, so typed string...
    setItemQuantity: (id: string, qty: string) => set((state: CartStore): CartStore | Partial<CartStore> => {
        console.log(state.cartItems);
        if (!state.cartItems.some((item: CartItem) => item.id === id)) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        id,
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

    increaseQuantity: (id: string) => set((state: CartStore) => {
        if (state.cartItems.find(item => item.id === id) == null) {
            return {
                ...state,
                cartItems: [
                    ...state.cartItems,
                    {
                        id,
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

    decreaseQuantity: (id: string) => set((state: CartStore) => {
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

    removeQuantity: (id: string) => set((state: CartStore) => {
        return {
            ...state,
            cartItems: state.cartItems.filter(item => item.id !== id)
        }
    }),

    updateFirestore: async () => {
        const { cartItems } = get();
        const currentUser = useAuthStore.getState().currentUser; // Access currentUser from authStore...
        try {
             if (currentUser) { // Check if currentUser exists
            const docRef = doc(db, 'cart', currentUser.uid);
            await setDoc(docRef, { 
                ...cartItems,
                // Other fields you want to include
            });
            console.log('Cart data updated in Firestore');
        } else {
            console.error('No current user found');
        }
        } catch (error) {
            console.error('Error updating cart data in Firestore:', error);
        }
    }
}));