import { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Store, FileText, Image, Eye, EyeOff, AlertCircle } from 'lucide-react';

type RegisterVendorProps = {
  onRegister: (vendorData: any) => void;
  onSwitchToLogin: () => void;
  onSwitchToCustomerRegister: () => void;
};

export function RegisterVendor({ onRegister, onSwitchToLogin, onSwitchToCustomerRegister }: RegisterVendorProps) {
  const [formData, setFormData] = useState({
    // Información Personal
    fullName: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    // Información de la Tienda
    storeName: '',
    storeDescription: '',
    logoUrl: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Validación Información Personal
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es obligatorio';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    // Validación Información de la Tienda
    if (!formData.storeName.trim()) {
      newErrors.storeName = 'El nombre de la tienda es obligatorio';
    } else if (formData.storeName.trim().length < 3) {
      newErrors.storeName = 'El nombre de la tienda debe tener al menos 3 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onRegister({
        ...formData,
        accountType: 'vendor'
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-blue-700 mb-2">TechMarket</h1>
          <p className="text-gray-600">Registro de Vendedor</p>
          <p className="text-sm text-gray-500 mt-1">Crea tu tienda y comienza a vender productos tecnológicos</p>
        </div>
        
        {/* Panel de Registro */}
        <div className="bg-white border border-gray-300 rounded shadow-sm">
          <div className="border-b border-gray-300 px-6 py-4">
            <h2 className="text-lg text-gray-800">Crear Cuenta de Vendedor</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6">
            {/* Sección: Información Personal */}
            <div className="mb-6">
              <h3 className="text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Información Personal
              </h3>
              
              <div className="space-y-4">
                {/* Nombre Completo */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nombre Completo <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                        errors.fullName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Carlos García"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>
                
                {/* Correo Electrónico */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Correo Electrónico <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="vendor@ejemplo.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                
                {/* Contraseña */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Contraseña <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-10 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                        errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.password}
                    </p>
                  )}
                </div>
                
                {/* Dirección */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Dirección
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Av. Principal 123"
                    />
                  </div>
                </div>
                
                {/* Teléfono */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="0991234567"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sección: Información de la Tienda */}
            <div className="mb-6">
              <h3 className="text-base text-gray-800 mb-4 pb-2 border-b border-gray-200">
                Información de la Tienda
              </h3>
              
              <div className="space-y-4">
                {/* Nombre de la Tienda */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Nombre de la Tienda <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Store className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                        errors.storeName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Tech Store"
                    />
                  </div>
                  {errors.storeName && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.storeName}
                    </p>
                  )}
                </div>
                
                {/* Descripción de la Tienda */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Descripción de la Tienda
                  </label>
                  <div className="relative">
                    <FileText className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="storeDescription"
                      value={formData.storeDescription}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="Describe tu tienda y los productos que vendes..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Esta descripción aparecerá en tu perfil público de vendedor
                  </p>
                </div>
                
                {/* URL del Logo */}
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    URL del Logo
                  </label>
                  <div className="relative">
                    <Image className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                      placeholder="https://ejemplo.com/logo.png"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Opcional: URL de la imagen del logo de tu tienda
                  </p>
                </div>
              </div>
            </div>
            
            {/* Información adicional */}
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Al crear una cuenta de vendedor, podrás publicar productos, 
                gestionar tu inventario y recibir reseñas de compradores. Asegúrate de completar toda 
                la información para brindar confianza a tus clientes.
              </p>
            </div>
            
            {/* Submit button */}
            <button
              type="submit"
              className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded mb-4 font-medium"
            >
              CREAR MI TIENDA
            </button>
            
            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
            </div>
          </form>
          
          {/* Footer links */}
          <div className="border-t border-gray-300 px-6 py-4 bg-gray-50">
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                ¿Ya tienes cuenta?{' '}
                <button
                  onClick={onSwitchToLogin}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Iniciar Sesión
                </button>
              </p>
              
              <p className="text-sm text-gray-600">
                ¿Solo quieres comprar?{' '}
                <button
                  onClick={onSwitchToCustomerRegister}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Regístrate como cliente
                </button>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Al crear tu tienda, aceptas nuestros</p>
          <p>
            <a href="#" className="text-blue-600 hover:text-blue-800">Términos de Servicio</a>
            {' y '}
            <a href="#" className="text-blue-600 hover:text-blue-800">Política de Vendedores</a>
          </p>
        </div>
      </div>
    </div>
  );
}
