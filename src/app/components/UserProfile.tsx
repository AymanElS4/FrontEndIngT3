import { ArrowLeft, Star, MapPin, Calendar, Package, ShoppingBag, Award } from 'lucide-react';
import { User, Review } from '../data/mockUsers';

type UserProfileProps = {
  user: User;
  reviews: Review[];
  onBack: () => void;
};

export function UserProfile({ user, reviews, onBack }: UserProfileProps) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'fill-gray-200 text-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0];
    reviews.forEach(review => {
      distribution[review.rating - 1]++;
    });
    return distribution.reverse();
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div>
      <button 
        onClick={onBack}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-4 text-sm"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Volver
      </button>
      
      <div className="bg-white border border-gray-300 rounded mb-4">
        <div className="border-b border-gray-300 px-4 py-3">
          <h2 className="text-lg text-gray-800">Perfil de Usuario</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-start gap-6 mb-6">
            <img 
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
            />
            
            <div className="flex-1">
              <h1 className="text-2xl text-gray-900 mb-2">{user.name}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {user.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Miembro desde {new Date(user.memberSince).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mb-3">
                {renderStars(Math.round(user.rating))}
                <span className="text-lg">{user.rating.toFixed(1)}</span>
                <span className="text-gray-600">({reviews.length} reseñas)</span>
              </div>
              
              <p className="text-sm text-gray-700 mb-4">{user.bio}</p>
              
              <div className="flex gap-4">
                <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded flex-1">
                  <div className="flex items-center text-blue-700 mb-1">
                    <Package className="w-4 h-4 mr-2" />
                    <span className="text-sm">Ventas</span>
                  </div>
                  <div className="text-2xl">{user.totalSales}</div>
                </div>
                
                <div className="px-4 py-3 bg-green-50 border border-green-200 rounded flex-1">
                  <div className="flex items-center text-green-700 mb-1">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    <span className="text-sm">Compras</span>
                  </div>
                  <div className="text-2xl">{user.totalPurchases}</div>
                </div>
                
                <div className="px-4 py-3 bg-yellow-50 border border-yellow-200 rounded flex-1">
                  <div className="flex items-center text-yellow-700 mb-1">
                    <Award className="w-4 h-4 mr-2" />
                    <span className="text-sm">Reputación</span>
                  </div>
                  <div className="text-2xl">{getAverageRating()}/5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white border border-gray-300 rounded">
        <div className="border-b border-gray-300 px-4 py-3">
          <h2 className="text-lg text-gray-800">Reseñas y Calificaciones</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-1 border border-gray-300 rounded p-4 bg-gray-50">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{getAverageRating()}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(parseFloat(getAverageRating())))}
                </div>
                <div className="text-sm text-gray-600">Basado en {reviews.length} reseñas</div>
              </div>
              
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars, index) => (
                  <div key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-12">{stars} estrellas</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ 
                          width: reviews.length > 0 
                            ? `${(ratingDistribution[index] / reviews.length) * 100}%` 
                            : '0%' 
                        }}
                      />
                    </div>
                    <span className="w-8 text-gray-600">{ratingDistribution[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No hay reseñas disponibles todavía
                  </div>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="border border-gray-300 rounded p-4 bg-white">
                      <div className="flex items-start gap-3 mb-3">
                        <img 
                          src={review.reviewerAvatar}
                          alt={review.reviewerName}
                          className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <div className="text-sm">{review.reviewerName}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(review.date).toLocaleDateString('es-ES', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </div>
                            </div>
                            {renderStars(review.rating)}
                          </div>
                          
                          <div className="text-xs text-gray-600 mb-2">
                            <span className={`inline-block px-2 py-0.5 rounded ${
                              review.transactionType === 'sale' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {review.transactionType === 'sale' ? 'Venta' : 'Compra'}
                            </span>
                            <span className="ml-2 text-gray-500">• {review.productName}</span>
                          </div>
                          
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
