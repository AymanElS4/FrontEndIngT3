import { ArrowLeft, User, MapPin, Mail, Phone, Calendar, Package, Star, ShoppingBag, Edit2 } from 'lucide-react';
import { useState } from 'react';

type CustomerProfileProps = {
  onBack: () => void;
};

export function CustomerProfile({ onBack }: CustomerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'TechStore Inc',
    email: 'contact@techstore.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    address: '123 Tech Street, Manhattan',
    zipCode: '10001',
    bio: 'Tienda especializada en tecnología de alta gama. Vendemos productos nuevos y certificados con garantía.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Perfil actualizado exitosamente');
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data
    setFormData({
      name: 'TechStore Inc',
      email: 'contact@techstore.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      address: '123 Tech Street, Manhattan',
      zipCode: '10001',
      bio: 'Tienda especializada en tecnología de alta gama. Vendemos productos nuevos y certificados con garantía.'
    });
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver
      </button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Columna principal - Información del perfil */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-300 rounded mb-6">
            <div className="border-b border-gray-300 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg text-gray-800">Mi Perfil</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Editar Perfil
                </button>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-6 mb-6">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400"
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  {!isEditing ? (
                    <>
                      <h1 className="text-2xl text-gray-900 mb-2">{formData.name}</h1>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          {formData.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          {formData.phone}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {formData.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Miembro desde Enero 2023
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-700 mb-1">Teléfono</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!isEditing ? (
                <div className="border-t border-gray-300 pt-6">
                  <h3 className="text-sm text-gray-800 mb-2">Biografía</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {formData.bio}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 border-t border-gray-300 pt-6">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Dirección</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Ciudad/Estado</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm text-gray-700 mb-1">Código Postal</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Biografía</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Historial de compras */}
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg text-gray-800">Historial de Compras</h2>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-300">
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Fecha</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Producto</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Vendedor</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Total</th>
                      <th className="px-4 py-3 text-left text-sm text-gray-700">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-300 bg-white">
                      <td className="px-4 py-3 text-sm">2024-12-10</td>
                      <td className="px-4 py-3 text-sm">MacBook Pro 16" M2</td>
                      <td className="px-4 py-3 text-sm">TechStore Inc</td>
                      <td className="px-4 py-3 text-sm text-green-700">$2,499.00</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Entregado
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-300 bg-gray-50">
                      <td className="px-4 py-3 text-sm">2024-12-05</td>
                      <td className="px-4 py-3 text-sm">iPhone 15 Pro Max</td>
                      <td className="px-4 py-3 text-sm">Mobile World</td>
                      <td className="px-4 py-3 text-sm text-green-700">$1,199.00</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          En tránsito
                        </span>
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-3 text-sm">2024-11-28</td>
                      <td className="px-4 py-3 text-sm">Sony WH-1000XM5</td>
                      <td className="px-4 py-3 text-sm">Audio Pro</td>
                      <td className="px-4 py-3 text-sm text-green-700">$349.00</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                          Entregado
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Sidebar - Estadísticas */}
        <div className="lg:col-span-1 space-y-6">
          {/* Estadísticas rápidas */}
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg text-gray-800">Estadísticas</h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded">
                <div className="flex items-center text-blue-700 mb-1">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  <span className="text-sm">Compras Realizadas</span>
                </div>
                <div className="text-2xl">15</div>
              </div>
              
              <div className="px-4 py-3 bg-green-50 border border-green-200 rounded">
                <div className="flex items-center text-green-700 mb-1">
                  <Package className="w-4 h-4 mr-2" />
                  <span className="text-sm">Productos Vendidos</span>
                </div>
                <div className="text-2xl">127</div>
              </div>
              
              <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded">
                <div className="flex items-center text-yellow-700 mb-1">
                  <Star className="w-4 h-4 mr-2" />
                  <span className="text-sm">Calificación</span>
                </div>
                <div className="text-2xl">4.8/5</div>
              </div>
            </div>
          </div>
          
          {/* Configuración de cuenta */}
          <div className="bg-white border border-gray-300 rounded">
            <div className="border-b border-gray-300 px-4 py-3">
              <h2 className="text-lg text-gray-800">Configuración</h2>
            </div>
            
            <div className="p-4">
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Cambiar Contraseña
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Notificaciones
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Privacidad
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded">
                  Métodos de Pago
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded">
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
