
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CartSummary = () => {
  const { cart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const navigate = useNavigate();
  
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = item.product.discountPercentage > 0 
      ? item.product.price - (item.product.price * item.product.discountPercentage / 100) 
      : item.product.price;
    return acc + (itemPrice * item.quantity);
  }, 0);
  
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal - discount + shipping;
  
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toLowerCase() === 'discount10') {
      setCouponApplied(true);
    }
  };
  
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {couponApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount (10%)</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <div className="border-t border-gray-200 pt-3 flex justify-between font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      <form onSubmit={handleApplyCoupon} className="mb-4">
        <div className="flex mb-1">
          <input 
            type="text" 
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Promo code" 
            className="flex-1 px-3 py-2 text-sm border border-gray-300 border-r-0 rounded-l-md focus:outline-none"
            disabled={couponApplied}
          />
          <button 
            type="submit"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded-r-md hover:bg-black transition-colors disabled:bg-gray-400"
            disabled={couponApplied || !couponCode}
          >
            Apply
          </button>
        </div>
        {couponApplied && (
          <p className="text-xs text-green-600">Coupon applied: 10% discount</p>
        )}
        <p className="text-xs text-gray-500 mt-1">Try "DISCOUNT10" for 10% off</p>
      </form>
      
      <button 
        onClick={() => navigate('/checkout')}
        className="w-full btn-primary py-3"
        disabled={cart.length === 0}
      >
        Checkout
      </button>
      
      <p className="text-xs text-center text-gray-500 mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  );
};
