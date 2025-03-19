
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { CartItemType } from '@/types';

type CartItemProps = {
  item: CartItemType;
};

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity, size, color } = item;
  
  return (
    <div className="flex py-6 border-b border-gray-100">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between">
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.brand}
            </p>
            <div className="mt-1 flex text-xs text-gray-500">
              {size && <span className="mr-4">Size: {size}</span>}
              {color && <span>Color: {color}</span>}
            </div>
          </div>
          <p className="text-sm font-medium">
            ${product.discountPercentage > 0 
              ? (product.price - (product.price * product.discountPercentage / 100)).toFixed(2) 
              : product.price.toFixed(2)
            }
          </p>
        </div>
        
        <div className="flex flex-1 items-end justify-between">
          <div className="flex items-center border border-gray-200 rounded">
            <button 
              onClick={() => updateQuantity(item, Math.max(1, quantity - 1))}
              className="p-1 text-gray-600 hover:text-black transition-colors"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="px-2 text-sm">{quantity}</span>
            <button 
              onClick={() => updateQuantity(item, quantity + 1)}
              className="p-1 text-gray-600 hover:text-black transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item)}
            className="text-gray-600 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
