
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ChevronDown, ChevronUp, Check, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { getProductById } from '@/api/products';
import { Product } from '@/types';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const data = await getProductById(id);
        setProduct(data);
        
        // Set default selected size and color if available
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
        
        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
        toast({
          title: "Error",
          description: "Failed to load product details.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        description: "Size selection is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        description: "Color selection is required.",
        variant: "destructive",
      });
      return;
    }
    
    addToCart(product, quantity, selectedSize || undefined, selectedColor || undefined);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 px-4">
        <div className="container-custom">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 my-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded my-8"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-medium mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link 
            to="/products" 
            className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = product.discountPercentage > 0 
    ? product.price - (product.price * product.discountPercentage / 100) 
    : product.price;

  return (
    <div className="min-h-screen pt-24 px-4 pb-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden bg-gray-100 rounded-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-gray-100 rounded overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - View ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-6">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Link to="/products" className="hover:underline">Products</Link>
                <span className="mx-2">/</span>
                <Link to={`/products/category/${product.category.toLowerCase()}`} className="hover:underline">
                  {product.category}
                </Link>
              </div>
              
              <h1 className="text-3xl font-medium mb-2">{product.name}</h1>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="text-sm text-gray-600 mr-4">{product.brand}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-medium">
                  ${discountedPrice.toFixed(2)}
                </span>
                
                {product.discountPercentage > 0 && (
                  <>
                    <span className="ml-3 text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="ml-2 bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
              
              {product.stock <= 5 && (
                <p className="text-sm text-red-600 mt-2">
                  Only {product.stock} items left in stock!
                </p>
              )}
            </div>
            
            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Size <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[50px] h-11 px-4 text-sm rounded-md border ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Color <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedColor === color
                          ? 'ring-2 ring-black ring-offset-2'
                          : ''
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      {selectedColor === color && (
                        <Check size={16} className={`${color.toLowerCase() === 'white' ? 'text-black' : 'text-white'}`} />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Quantity and Add to Cart */}
            <div className="flex items-center mb-6">
              <div className="flex items-center border border-gray-300 rounded-md mr-4">
                <button 
                  onClick={decreaseQuantity} 
                  className="px-3 py-2 text-gray-600 hover:text-black transition-colors"
                  disabled={quantity <= 1}
                >
                  <ChevronDown size={16} />
                </button>
                <span className="w-10 text-center">{quantity}</span>
                <button 
                  onClick={increaseQuantity} 
                  className="px-3 py-2 text-gray-600 hover:text-black transition-colors"
                >
                  <ChevronUp size={16} />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
                disabled={product.stock === 0}
              >
                <ShoppingCart size={18} />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
            
            {/* Wishlist and Share */}
            <div className="flex mb-8">
              <button className="flex items-center mr-6 text-sm text-gray-600 hover:text-black transition-colors">
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </button>
              <button className="flex items-center text-sm text-gray-600 hover:text-black transition-colors">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>
            
            {/* Product Details Accordion */}
            <div className="border-t border-gray-200">
              <button 
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full py-4 flex items-center justify-between hover:text-gray-500 transition-colors"
              >
                <span className="font-medium">Product Details</span>
                {detailsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${detailsOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 text-sm text-gray-600 space-y-4">
                  <p>{product.description}</p>
                  
                  <ul className="list-disc list-inside">
                    {product.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Shipping & Returns Accordion */}
            <div className="border-t border-gray-200">
              <button 
                onClick={() => setShippingOpen(!shippingOpen)}
                className="w-full py-4 flex items-center justify-between hover:text-gray-500 transition-colors"
              >
                <span className="font-medium">Shipping & Returns</span>
                {shippingOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${shippingOpen ? 'max-h-96' : 'max-h-0'}`}>
                <div className="pb-4 text-sm text-gray-600 space-y-4">
                  <p>Free standard shipping on all orders over $100. Delivery time is typically 3-5 business days.</p>
                  <p>We offer a 30-day return policy. Items must be unworn and in original condition with tags attached. Return shipping costs are the responsibility of the customer.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabs Section */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="text-gray-700 space-y-6">
              <h3 className="text-xl font-medium">Product Description</h3>
              <p>{product.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-medium mb-2">Features</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {product.tags.map((tag, index) => (
                      <li key={index}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-medium mb-2">Product Details</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li><span className="font-medium">Brand:</span> {product.brand}</li>
                    <li><span className="font-medium">Category:</span> {product.category}</li>
                    {product.colors && (
                      <li>
                        <span className="font-medium">Available Colors:</span>{' '}
                        {product.colors.join(', ')}
                      </li>
                    )}
                    {product.sizes && (
                      <li>
                        <span className="font-medium">Available Sizes:</span>{' '}
                        {product.sizes.join(', ')}
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="shipping" className="text-gray-700 space-y-6">
              <h3 className="text-xl font-medium">Shipping Information</h3>
              <div className="space-y-4">
                <p>We offer the following shipping options for all orders:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="font-medium w-40">Standard Shipping:</span>
                    <span>3-5 business days, free on orders over $100 ($5 otherwise)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-40">Express Shipping:</span>
                    <span>1-2 business days, $15</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-medium w-40">Next Day Delivery:</span>
                    <span>Next business day (order before 2pm), $25</span>
                  </li>
                </ul>
              </div>
              
              <h3 className="text-xl font-medium">Returns & Exchanges</h3>
              <div className="space-y-4">
                <p>We want you to be completely satisfied with your purchase. If for any reason you're not happy with your order, we offer a simple return process:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Items must be returned within 30 days of delivery</li>
                  <li>Products must be unworn and in original condition with tags attached</li>
                  <li>Return shipping costs are the responsibility of the customer</li>
                  <li>Exchanges can be requested for different sizes or colors</li>
                  <li>Refunds are processed within 5-7 business days after we receive your return</li>
                </ul>
                <p>To initiate a return or exchange, please contact our customer service team.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="text-gray-700">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <h3 className="text-xl font-medium mb-4">Customer Reviews</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-lg font-medium">{product.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Based on 24 reviews</p>
                  <button className="btn-secondary">Write a Review</button>
                </div>
                
                <div className="md:w-2/3">
                  <div className="space-y-6">
                    {/* Sample reviews */}
                    <div className="border-b pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Great product!</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Sarah J. - 2 weeks ago</p>
                      <p className="text-sm">
                        Excellent quality and fits perfectly. The material is comfortable and the design is very stylish. 
                        Would definitely recommend!
                      </p>
                    </div>
                    
                    <div>
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm font-medium">Good value</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Michael T. - 1 month ago</p>
                      <p className="text-sm">
                        The product arrived quickly and was exactly as described. The quality is good for the price, 
                        though I wish there were more color options available.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
