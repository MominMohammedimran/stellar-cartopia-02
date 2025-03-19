
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-tighter">LUXEMART</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Premium minimalist shopping experience with curated products for the modern lifestyle.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/products/category/men" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link to="/products/category/women" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Women's Collection
                </Link>
              </li>
              <li>
                <Link to="/products/category/accessories" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products/new-arrivals" className="text-sm text-gray-600 hover:text-black transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/products/sale" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Journal
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-sm uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-medium text-sm mb-2">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 border border-gray-300 border-r-0 bg-white text-sm focus:outline-none focus:border-black rounded-l-md w-full max-w-xs"
                />
                <button className="px-4 py-2 bg-black text-white flex items-center rounded-r-md hover:bg-gray-800 transition-colors">
                  <span className="hidden sm:inline mr-2">Subscribe</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} LUXEMART. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
