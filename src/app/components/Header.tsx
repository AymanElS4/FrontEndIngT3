import { Search, User, ShoppingCart, Package } from 'lucide-react';

type HeaderProps = {
  onViewMyProducts: () => void;
  onViewCart: () => void;
  onViewProfile: () => void;
  cartItemCount: number;
  currentUserId: number;
};

export function Header({ onViewMyProducts, onViewCart, onViewProfile, cartItemCount, currentUserId }: HeaderProps) {
  return (
    <header className="bg-white border-b-2 border-gray-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl text-blue-700 mr-8">TechMarket</h1>
            <nav className="hidden md:flex space-x-1">
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Home</a>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Products</a>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Categories</a>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">About</a>
              <a href="#" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">Contact</a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-100 rounded px-3 py-1.5">
              <Search className="w-4 h-4 text-gray-500 mr-2" />
              <input 
                type="text" 
                placeholder="Search products..." 
                className="bg-transparent border-none outline-none text-sm w-48"
              />
            </div>
            
            <button 
              onClick={onViewMyProducts}
              className="flex items-center px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded"
            >
              <Package className="w-4 h-4 mr-1" />
              <span className="text-sm">Mis Productos</span>
            </button>
            
            <button 
              onClick={onViewCart}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={onViewProfile}
              className="flex items-center px-3 py-1.5 text-gray-700 hover:bg-gray-100 rounded"
            >
              <User className="w-4 h-4 mr-1" />
              <span className="text-sm">TechStore Inc</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}