
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialog, setAuthDialog] = useState<'signIn' | 'signUp' | null>(null);
  const { cart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-semibold tracking-tighter">
              LUXEMART
            </Link>
            
            <nav className="hidden lg:flex items-center space-x-8">
              <Link 
                to="/products" 
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                Shop All
              </Link>
              <Link 
                to="/products/category/men" 
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                Men
              </Link>
              <Link 
                to="/products/category/women" 
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                Women
              </Link>
              <Link 
                to="/products/category/accessories" 
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                Accessories
              </Link>
              <Link 
                to="/about" 
                className="text-sm font-medium text-gray-800 hover:text-black transition-colors"
              >
                About
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSearch} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <Link 
              to="/wishlist" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            
            {user ? (
              <Link 
                to="/account" 
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="My Account"
              >
                <User size={20} />
              </Link>
            ) : (
              <button
                onClick={() => setAuthDialog('signIn')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Sign In"
              >
                <User size={20} />
              </button>
            )}
            
            <Link 
              to="/cart" 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-px min-w-[18px] h-[18px] flex items-center justify-center bg-black text-white text-[10px] font-semibold rounded-full">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        
        {/* Search overlay */}
        <div className={`absolute top-full left-0 w-full bg-white border-b border-gray-200 py-4 transform transition-transform duration-300 ${
          searchOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}>
          <div className="container-custom">
            <div className="relative flex items-center">
              <Search size={20} className="absolute left-3 text-gray-400" />
              <input
                id="search-input"
                type="text"
                placeholder="Search for products..."
                className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-200 focus:border-black focus:outline-none transition-colors bg-transparent"
                onKeyDown={(e) => e.key === 'Escape' && toggleSearch()}
              />
              <button 
                className="absolute right-0 p-2 text-gray-500 hover:text-black transition-colors"
                onClick={toggleSearch}
                aria-label="Close Search"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-40 bg-white transform transition-transform duration-300 lg:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="text-xl font-semibold tracking-tighter" onClick={() => setMobileMenuOpen(false)}>
              LUXEMART
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close Menu"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              <Link 
                to="/products" 
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop All
              </Link>
              <Link 
                to="/products/category/men" 
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Men
              </Link>
              <Link 
                to="/products/category/women" 
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Women
              </Link>
              <Link 
                to="/products/category/accessories" 
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accessories
              </Link>
              <Link 
                to="/about" 
                className="block text-lg font-medium py-2 border-b border-gray-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              
              <div className="pt-6 space-y-4">
                <Link 
                  to="/wishlist" 
                  className="flex items-center gap-3 text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart size={20} />
                  <span>Wishlist</span>
                </Link>
                
                {user ? (
                  <Link 
                    to="/account" 
                    className="flex items-center gap-3 text-gray-800"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={20} />
                    <span>My Account</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthDialog('signIn');
                    }}
                    className="flex items-center gap-3 text-gray-800"
                  >
                    <User size={20} />
                    <span>Sign In</span>
                  </button>
                )}
                
                <Link 
                  to="/cart" 
                  className="flex items-center gap-3 text-gray-800"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingCart size={20} />
                  <span>Cart ({cartItemsCount})</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Authentication dialogs */}
      <Dialog open={authDialog !== null} onOpenChange={(open) => !open && setAuthDialog(null)}>
        <DialogContent className="sm:max-w-[425px] rounded-lg p-0 overflow-hidden">
          {authDialog === 'signIn' ? (
            <SignInForm onSignUp={() => setAuthDialog('signUp')} />
          ) : (
            <SignUpForm onSignIn={() => setAuthDialog('signIn')} />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
