// Import necessary libraries and components
import React from 'react'; // React library for building user interfaces
import { Link } from "react-router-dom"; // Link component for navigation between routes
import Button from "react-bootstrap/Button"; // Bootstrap Button component for styling buttons

// Define the Home component
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="home-content">
        {/* Welcome message */}
        <h1 className="text-h">Welcome to HumbleStore</h1>
        {/* Brief description of the store */}
        <p className="text">
          Thank you for choosing us! The products you have been looking for are here.
          Discover your perfect fit at unbeatable prices. Shop now and get exclusive discounts on your first order!
        </p>
      </div>

      {/* View Products Button */}
      <div>
        {/* Link to navigate to the products page */}
        <Link to="/products/">
          {/* Bootstrap-styled button */}
          <Button variant="primary" type="button">
            View Products
          </Button>
        </Link>
      </div>
    </>
  );
};

// Export the Home component as the default export
export default Home;