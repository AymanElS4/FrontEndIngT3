import { useState } from 'react';
import { Header } from './components/Header';
import { Breadcrumbs } from './components/Breadcrumbs';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { ProductForm } from './components/ProductForm';
import { ProductEdit } from './components/ProductEdit';
import { UserProfile } from './components/UserProfile';
import { CustomerProfile } from './components/CustomerProfile';
import { MyProducts } from './components/MyProducts';
import { ReviewForm } from './components/ReviewForm';
import { Cart, CartItem } from './components/Cart';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RegisterVendor } from './components/RegisterVendor';
import { Footer } from './components/Footer';
import { getUserById, getReviewsByUserId } from './data/mockUsers';

export type Product = {
  id: number;
  name: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  condition: string;
  seller: string;
  sellerId: number;
  location: string;
  description: string;
  image: string;
  datePosted: string;
  status: 'active' | 'paused' | 'sold';
  specifications?: string;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'register' | 'registerVendor'>('login');
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create' | 'edit' | 'profile' | 'customerprofile' | 'myproducts' | 'review' | 'cart'>('list');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [currentUserId] = useState<number>(1); // Simulating logged in user as TechStore Inc
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleLogin = (email: string, password: string) => {
    // Simulación de login - en producción validaría con el backend
    console.log('Login:', email, password);
    setIsLoggedIn(true);
    alert('¡Bienvenido a TechMarket!');
  };

  const handleRegister = (userData: any) => {
    // Simulación de registro - en producción guardaría en el backend
    console.log('Register:', userData);
    setIsLoggedIn(true);
    
    if (userData.accountType === 'vendor') {
      alert('¡Tienda creada exitosamente! Bienvenido a TechMarket, ahora puedes comenzar a vender.');
    } else {
      alert('¡Cuenta creada exitosamente! Bienvenido a TechMarket.');
    }
  };

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedProduct(null);
    setSelectedUserId(null);
  };

  const handleCreateProduct = () => {
    setCurrentView('create');
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('edit');
  };

  const handleProductCreated = () => {
    setCurrentView('myproducts');
  };

  const handleProductSaved = (product: Product) => {
    // In a real app, this would update the product in the database
    console.log('Product saved:', product);
    setCurrentView('myproducts');
  };

  const handleViewProfile = (userId: number) => {
    setSelectedUserId(userId);
    setCurrentView('profile');
  };

  const handleViewMyProducts = () => {
    setCurrentView('myproducts');
  };

  const handleViewCustomerProfile = () => {
    setCurrentView('customerprofile');
  };

  const handleLeaveReview = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('review');
  };

  const handleReviewSubmitted = () => {
    setCurrentView('list');
    setSelectedProduct(null);
  };

  const handleViewCart = () => {
    setCurrentView('cart');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // Incrementar cantidad si ya existe
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Agregar nuevo item
        return [...prevItems, { product, quantity: 1 }];
      }
    });
    
    // Mostrar notificación (simulado con alert)
    alert(`${product.name} agregado al carrito`);
  };

  const handleUpdateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    alert('Funcionalidad de pago no implementada. En un sistema real, aquí se procesaría el pago.');
  };

  const selectedUser = selectedUserId ? getUserById(selectedUserId) : null;
  const userReviews = selectedUserId ? getReviewsByUserId(selectedUserId) : [];
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Mostrar pantallas de autenticación si no está logueado
  if (!isLoggedIn) {
    if (authView === 'login') {
      return (
        <Login 
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthView('register')}
        />
      );
    } else if (authView === 'register') {
      return (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    } else {
      return (
        <RegisterVendor 
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
          onSwitchToCustomerRegister={() => setAuthView('register')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header 
        onViewMyProducts={handleViewMyProducts} 
        onViewCart={handleViewCart}
        onViewProfile={handleViewCustomerProfile}
        cartItemCount={cartItemCount}
        currentUserId={currentUserId} 
      />
      
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Breadcrumbs 
            currentView={currentView} 
            productName={selectedProduct?.name}
            userName={selectedUser?.name}
          />
          
          {currentView === 'list' && (
            <ProductGrid 
              onViewProduct={handleViewProduct}
              onCreateProduct={handleCreateProduct}
            />
          )}
          
          {currentView === 'detail' && selectedProduct && (
            <ProductDetail 
              product={selectedProduct}
              onBack={handleBackToList}
              onViewProfile={handleViewProfile}
              onLeaveReview={handleLeaveReview}
              onAddToCart={handleAddToCart}
              currentUserId={currentUserId}
            />
          )}
          
          {currentView === 'create' && (
            <ProductForm 
              onBack={handleBackToList}
              onSubmit={handleProductCreated}
              currentUserId={currentUserId}
            />
          )}
          
          {currentView === 'edit' && selectedProduct && (
            <ProductEdit 
              product={selectedProduct}
              onBack={handleBackToList}
              onSave={handleProductSaved}
            />
          )}
          
          {currentView === 'profile' && selectedUser && (
            <UserProfile 
              user={selectedUser}
              reviews={userReviews}
              onBack={handleBackToList}
            />
          )}
          
          {currentView === 'customerprofile' && (
            <CustomerProfile 
              onBack={handleBackToList}
            />
          )}
          
          {currentView === 'myproducts' && (
            <MyProducts 
              currentUserId={currentUserId}
              onBack={handleBackToList}
              onCreateProduct={handleCreateProduct}
              onViewProduct={handleViewProduct}
              onEditProduct={handleEditProduct}
            />
          )}
          
          {currentView === 'review' && selectedProduct && (
            <ReviewForm 
              product={selectedProduct}
              onBack={handleBackToList}
              onSubmit={handleReviewSubmitted}
              currentUserId={currentUserId}
            />
          )}
          
          {currentView === 'cart' && (
            <Cart 
              items={cartItems}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveFromCart}
              onBack={handleBackToList}
              onCheckout={handleCheckout}
            />
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;