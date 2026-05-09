import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Product } from '../App';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartProps = {
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onBack: () => void;
  onCheckout: () => void;
};

export function Cart({ items, onUpdateQuantity, onRemoveItem, onBack, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 15 : 0; // Envío fijo de $15
  const tax = subtotal * 0.08; // 8% de impuesto
  const total = subtotal + shipping + tax;

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Continuar Comprando
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista de productos en el carrito */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg text-gray-800">Carrito de Compras ({items.length} {items.length === 1 ? 'producto' : 'productos'})</h2>
            </div>
            
            <div className="p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Tu carrito está vacío</p>
                  <button 
                    onClick={onBack}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Explorar Productos
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div 
                      key={item.product.id}
                      className="border border-gray-300 rounded p-4 flex items-start gap-4"
                    >
                      {/* Imagen del producto */}
                      <div className="w-24 h-24 flex-shrink-0">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded border border-gray-300"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm mb-1">{item.product.name}</h3>
                        <p className="text-xs text-gray-600 mb-2">
                          {item.product.brand} {item.product.model}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                            {item.product.condition}
                          </span>
                          <span className="text-xs text-gray-500">{item.product.category}</span>
                        </div>
                        <div className="text-green-700 text-lg">
                          ${item.product.price.toLocaleString()}
                        </div>
                      </div>
                      
                      {/* Controles de cantidad */}
                      <div className="flex flex-col items-end gap-2">
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                          title="Eliminar del carrito"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-3 py-1 text-sm min-w-[2.5rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= 10}
                            className="p-1.5 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          Subtotal: <span className="text-green-700 font-medium">
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Resumen del pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-300 rounded sticky top-4">
            <div className="border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg text-gray-800">Resumen del Pedido</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({items.length} {items.length === 1 ? 'producto' : 'productos'}):</span>
                  <span className="text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Impuestos (8%):</span>
                  <span className="text-gray-900">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-300 pt-3 flex justify-between">
                  <span className="text-base font-medium">Total:</span>
                  <span className="text-xl text-green-700 font-medium">${total.toFixed(2)}</span>
                </div>
              </div>
              
              {items.length > 0 && (
                <>
                  <button
                    onClick={onCheckout}
                    className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded mb-2"
                  >
                    Proceder al Pago
                  </button>
                  
                  <button
                    onClick={onBack}
                    className="w-full px-4 py-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded"
                  >
                    Continuar Comprando
                  </button>
                </>
              )}
              
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-800">
                  <strong>Nota:</strong> Los precios incluyen todos los impuestos aplicables. 
                  El envío es gratuito para compras superiores a $100.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
