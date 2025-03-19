
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Truck, ArrowLeft, Heart, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { getProducts } from '@/api/products';
import { Product } from '@/types';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        const foundProduct = allProducts.find(p => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          setSelectedImage(foundProduct.images[0]);
          if (foundProduct.sizes && foundProduct.sizes.length > 0) {
            setSelectedSize(foundProduct.sizes[0]);
          }
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0]);
          }
        }
      } catch (error) {
        console.error('Failed to fetch product', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-medium">Product not found</h2>
        <p className="mt-4 text-gray-600">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products" className="btn-primary mt-6">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-8">
        <ol className="flex items-center space-x-2">
          <li>
            <Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li>
            <Link to="/products" className="text-gray-500 hover:text-black transition-colors">Products</Link>
          </li>
          <li className="text-gray-500">/</li>
          <li className="font-medium truncate max-w-[200px]">{product.name}</li>
        </ol>
      </nav>

      {/* Back Button (Mobile) */}
      <div className="md:hidden mb-6">
        <Link to="/products" className="inline-flex items-center text-sm">
          <ArrowLeft size={16} className="mr-2" />
          Back to products
        </Link>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={selectedImage} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <button 
                key={index}
                className={`aspect-square bg-gray-50 rounded-md overflow-hidden ${selectedImage === image ? 'ring-2 ring-black' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img 
                  src={image} 
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        
        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  size={18}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating.toFixed(1)})</span>
          </div>
          
          <div className="flex items-center gap-4">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-2xl font-medium">
                  ${(product.price - (product.price * product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-gray-500 line-through">${product.price.toFixed(2)}</span>
                <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-2xl font-medium">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <p className="text-gray-700">{product.description}</p>
          </div>
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium mb-3">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full relative ${selectedColor === color ? 'ring-2 ring-black ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    aria-label={`Color: ${color}`}
                  >
                    {selectedColor === color && (
                      <span className="absolute inset-0 flex items-center justify-center">
                        <Check size={16} className={`${['white', 'yellow', 'beige'].includes(color.toLowerCase()) ? 'text-black' : 'text-white'}`} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium">Size</h3>
                <button className="text-sm text-gray-500 hover:text-black transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 border rounded-md min-w-[40px] text-center text-sm ${
                      selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium mb-3">Quantity</h3>
            <div className="flex items-center border border-gray-200 rounded-md w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-black transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-3 py-2 flex-1 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-black transition-colors"
              >
                +
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 btn-primary py-3 flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            
            <button className="sm:w-12 h-12 border border-gray-200 rounded-md flex items-center justify-center hover:border-gray-300 transition-colors">
              <Heart size={20} className="text-gray-700" />
            </button>
          </div>
          
          {/* Stock & Shipping */}
          <div className="space-y-2 pt-4">
            <div className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-green-600" />
              <span className="text-gray-700">
                <span className="font-medium">In Stock</span> - {product.stock} items available
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck size={16} className="text-gray-600" />
              <span className="text-gray-700">Free shipping on orders over $100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
