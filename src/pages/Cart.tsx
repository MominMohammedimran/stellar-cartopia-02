
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { CartItem } from '@/components/CartItem';
import { CartSummary } from '@/components/CartSummary';
import { useCart } from '@/contexts/CartContext';

const Cart = () => {
  const { cart } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
          
          <div className="text-center py-16 border border-dashed border-gray-300 rounded-lg">
            <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container-custom">
        <h1 className="text-3xl font-medium mb-8">Your Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-1 lg:col-span-2">
            <div className="bg-white rounded-lg overflow-hidden">
              <div className="divide-y">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex justify-between items-center">
              <Link 
                to="/products" 
                className="text-sm font-medium inline-flex items-center hover:underline"
              >
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>
          
          <div className="col-span-1">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
