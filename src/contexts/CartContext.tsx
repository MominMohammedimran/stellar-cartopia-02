
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CartItemType, Product } from '@/types';

type CartContextType = {
  cart: CartItemType[];
  addToCart: (product: Product, quantity?: number, size?: string, color?: string) => void;
  removeFromCart: (item: CartItemType) => void;
  updateQuantity: (item: CartItemType, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1, size?: string, color?: string) => {
    setCart(prevCart => {
      // Check if the item already exists in the cart with the same product, size, and color
      const existingItemIndex = prevCart.findIndex(item => 
        item.product.id === product.id && 
        item.size === size && 
        item.color === color
      );

      if (existingItemIndex >= 0) {
        // If it exists, update the quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // If it doesn't exist, add it to the cart
        return [...prevCart, {
          id: uuidv4(),
          product,
          quantity,
          size,
          color
        }];
      }
    });
  };

  const removeFromCart = (item: CartItemType) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.id !== item.id));
  };

  const updateQuantity = (item: CartItemType, quantity: number) => {
    if (quantity <= 0) return;
    
    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity } 
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
