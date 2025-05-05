// Importing core React features and utilities
import React, { lazy, Suspense } from 'react'; // React is required to create components; lazy and Suspense enable code-splitting

// Importing routing features from react-router-dom
import { Routes, Route } from 'react-router-dom'; // Routes wraps all the <Route> definitions; Route maps URLs to components

// Importing Bootstrap spinner for loading indication
import { Spinner } from 'react-bootstrap'; // Spinner provides a loading animation while content is being fetched

// Importing layout components
import NavigationBar from './components/NavigationBar'; // The navigation bar component, visible on all pages
import Footer from './components/Footer'; // The footer component, also visible on all pages

// Lazy loading components to optimize performance and reduce initial load time
// This allows the app to load only the components that are needed for the current route
const Home = lazy(() => import('./components/Home')); // Lazily load the homepage component
const ProductList = lazy(() => import('./components/ProductList')); // Lazily load product list component
const ProductDetails = lazy(() => import('./components/ProductDetails')); // Lazily load detailed product view
const AddProduct = lazy(() => import('./components/AddProduct')); // Lazily load add product form
const UpdateProduct = lazy(() => import('./components/UpdateProduct')); // Lazily load update product form
const DeleteProduct = lazy(() => import('./components/DeleteProduct')); // Lazily load delete product interface
const CartPage = lazy(() => import('./components/CartPage')); // Lazily load the cart page

// Main App component
function App() {
  return (
    // Main container div for the entire application
    <div>
      
      {/* Renders the top navigation bar on every page */}
      <NavigationBar />

      <main>
        {/* Suspense provides a fallback UI while any lazy-loaded component is loading */}
        <Suspense
          fallback={
            // Show a full-screen centered spinner while loading
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-info">
              <Spinner animation="border" variant="primary" /> {/* Bootstrap spinner for loading indication */}
            </div>
          }
        >  {/* Fallback UI for lazy-loaded components */}

          {/* Define the application's routes using React Router */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Root path for the homepage */}
            <Route path="/products" element={<ProductList />} /> {/* Route to view all products */}
            <Route path="/products/:id" element={<ProductDetails />} /> {/* Route for individual product details using dynamic ID */}
            <Route path="/addproducts" element={<AddProduct />} /> {/* Route for adding a new product */}
            <Route path="/updateproducts/" element={<UpdateProduct />} /> {/* Route for updating an existing product */}
            <Route path="/deleteproducts/" element={<DeleteProduct />} /> {/* Route for deleting a product */}
            <Route path="/cart" element={<CartPage />} /> {/* Route for viewing the shopping cart */}
          </Routes>
        </Suspense>
      </main>

      {/* Footer is displayed on all pages */}
      <Footer />
    </div>
  );
}

// Makes the App component available for use in other parts of the application
export default App;