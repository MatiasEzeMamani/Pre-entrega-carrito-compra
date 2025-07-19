import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const storedItems = localStorage.getItem('cartItems');
            return storedItems ? JSON.parse(storedItems) : [];
        } catch (error) {
            console.error("Error parsing cart items from localStorage:", error);
            return [];
        }
    });

    const [showCartNotification, setShowCartNotification] = useState(false);
    const [lastAddedProductTitle, setLastAddedProductTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

 
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0); 

    const addToCart = useCallback((product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
        setLastAddedProductTitle(product.title);
        setShowCartNotification(true); 
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    }, []);

    const incrementQuantity = useCallback((productId) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }, []);

    const decrementQuantity = useCallback((productId) => {
        setCartItems(prevItems => 
            prevItems.map(item => 
                item.id === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            ).filter(item => item.quantity > 0) 
        );
    }, []);

    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

  
    const clearNotification = useCallback(() => {
        setShowCartNotification(false);
        setLastAddedProductTitle('');
    }, []);

    const getTotalPrice = () => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    };

    const value = {
        cartItems,
        cartCount, 
        addToCart,
        removeFromCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        getTotalPrice,
        showCartNotification,
        lastAddedProductTitle,
        clearNotification
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};