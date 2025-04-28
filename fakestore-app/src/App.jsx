// Import the main CSS file for styling
import './App.css';

 // Import necessary components and hooks from React Router
import { Routes, Route, useLocation } from 'react-router-dom';  

// Import individual components for different pages and sections
import Home from './components/Home';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import NavigationBar from './components/NavigationBar';
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import DeleteProduct from './components/DeleteProduct';
import Footer from './components/Footer';
import CartPage from './components/CartPage';
 

function App() {
  // Get the current route using the useLocation hook
  const location = useLocation();

  // Check if the current route is the Home page to conditionally apply a background image
  const isHomePage = location.pathname === '/';

  return (
    // Apply the 'home-background' class only on the Home page
    <div className={isHomePage ? 'home-background' : ''}>
      {/* Render the navigation bar at the top */}
      <NavigationBar />

      {/* Main content area for routing */}
      <main>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/products/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/addproducts" element={<AddProduct />} />
          <Route path="/updateproducts" element={<UpdateProduct />} />
          <Route path="/deleteproducts" element={<DeleteProduct />} />
          <Route path="/cart" element={<CartPage />} /> {/* Add the CartPage route */}
        </Routes>
      </main>

      {/* Render the footer at the bottom */}
      <Footer />
    </div>
  );
}
// Export the App component as the default export so it can be imported and used in other files
export default App; 