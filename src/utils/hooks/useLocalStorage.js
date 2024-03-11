import { useState, useEffect } from "react";

const useLocalStorage = (key, initValue) => {
    // const {cartItems} = useShoppingCart();
    // const dataFromLocalStorage = JSON.parse(localStorage.getItem("cart_items"));
    const [cartItemsFromLocalStorage, setCartItemsFromLocalStorage] = useState(() => {
        const jsonValue = localStorage.getItem(key);

        if (jsonValue !== null) return JSON.parse(jsonValue);

        return (typeof initValue === 'function') ? initValue() : initValue;
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(cartItemsFromLocalStorage));
        }, 250);

        return () => clearTimeout(timer);
    }, [cartItemsFromLocalStorage, setCartItemsFromLocalStorage]);

    return [cartItemsFromLocalStorage, setCartItemsFromLocalStorage];
}

export default useLocalStorage;