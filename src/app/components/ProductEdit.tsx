import { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle, Image as ImageIcon, X } from 'lucide-react';
import { Product } from '../App';

type ProductEditProps = {
  product: Product;
  onBack: () => void;
  onSave: (product: Product) => void;
};

export function ProductEdit({ product, onBack, onSave }: ProductEditProps) {
  const [formData, setFormData] = useState({
    name: product.name,
    category: product.category,
    brand: product.brand,
    model: product.model,
    price: product.price.toString(),
    condition: product.condition,
    location: product.location,
    description: product.description,
    specifications: product.specifications || ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'El nombre del producto es obligatorio';
    if (!formData.brand.trim()) newErrors.brand = 'La marca es obligatoria';
    if (!formData.model.trim()) newErrors.model = 'El modelo es obligatorio';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'El precio debe ser mayor a 0';
    if (!formData.location.trim()) newErrors.location = 'La ubicación es obligatoria';
    if (!formData.description.trim()) newErrors.description = 'La descripción es obligatoria';
    if (!formData.specifications.trim()) newErrors.specifications = 'Las especificaciones son obligatorias';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      const updatedProduct: Product = {
        ...product,
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        model: formData.model,
        price: parseFloat(formData.price),
        condition: formData.condition,
        location: formData.location,
        description: formData.description,
        specifications: formData.specifications
      };
      
      onSave(updatedProduct);
      alert('¡Producto actualizado exitosamente!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
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
      
      <div className="bg-white border border-gray-300 rounded">
        <div className="border-b border-gray-300 px-4 py-3">
          <h2 className="text-lg text-gray-800">Editar Producto</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Columna izquierda - Imágenes */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">
                  Imagen Principal
                </label>
                <div className="border border-gray-300 rounded overflow-hidden mb-4">
                  <img 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto"
                  />
                </div>
                
                <button 
                  type="button"
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center justify-center"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Cambiar Imagen Principal
                </button>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Galería de Imágenes
                </label>
                
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div className="relative border border-gray-300 rounded overflow-hidden aspect-square bg-gray-100">
                    <img 
                      src={product.image}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button"
                      className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="relative border border-gray-300 rounded overflow-hidden aspect-square bg-gray-100">
                    <img 
                      src={product.image}
                      alt="Gallery"
                      className="w-full h-full object-cover"
                    />
                    <button 
                      type="button"
                      className="absolute top-1 right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <button 
                  type="button"
                  className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded text-sm flex items-center justify-center"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Agregar Más Imágenes
                </button>
              </div>
            </div>
            
            {/* Columna derecha - Formulario */}
            <div className="lg:col-span-2">
              <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>Nota:</strong> Los cambios se aplicarán inmediatamente después de guardar.
                </p>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">
                  Nombre del Producto <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Tipo de Dispositivo <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="Laptops">Laptop</option>
                    <option value="Smartphones">Smartphone</option>
                    <option value="Tablets">Tablet</option>
                    <option value="Audio">Audio</option>
                    <option value="Cameras">Cámara</option>
                    <option value="Desktop Computers">Computadora de Escritorio</option>
                    <option value="Accessories">Accesorios</option>
                    <option value="Gaming Consoles">Consola de Videojuegos</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Estado del Dispositivo <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                  >
                    <option value="New">Nuevo (Como nuevo, sin uso)</option>
                    <option value="Like New">Excelente (Mínimo uso, sin defectos)</option>
                    <option value="Used">Buen Estado (Uso normal, funcional)</option>
                    <option value="Fair">Regular (Desgaste visible, funcional)</option>
                    <option value="For Parts">Para Repuestos (No funcional)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Marca <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                      errors.brand ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.brand && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.brand}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Modelo <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                      errors.model ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.model && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.model}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Precio (USD) <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                      errors.price ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.price && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.price}
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-2">
                    Ubicación <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.location && (
                    <p className="text-red-600 text-xs mt-1 flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.location}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm text-gray-700 mb-2">
                  Especificaciones Técnicas <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="specifications"
                  value={formData.specifications}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.specifications ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: 256GB almacenamiento, chip A17 Pro, 8GB RAM..."
                />
                {errors.specifications && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.specifications}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Descripción Detallada <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Incluya detalles importantes: tiempo de uso, defectos si los hay, accesorios incluidos, garantía, etc."
                />
                {errors.description && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.description}
                  </p>
                )}
              </div>
              
              <div className="flex gap-2 pt-4 border-t border-gray-300">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded ml-auto"
                >
                  Eliminar Producto
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
