import { useState } from 'react';
import { Plus, Search, Filter, DollarSign } from 'lucide-react';
import { Product } from '../App';
import { ProductCard } from './ProductCard';

const mockProducts: Product[] = [
  {
    id: 1,
    name: 'MacBook Pro 16" M2',
    category: 'Laptops',
    brand: 'Apple',
    model: 'MacBook Pro 16" 2023',
    price: 2499,
    condition: 'New',
    seller: 'TechStore Inc',
    sellerId: 1,
    location: 'New York, NY',
    description: 'Brand new MacBook Pro with M2 chip, 16GB RAM, 512GB SSD',
    specifications: 'M2 chip, 16GB RAM, 512GB SSD, 16" Retina Display',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    datePosted: '2024-12-10',
    status: 'active'
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    category: 'Smartphones',
    brand: 'Apple',
    model: 'iPhone 15 Pro Max',
    price: 1199,
    condition: 'Like New',
    seller: 'Mobile World',
    sellerId: 2,
    location: 'Los Angeles, CA',
    description: '256GB, Titanium Blue, with warranty',
    specifications: '256GB, A17 Pro chip, Titanium Blue, ProRes video',
    image: 'https://images.unsplash.com/photo-1592286927505-2fd0fcb4c061?w=800',
    datePosted: '2024-12-12',
    status: 'active'
  },
  {
    id: 3,
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Smartphones',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    price: 1099,
    condition: 'New',
    seller: 'GadgetHub',
    sellerId: 3,
    location: 'Chicago, IL',
    description: '512GB storage, comes with S Pen',
    specifications: '512GB, Snapdragon 8 Gen 3, 200MP camera, S Pen included',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
    datePosted: '2024-12-13',
    status: 'active'
  },
  {
    id: 4,
    name: 'Dell XPS 15',
    category: 'Laptops',
    brand: 'Dell',
    model: 'XPS 15 9520',
    price: 1799,
    condition: 'Used',
    seller: 'PC Marketplace',
    sellerId: 4,
    location: 'Austin, TX',
    description: 'Intel i7, 16GB RAM, NVIDIA RTX 3050',
    specifications: 'Intel i7-12700H, 16GB RAM, RTX 3050, 15.6" FHD+',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800',
    datePosted: '2024-12-11',
    status: 'active'
  },
  {
    id: 5,
    name: 'Sony WH-1000XM5',
    category: 'Audio',
    brand: 'Sony',
    model: 'WH-1000XM5',
    price: 349,
    condition: 'New',
    seller: 'Audio Pro',
    sellerId: 5,
    location: 'Seattle, WA',
    description: 'Premium noise-canceling headphones',
    specifications: 'Active Noise Cancellation, 30hr battery, LDAC support',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
    datePosted: '2024-12-14',
    status: 'active'
  },
  {
    id: 6,
    name: 'iPad Pro 12.9"',
    category: 'Tablets',
    brand: 'Apple',
    model: 'iPad Pro 12.9" M2',
    price: 999,
    condition: 'Like New',
    seller: 'Apple Reseller',
    sellerId: 6,
    location: 'Miami, FL',
    description: 'M2 chip, 256GB, with Magic Keyboard',
    specifications: 'M2 chip, 256GB, 12.9" Liquid Retina XDR, Magic Keyboard',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    datePosted: '2024-12-09',
    status: 'active'
  },
  {
    id: 7,
    name: 'Gaming PC RTX 4080',
    category: 'Desktop Computers',
    brand: 'Custom Build',
    model: 'Gaming PC 2024',
    price: 2199,
    condition: 'New',
    seller: 'Gaming Central',
    sellerId: 7,
    location: 'Denver, CO',
    description: 'Custom built gaming PC, Intel i9, 32GB RAM',
    specifications: 'Intel i9-13900K, RTX 4080, 32GB DDR5, 2TB NVMe SSD',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=800',
    datePosted: '2024-12-08',
    status: 'active'
  },
  {
    id: 8,
    name: 'Canon EOS R5',
    category: 'Cameras',
    brand: 'Canon',
    model: 'EOS R5',
    price: 3399,
    condition: 'Used',
    seller: 'Photo Pro',
    sellerId: 8,
    location: 'Portland, OR',
    description: 'Professional mirrorless camera with 24-105mm lens',
    specifications: '45MP Full-Frame, 8K video, RF 24-105mm f/4L IS USM',
    image: 'https://images.unsplash.com/photo-1606980623314-9f7b43acd4b5?w=800',
    datePosted: '2024-12-07',
    status: 'active'
  }
];

type ProductGridProps = {
  onViewProduct: (product: Product) => void;
  onCreateProduct: () => void;
};

export function ProductGrid({ onViewProduct, onCreateProduct }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCondition, setSelectedCondition] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const categories = ['All', 'Laptops', 'Smartphones', 'Tablets', 'Audio', 'Cameras', 'Desktop Computers'];
  const brands = ['All', 'Apple', 'Samsung', 'Dell', 'Sony', 'Canon', 'Custom Build'];
  const conditions = ['All', 'New', 'Like New', 'Used'];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || product.brand === selectedBrand;
    const matchesCondition = selectedCondition === 'All' || product.condition === selectedCondition;
    
    const min = minPrice ? parseFloat(minPrice) : 0;
    const max = maxPrice ? parseFloat(maxPrice) : Infinity;
    const matchesPrice = product.price >= min && product.price <= max;
    
    const isActive = product.status === 'active';
    
    return matchesSearch && matchesCategory && matchesBrand && matchesCondition && matchesPrice && isActive;
  });

  return (
    <div>
      <div className="bg-white border border-gray-300 rounded mb-4">
        <div className="border-b border-gray-300 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg text-gray-800">Products</h2>
          <button 
            onClick={onCreateProduct}
            className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Create Product
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Brand</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Condition</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
              >
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-700 mb-1">Price Range</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-1/2 px-2 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>
          </div>
          
          <div className="text-sm text-gray-600 mb-3">
            Showing {filteredProducts.length} products
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                product={product}
                onClick={() => onViewProduct(product)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { mockProducts };