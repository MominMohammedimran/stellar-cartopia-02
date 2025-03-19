
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/api/products';
import { Product } from '@/types';

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        
        // Get featured products
        const featured = allProducts.slice(0, 4);
        setFeaturedProducts(featured);
        
        // Get trending products
        const trending = allProducts.slice(4, 12);
        setTrendingProducts(trending);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/10 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1588118815274-dde8a4e706f1?q=80&w=2574&auto=format&fit=crop" 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container-custom relative z-20 flex flex-col justify-center h-full">
          <div className="max-w-2xl animate-reveal stagger-1">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-white mb-4 tracking-tight">
              Elevate Your Style
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              Discover our premium collection of minimalist fashion designed for the modern lifestyle.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/products" 
                className="inline-flex items-center px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors"
              >
                <span>Shop Now</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link 
                to="/products/new-arrivals" 
                className="inline-flex items-center px-6 py-3 bg-transparent border border-white text-white font-medium rounded-md hover:bg-white/10 transition-colors"
              >
                <span>New Arrivals</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Categories */}
      <section className="py-24">
        <div className="container-custom">
          <h2 className="text-3xl font-medium mb-12 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products/category/men" className="group relative rounded-lg overflow-hidden aspect-[3/4]">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1617196701537-7329482cc9fe?q=80&w=2574&auto=format&fit=crop" 
                alt="Men's Collection" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-medium text-white mb-2">Men's Collection</h3>
                <div className="inline-flex items-center text-white">
                  <span>Shop Now</span>
                  <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
            
            <Link to="/products/category/women" className="group relative rounded-lg overflow-hidden aspect-[3/4]">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1588366626977-f4f1e0c7b2d0?q=80&w=2574&auto=format&fit=crop" 
                alt="Women's Collection" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-medium text-white mb-2">Women's Collection</h3>
                <div className="inline-flex items-center text-white">
                  <span>Shop Now</span>
                  <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
            
            <Link to="/products/category/accessories" className="group relative rounded-lg overflow-hidden aspect-[3/4]">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=2670&auto=format&fit=crop" 
                alt="Accessories" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-medium text-white mb-2">Accessories</h3>
                <div className="inline-flex items-center text-white">
                  <span>Shop Now</span>
                  <ArrowUpRight size={16} className="ml-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-medium">Featured Products</h2>
            <Link 
              to="/products" 
              className="inline-flex items-center text-sm font-medium hover:text-gray-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        </div>
      </section>
      
      {/* Minimal Banner */}
      <section className="py-24 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="max-w-md mx-auto md:ml-0">
                <h2 className="text-3xl font-medium mb-4">Sustainable Fashion</h2>
                <p className="text-gray-600 mb-6">
                  Our commitment to sustainability is at the core of everything we do. 
                  Each piece is crafted with care using eco-friendly materials and ethical 
                  production methods to reduce our impact on the planet.
                </p>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-sm font-medium border-b border-black pb-1 hover:text-gray-700 hover:border-gray-700 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative aspect-square rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1682686581030-7fa4ea2b96c3?q=80&w=1470&auto=format&fit=crop" 
                  alt="Sustainable Fashion" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-medium">Trending Now</h2>
            <Link 
              to="/products" 
              className="inline-flex items-center text-sm font-medium hover:text-gray-700 transition-colors"
            >
              <span>View All</span>
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <ProductGrid products={trendingProducts} isLoading={isLoading} />
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-24 bg-black text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-medium mb-4">Join Our Newsletter</h2>
            <p className="text-white/80 mb-8">
              Sign up to receive updates on new arrivals, special offers, and exclusive content.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:bg-white/15"
                required
              />
              <button 
                type="submit" 
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-white/90 transition-colors flex-shrink-0"
              >
                Subscribe
              </button>
            </form>
            
            <p className="text-xs text-white/60 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
