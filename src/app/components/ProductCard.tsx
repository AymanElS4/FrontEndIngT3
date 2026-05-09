import { MapPin, Calendar } from 'lucide-react';
import { Product } from '../App';

type ProductCardProps = {
  product: Product;
  onClick: () => void;
};

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={onClick}
      className="border border-gray-300 rounded bg-white hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-3">
        <h3 className="text-blue-700 hover:underline mb-1">{product.name}</h3>
        
        <div className="text-green-700 text-lg mb-2">
          ${product.price.toLocaleString()}
        </div>
        
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex items-center">
            <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs mr-2">
              {product.condition}
            </span>
            <span className="text-gray-500">{product.category}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            {product.location}
          </div>
          
          <div className="flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {product.datePosted}
          </div>
        </div>
      </div>
    </div>
  );
}
