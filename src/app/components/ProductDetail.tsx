import { ArrowLeft, MapPin, Calendar, User, Tag, Package, Star, MessageCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../App';
import { getUserById } from '../data/mockUsers';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
  onViewProfile: (userId: number) => void;
  onLeaveReview: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  currentUserId: number;
};

export function ProductDetail({ product, onBack, onViewProfile, onLeaveReview, onAddToCart, currentUserId }: ProductDetailProps) {
  const seller = getUserById(product.sellerId);
  const isOwnProduct = product.sellerId === currentUserId;
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3 h-3 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Products
      </button>
      
      <div className="bg-white border border-gray-300 rounded">
        <div className="border-b border-gray-300 px-4 py-3">
          <h2 className="text-lg text-gray-800">Product Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="border border-gray-300 rounded overflow-hidden mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl text-gray-900 mb-4">{product.name}</h1>
              
              <div className="border border-gray-300 rounded p-4 mb-4 bg-gray-50">
                <div className="text-3xl text-green-700 mb-2">
                  ${product.price.toLocaleString()}
                </div>
                {!isOwnProduct && (
                  <>
                    <button 
                      onClick={() => onAddToCart(product)}
                      className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded mb-2 flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al Carrito
                    </button>
                    <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded mb-2">
                      Contactar Vendedor
                    </button>
                    <button 
                      onClick={() => onLeaveReview(product)}
                      className="w-full px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded flex items-center justify-center"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Dejar Reseña
                    </button>
                  </>
                )}
                {isOwnProduct && (
                  <div className="text-sm text-gray-600 text-center py-2">
                    Este es tu producto
                  </div>
                )}
              </div>
              
              <table className="w-full border border-gray-300 mb-4">
                <tbody>
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300 w-1/3">
                      <div className="flex items-center text-sm text-gray-700">
                        <Tag className="w-4 h-4 mr-2" />
                        Category
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.category}</td>
                  </tr>
                  
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <Tag className="w-4 h-4 mr-2" />
                        Marca
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.brand}</td>
                  </tr>
                  
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <Tag className="w-4 h-4 mr-2" />
                        Modelo
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.model}</td>
                  </tr>
                  
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <Package className="w-4 h-4 mr-2" />
                        Condition
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {product.condition}
                      </span>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <User className="w-4 h-4 mr-2" />
                        Seller
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm">{product.seller}</div>
                          {seller && (
                            <div className="flex items-center gap-1 mt-1">
                              {renderStars(Math.round(seller.rating))}
                              <span className="text-xs text-gray-600 ml-1">
                                {seller.rating.toFixed(1)} ({seller.totalSales} ventas)
                              </span>
                            </div>
                          )}
                        </div>
                        {seller && (
                          <button
                            onClick={() => onViewProfile(product.sellerId)}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            Ver perfil
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  
                  <tr className="border-b border-gray-300">
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <MapPin className="w-4 h-4 mr-2" />
                        Location
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.location}</td>
                  </tr>
                  
                  <tr>
                    <td className="px-4 py-3 bg-gray-50 border-r border-gray-300">
                      <div className="flex items-center text-sm text-gray-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date Posted
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{product.datePosted}</td>
                  </tr>
                </tbody>
              </table>
              
              {product.specifications && (
                <div className="border border-gray-300 rounded p-4 bg-gray-50 mb-4">
                  <h3 className="text-sm text-gray-800 mb-2">Especificaciones Técnicas</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.specifications}
                  </p>
                </div>
              )}
              
              <div className="border border-gray-300 rounded p-4 bg-gray-50">
                <h3 className="text-sm text-gray-800 mb-2">Description</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}