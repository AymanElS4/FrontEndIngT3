import { ChevronRight } from 'lucide-react';

type BreadcrumbsProps = {
  currentView: 'list' | 'detail' | 'create' | 'edit' | 'profile' | 'customerprofile' | 'myproducts' | 'review' | 'cart';
  productName?: string;
  userName?: string;
};

export function Breadcrumbs({ currentView, productName, userName }: BreadcrumbsProps) {
  return (
    <div className="bg-white border border-gray-300 rounded px-4 py-3 mb-4">
      <div className="flex items-center text-sm text-gray-600">
        <a href="#" className="hover:text-blue-600">Home</a>
        <ChevronRight className="w-4 h-4 mx-2" />
        
        {currentView === 'list' && (
          <span className="text-gray-900">Products</span>
        )}
        
        {currentView === 'detail' && (
          <>
            <a href="#" className="hover:text-blue-600">Products</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{productName}</span>
          </>
        )}
        
        {currentView === 'create' && (
          <>
            <a href="#" className="hover:text-blue-600">Products</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Create Product</span>
          </>
        )}
        
        {currentView === 'edit' && (
          <>
            <a href="#" className="hover:text-blue-600">Mi Cuenta</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="#" className="hover:text-blue-600">Mis Productos</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Editar Producto</span>
          </>
        )}
        
        {currentView === 'profile' && (
          <>
            <a href="#" className="hover:text-blue-600">Users</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">{userName}</span>
          </>
        )}
        
        {currentView === 'customerprofile' && (
          <>
            <a href="#" className="hover:text-blue-600">Mi Cuenta</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Mi Perfil</span>
          </>
        )}
        
        {currentView === 'myproducts' && (
          <>
            <a href="#" className="hover:text-blue-600">Mi Cuenta</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Mis Productos</span>
          </>
        )}
        
        {currentView === 'review' && (
          <>
            <a href="#" className="hover:text-blue-600">Products</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <a href="#" className="hover:text-blue-600">{productName}</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Dejar Reseña</span>
          </>
        )}
        
        {currentView === 'cart' && (
          <>
            <a href="#" className="hover:text-blue-600">Products</a>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gray-900">Carrito de Compras</span>
          </>
        )}
      </div>
    </div>
  );
}