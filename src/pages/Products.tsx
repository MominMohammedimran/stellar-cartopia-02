
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { ProductGrid } from '@/components/ProductGrid';
import { getProducts } from '@/api/products';
import { Product } from '@/types';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Popularity', value: 'popularity' },
];

const Products = () => {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  
  // Get unique brands, sizes, and colors from products
  const brands = [...new Set(products.map(product => product.brand))];
  const sizes = [...new Set(products.flatMap(product => product.sizes || []))];
  const colors = [...new Set(products.flatMap(product => product.colors || []))];

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

  // Filter and sort products based on selected filters
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product => selectedBrands.includes(product.brand));
    }
    
    // Filter by sizes
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes && product.sizes.some(size => selectedSizes.includes(size))
      );
    }
    
    // Filter by colors
    if (selectedColors.length > 0) {
      filtered = filtered.filter(product => 
        product.colors && product.colors.some(color => selectedColors.includes(color))
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(product => {
      const discountedPrice = product.discountPercentage > 0 
        ? product.price - (product.price * product.discountPercentage / 100) 
        : product.price;
      return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
    });
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPercentage > 0 
            ? a.price - (a.price * a.discountPercentage / 100) 
            : a.price;
          const priceB = b.discountPercentage > 0 
            ? b.price - (b.price * b.discountPercentage / 100) 
            : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPercentage > 0 
            ? a.price - (a.price * a.discountPercentage / 100) 
            : a.price;
          const priceB = b.discountPercentage > 0 
            ? b.price - (b.price * b.discountPercentage / 100) 
            : b.price;
          return priceB - priceA;
        });
        break;
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        // Products are already sorted by newest in our mock API
        break;
    }
    
    setFilteredProducts(filtered);
  }, [category, products, selectedBrands, selectedSizes, selectedColors, priceRange, sortBy]);

  // Update URL with sort parameter
  useEffect(() => {
    if (sortBy) {
      searchParams.set('sort', sortBy);
      setSearchParams(searchParams);
    }
  }, [sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size) 
        : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color]
    );
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
  };

  const hasActiveFilters = selectedBrands.length > 0 || selectedSizes.length > 0 || selectedColors.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  return (
    <div className="min-h-screen pt-20">
      <div className="container-custom py-8">
        <div className="pb-6 mb-6 border-b border-gray-200">
          <h1 className="text-3xl font-medium mb-2">
            {category 
              ? `${category.charAt(0).toUpperCase() + category.slice(1)}'s Collection` 
              : 'All Products'
            }
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filters toggle */}
          <div className="lg:hidden w-full">
            <button 
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full flex items-center justify-center gap-2 bg-gray-100 px-4 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              <SlidersHorizontal size={18} />
              <span>Filters & Sorting</span>
            </button>
          </div>
          
          {/* Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Filters</h3>
                  {hasActiveFilters && (
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Reset
                    </button>
                  )}
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Price</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input 
                      type="range"
                      min={0}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Brand Filter */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Brand</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input 
                          type="checkbox"
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label htmlFor={`brand-${brand}`} className="ml-2 text-sm text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Size Filter */}
                {sizes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`text-sm min-w-[40px] h-10 px-3 rounded-md border ${
                            selectedSizes.includes(size)
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Color Filter */}
                {colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-sm font-medium mb-2">Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                            selectedColors.includes(color)
                              ? 'border-black ring-2 ring-black ring-offset-2'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          aria-label={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Filter size={18} className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {filteredProducts.length} products
                </span>
              </div>
              
              <div className="flex items-center">
                <label htmlFor="sort-by" className="text-sm text-gray-600 mr-2">
                  Sort by:
                </label>
                <select 
                  id="sort-by"
                  value={sortBy}
                  onChange={handleSortChange}
                  className="bg-transparent text-sm border-none focus:outline-none focus:ring-0 pr-8 appearance-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={16} className="text-gray-500 -ml-6 pointer-events-none" />
              </div>
            </div>
            
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
            
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria.</p>
                <button 
                  onClick={resetFilters}
                  className="inline-flex items-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile filters modal */}
      <div className={`fixed inset-0 z-50 lg:hidden ${filtersOpen ? 'block' : 'hidden'}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setFiltersOpen(false)}></div>
        
        <div className="absolute inset-y-0 right-0 max-w-full flex">
          <div className="relative w-full max-w-xs bg-white shadow-xl">
            <div className="h-full flex flex-col overflow-y-auto">
              <div className="px-4 py-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Filters & Sorting</h2>
                  <button 
                    onClick={() => setFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              
              <div className="flex-1 px-4 py-6 space-y-6">
                {/* Sort Options */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Sort By</h3>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input 
                          type="radio"
                          id={`sort-${option.value}`}
                          name="sort-by"
                          value={option.value}
                          checked={sortBy === option.value}
                          onChange={() => setSortBy(option.value)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300"
                        />
                        <label htmlFor={`sort-${option.value}`} className="ml-2 text-sm text-gray-700">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Price</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">${priceRange[0]}</span>
                      <span className="text-sm text-gray-600">${priceRange[1]}</span>
                    </div>
                    <input 
                      type="range"
                      min={0}
                      max={500}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Brand Filter */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Brand</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center">
                        <input 
                          type="checkbox"
                          id={`mobile-brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => toggleBrand(brand)}
                          className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                        />
                        <label htmlFor={`mobile-brand-${brand}`} className="ml-2 text-sm text-gray-700">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Size Filter */}
                {sizes.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`text-sm min-w-[40px] h-10 px-3 rounded-md border ${
                            selectedSizes.includes(size)
                              ? 'border-black bg-black text-white'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Color Filter */}
                {colors.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => toggleColor(color)}
                          className={`flex items-center justify-center w-10 h-10 rounded-full border ${
                            selectedColors.includes(color)
                              ? 'border-black ring-2 ring-black ring-offset-2'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                          aria-label={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 px-4 py-6">
                <div className="flex items-center justify-between">
                  {hasActiveFilters && (
                    <button 
                      onClick={resetFilters}
                      className="text-sm text-gray-600 hover:text-black"
                    >
                      Reset All
                    </button>
                  )}
                  
                  <button
                    onClick={() => setFiltersOpen(false)}
                    className="ml-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    View Results ({filteredProducts.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
