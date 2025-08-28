import { useState } from 'react';
import { CartItem } from '../types';

const useCart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== id));
    };

    const updateQuantity = (id: number, quantity: number) => {
        setCartItems(prevItems => 
            prevItems.map(cartItem =>
                cartItem.id === id ? { ...cartItem, quantity } : cartItem
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
    };
};

export default useCart;