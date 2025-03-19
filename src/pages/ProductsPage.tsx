
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/api/products';
import { Product } from '@/types';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersVisible, setFiltersVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const allProducts = await getProducts();
        setProducts(allProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div className="container-custom py-12">
      <div className="flex flex-col space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="text-gray-500 hover:text-black transition-colors">Home</Link>
            </li>
            <li className="text-gray-500">/</li>
            <li className="font-medium">Products</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <h1 className="text-3xl font-medium">All Products</h1>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center gap-2 md:hidden"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
            
            <div className="flex items-center gap-2 border border-gray-200 px-3 py-2 rounded-md">
              <SlidersHorizontal size={18} />
              <span className="text-sm">Sort by:</span>
              <select className="text-sm appearance-none bg-transparent border-none focus:outline-none pr-4">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Men's</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Women's</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Accessories</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Footwear</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Under $50</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>$50 to $100</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>$100 to $200</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Over $200</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Nike</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Adidas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Puma</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Levi's</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="md:col-span-3">
            <ProductGrid products={products} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
