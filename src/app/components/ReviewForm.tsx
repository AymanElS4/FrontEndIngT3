import { useState } from 'react';
import { ArrowLeft, Star, AlertCircle } from 'lucide-react';
import { Product } from '../App';

type ReviewFormProps = {
  product: Product;
  onBack: () => void;
  onSubmit: () => void;
  currentUserId: number;
};

export function ReviewForm({ product, onBack, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (rating === 0) newErrors.rating = 'Debe seleccionar una calificación';
    if (!comment.trim()) newErrors.comment = 'El comentario es obligatorio';
    if (comment.trim().length < 10) newErrors.comment = 'El comentario debe tener al menos 10 caracteres';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      alert('¡Reseña enviada exitosamente!');
      onSubmit();
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
          <h2 className="text-lg text-gray-800">Dejar una Reseña</h2>
        </div>
        
        <div className="p-6">
          <div className="max-w-2xl">
            <div className="bg-gray-50 border border-gray-300 rounded p-4 mb-6">
              <div className="flex items-center gap-4">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded border border-gray-300"
                />
                <div>
                  <div className="text-sm">{product.name}</div>
                  <div className="text-xs text-gray-600">Vendedor: {product.seller}</div>
                  <div className="text-xs text-gray-500">${product.price.toLocaleString()}</div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-3">
                  Calificación <span className="text-red-600">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                  {rating > 0 && (
                    <span className="ml-2 text-sm text-gray-600">
                      {rating} de 5 estrellas
                    </span>
                  )}
                </div>
                {errors.rating && (
                  <p className="text-red-600 text-xs mt-2 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {errors.rating}
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm text-gray-700 mb-2">
                  Comentario <span className="text-red-600">*</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                    if (errors.comment) setErrors({ ...errors, comment: '' });
                  }}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 ${
                    errors.comment ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Comparta su experiencia con este vendedor y producto. ¿El producto llegó como se describió? ¿La comunicación fue buena? ¿Recomendaría este vendedor?"
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.comment ? (
                    <p className="text-red-600 text-xs flex items-center">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {errors.comment}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">Mínimo 10 caracteres</p>
                  )}
                  <p className="text-xs text-gray-500">{comment.length} caracteres</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-6">
                <p className="text-xs text-blue-800">
                  <strong>Nota:</strong> Las reseñas son públicas y permanentes. Por favor, sea honesto pero respetuoso en sus comentarios.
                </p>
              </div>
              
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                >
                  Enviar Reseña
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
