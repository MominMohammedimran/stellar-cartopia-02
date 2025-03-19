
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-md aspect-[3/4] bg-gray-100">
          {product.discountPercentage > 0 && (
            <span className="absolute top-2 left-2 z-10 bg-black text-white text-xs font-medium px-2 py-1 rounded">
              {product.discountPercentage}% OFF
            </span>
          )}
          
          <div className="img-hover-zoom h-full">
            <img 
              src={product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
            {product.images[1] && (
              <img 
                src={product.images[1]} 
                alt={product.name} 
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </div>
          
          <div className={`absolute bottom-0 left-0 right-0 p-2 flex items-center justify-between transition-transform duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-full'}`}>
            <button 
              onClick={handleAddToCart}
              className="grow bg-white hover:bg-black hover:text-white text-sm font-medium py-2 rounded transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
          
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-opacity duration-300 hover:bg-white ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            aria-label="Add to Wishlist"
          >
            <Heart size={16} />
          </button>
        </div>
        
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-1">{product.brand}</p>
          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-sm font-medium">${product.price - (product.price * product.discountPercentage / 100)}</span>
                <span className="text-sm text-gray-500 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-sm font-medium">${product.price}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
