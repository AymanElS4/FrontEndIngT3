export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div>
            <h3 className="text-sm text-gray-800 mb-3">About TechMarket</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:text-blue-600">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-600">Safety Tips</a></li>
              <li><a href="#" className="hover:text-blue-600">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-800 mb-3">Categories</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Laptops</a></li>
              <li><a href="#" className="hover:text-blue-600">Smartphones</a></li>
              <li><a href="#" className="hover:text-blue-600">Tablets</a></li>
              <li><a href="#" className="hover:text-blue-600">Cameras</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-800 mb-3">For Sellers</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Sell Your Product</a></li>
              <li><a href="#" className="hover:text-blue-600">Seller Guidelines</a></li>
              <li><a href="#" className="hover:text-blue-600">Pricing Tips</a></li>
              <li><a href="#" className="hover:text-blue-600">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm text-gray-800 mb-3">Legal</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><a href="#" className="hover:text-blue-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-blue-600">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-300 pt-4 text-center text-xs text-gray-600">
          <p>© 2024 TechMarket. All rights reserved. Powered by Yii Framework</p>
        </div>
      </div>
    </footer>
  );
}
