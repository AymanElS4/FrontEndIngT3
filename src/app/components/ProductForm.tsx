import { useState } from 'react';
import { ArrowLeft, Upload, AlertCircle } from 'lucide-react';

type ProductFormProps = {
  onBack: () => void;
  onSubmit: () => void;
  currentUserId: number;
};

export function ProductForm({ onBack, onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    brand: '',
    model: '',
    price: '',
    condition: 'New',
    location: '',
    description: '',
    specifications: ''
  });
  
  const [imageUploaded, setImageUploaded] = useState(false);
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
    if (!imageUploaded) newErrors.image = 'Debe cargar al menos 1 imagen';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate successful submission
      alert('¡Producto creado exitosamente!');
      onSubmit();
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

  const handleImageUpload = () => {
    setImageUploaded(true);
    if (errors.image) {
      setErrors({ ...errors, image: '' });
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
          <h2 className="text-lg text-gray-800">Crear Publicación de Producto</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="max-w-3xl">
            <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Importante:</strong> Todos los campos marcados con <span className="text-red-600">*</span> son obligatorios. 
                Debe incluir al menos 1 imagen del producto.
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
                placeholder="Ej: iPhone 15 Pro Max 256GB"
              />
              {errors.name && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  placeholder="Ej: Apple, Samsung, Dell"
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
                  placeholder="Ej: iPhone 15 Pro Max"
                />
                {errors.model && (
                  <p className="text-red-600 text-xs mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.model}
                  </p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
                  placeholder="0.00"
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
                  placeholder="Ciudad, Estado"
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
                placeholder="Ej: 256GB almacenamiento, chip A17 Pro, 8GB RAM, pantalla 6.7 pulgadas..."
              />
              {errors.specifications && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.specifications}
                </p>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-700 mb-2">
                Imágenes del Producto <span className="text-red-600">*</span>
              </label>
              <div className={`border-2 border-dashed rounded p-6 text-center ${
                errors.image ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-gray-50'
              }`}>
                <Upload className={`w-8 h-8 mx-auto mb-2 ${errors.image ? 'text-red-400' : 'text-gray-400'}`} />
                <p className="text-sm text-gray-600 mb-2">
                  {imageUploaded ? '✓ Imagen cargada correctamente' : 'Click para cargar o arrastrar imágenes'}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  PNG, JPG, GIF hasta 10MB. Mínimo 1 imagen requerida.
                </p>
                <input type="file" className="hidden" accept="image/*" multiple />
                <button 
                  type="button"
                  onClick={handleImageUpload}
                  className={`px-4 py-2 rounded text-sm ${
                    imageUploaded 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {imageUploaded ? 'Imagen Cargada ✓' : 'Seleccionar Imágenes'}
                </button>
              </div>
              {errors.image && (
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.image}
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
            
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Publicar Producto
              </button>
              <button
                type="button"
                onClick={onBack}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
