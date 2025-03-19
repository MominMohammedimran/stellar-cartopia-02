
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

type CheckoutStep = 'shipping' | 'payment' | 'review';

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { toast } = useToast();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((total, item) => {
    const itemPrice = item.product.discountPercentage > 0
      ? item.product.price - (item.product.price * item.product.discountPercentage / 100)
      : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const shippingCost = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.07; // 7% tax
  const total = subtotal + shippingCost + tax;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeToTerms) {
      toast({
        title: "Terms and Conditions",
        description: "Please agree to the terms and conditions to place your order.",
        variant: "destructive",
      });
      return;
    }
    
    // Process order
    toast({
      title: "Order Placed Successfully!",
      description: "Your order has been placed and will be processed soon.",
    });
    
    // Clear cart and redirect to success page
    clearCart();
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, formType: 'shipping' | 'payment') => {
    const { name, value } = e.target;
    
    if (formType === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container-custom max-w-6xl">
        <h1 className="text-3xl font-medium mb-8">Checkout</h1>
        
        {/* Checkout Progress */}
        <div className="mb-10">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep === 'shipping' ? 'bg-black text-white' : 'bg-green-500 text-white'
            }`}>
              {currentStep === 'shipping' ? 1 : <Check size={20} />}
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              currentStep === 'shipping' ? 'bg-gray-300' : 'bg-green-500'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep === 'payment' ? 'bg-black text-white' : 
              currentStep === 'review' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {currentStep === 'payment' ? 2 : currentStep === 'review' ? <Check size={20} /> : 2}
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              currentStep === 'review' ? 'bg-green-500' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep === 'review' ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="font-medium">Shipping</span>
            <span className="font-medium">Payment</span>
            <span className="font-medium">Review</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center mb-6">
                  <Truck size={24} className="text-gray-700 mr-3" />
                  <h2 className="text-xl font-medium">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2">
                      <label htmlFor="fullName" className="block text-sm font-medium mb-1">
                        Full Name*
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={shippingInfo.fullName}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="streetAddress" className="block text-sm font-medium mb-1">
                        Street Address*
                      </label>
                      <input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        value={shippingInfo.streetAddress}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-1">
                        City*
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium mb-1">
                        State/Province*
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
                        Postal Code*
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium mb-1">
                        Country*
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={shippingInfo.country}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium mb-1">
                        Phone Number*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Payment Form */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg p-6 border">
                <div className="flex items-center mb-6">
                  <CreditCard size={24} className="text-gray-700 mr-3" />
                  <h2 className="text-xl font-medium">Payment Method</h2>
                </div>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="col-span-2">
                      <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                        Card Number*
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label htmlFor="nameOnCard" className="block text-sm font-medium mb-1">
                        Name on Card*
                      </label>
                      <input
                        type="text"
                        id="nameOnCard"
                        name="nameOnCard"
                        value={paymentInfo.nameOnCard}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium mb-1">
                        Expiry Date*
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        placeholder="MM/YY"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                        CVV*
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={(e) => handleInputChange(e, 'payment')}
                        placeholder="123"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Order Review */}
            {currentStep === 'review' && (
              <div className="bg-white rounded-lg p-6 border">
                <h2 className="text-xl font-medium mb-6">Review Your Order</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Shipping Information</h3>
                  <div className="text-gray-600">
                    <p>{shippingInfo.fullName}</p>
                    <p>{shippingInfo.streetAddress}</p>
                    <p>{`${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.postalCode}`}</p>
                    <p>{shippingInfo.country}</p>
                    <p>Phone: {shippingInfo.phone}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Payment Method</h3>
                  <div className="text-gray-600">
                    <p>Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                    <p>Expires: {paymentInfo.expiryDate}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Order Items</h3>
                  <div className="divide-y">
                    {cart.map((item) => (
                      <div key={item.id} className="py-3 flex items-center">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden mr-4">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <div className="text-sm text-gray-600">
                            {item.size && <span className="mr-3">Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          <div className="text-sm text-gray-600">
                            Qty: {item.quantity} × ${item.product.discountPercentage > 0
                              ? (item.product.price - (item.product.price * item.product.discountPercentage / 100)).toFixed(2)
                              : item.product.price.toFixed(2)
                            }
                          </div>
                        </div>
                        <div className="font-medium">
                          ${(item.quantity * (item.product.discountPercentage > 0
                            ? (item.product.price - (item.product.price * item.product.discountPercentage / 100))
                            : item.product.price
                          )).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={() => setAgreeToTerms(!agreeToTerms)}
                      className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                      I agree to the <a href="#" className="text-black underline">Terms and Conditions</a> and <a href="#" className="text-black underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  {!agreeToTerms && (
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <AlertTriangle size={16} className="mr-1" />
                      Please agree to the terms and conditions to place your order.
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setCurrentStep('payment')}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 border sticky top-24">
              <h3 className="text-lg font-medium mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Shipping options */}
              {currentStep === 'shipping' && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Shipping Method</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="standard"
                          name="shipping-method"
                          checked
                          readOnly
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <label htmlFor="standard" className="ml-2 text-sm">
                          Standard Shipping
                        </label>
                      </div>
                      <span className="text-sm font-medium">
                        {subtotal > 100 ? 'Free' : '$10.00'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 border border-gray-300 rounded-md bg-white opacity-50 cursor-not-allowed">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="express"
                          name="shipping-method"
                          disabled
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <label htmlFor="express" className="ml-2 text-sm">
                          Express Shipping
                        </label>
                      </div>
                      <span className="text-sm font-medium">$15.00</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Free standard shipping on orders over $100.
                  </p>
                </div>
              )}
              
              {/* Promo code */}
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Promo Code</h4>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-r-md hover:bg-gray-300 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                By proceeding with your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
