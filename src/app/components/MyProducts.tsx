import { useState } from 'react';
import { ArrowLeft, Plus, Edit, Eye } from 'lucide-react';
import { Product } from '../App';
import { mockProducts } from './ProductGrid';

type MyProductsProps = {
  currentUserId: number;
  onBack: () => void;
  onCreateProduct: () => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
};

export function MyProducts({ currentUserId, onBack, onCreateProduct, onViewProduct, onEditProduct }: MyProductsProps) {
  const [products, setProducts] = useState<Product[]>(
    mockProducts.filter(p => p.sellerId === currentUserId)
  );

  const handleStatusChange = (productId: number, newStatus: 'active' | 'paused' | 'sold') => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, status: newStatus } : p
    ));
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: 'bg-green-100 text-green-800',
      paused: 'bg-yellow-100 text-yellow-800',
      sold: 'bg-gray-100 text-gray-800'
    };
    return badges[status as keyof typeof badges] || badges.active;
  };

  const getStatusText = (status: string) => {
    const texts = {
      active: 'Activo',
      paused: 'Pausado',
      sold: 'Vendido'
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver al Catálogo
      </button>
      
      <div className="bg-white border border-gray-300 rounded">
        <div className="border-b border-gray-300 px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg text-gray-800">Mis Publicaciones</h2>
          <button 
            onClick={onCreateProduct}
            className="flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm"
          >
            <Plus className="w-4 h-4 mr-1" />
            Nueva Publicación
          </button>
        </div>
        
        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tienes productos publicados todavía</p>
              <button 
                onClick={onCreateProduct}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                Crear Primera Publicación
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-300">
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Producto</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Categoría</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Precio</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Estado</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Publicado</th>
                    <th className="px-4 py-3 text-left text-sm text-gray-700">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product, index) => (
                    <tr 
                      key={product.id} 
                      className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded border border-gray-300"
                          />
                          <div>
                            <div className="text-sm">{product.name}</div>
                            <div className="text-xs text-gray-500">{product.brand} {product.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{product.category}</td>
                      <td className="px-4 py-3 text-sm text-green-700">
                        ${product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={product.status}
                          onChange={(e) => handleStatusChange(product.id, e.target.value as any)}
                          className={`px-2 py-1 rounded text-xs ${getStatusBadge(product.status)} border-0 cursor-pointer`}
                        >
                          <option value="active">Activo</option>
                          <option value="paused">Pausado</option>
                          <option value="sold">Vendido</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {product.datePosted}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => onViewProduct(product)}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                            title="Ver producto"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded"
                            title="Editar producto"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="mt-4 text-sm text-gray-600">
                Total: {products.length} producto{products.length !== 1 ? 's' : ''} publicado{products.length !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}