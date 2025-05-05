// Import necessary libraries and components
import React from 'react'; // Import the core React library to enable React features
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from React Router to enable programmatic navigation
import Button from "react-bootstrap/Button"; // Import Bootstrap's Button component for styled buttons

// Define the Home component
const Home = () => {
  const navigate = useNavigate(); // Initialize the navigate function using the useNavigate hook for programmatic navigation

  // Navigate to products page when button is clicked
  const handleViewProducts = () => { // Function to handle button click
    navigate('/products'); // Navigate to the '/products' route when the button is clicked
  };

  return (
    <div
      className="home-section d-flex flex-column justify-content-start align-items-center text-white text-center px-3" 
      // The main div that serves as the container for the home page.
      // Using utility classes from Bootstrap to control layout, such as making the content a flex column, centering text, etc.
      style={{
        backgroundImage: 'url("./Picture/pic-60.jpg")', // Sets the background image of the page using an image from Unsplash.
        backgroundSize: 'cover', // Ensures the background image covers the entire screen.
        backgroundPosition: 'center', // Centers the background image.
        minHeight: '100vh', // Ensures the minimum height of the section is 100% of the viewport height.
      }}
    >
      {/* Hero Title moved up */}
      <h1 className="display-4 fw-bold mb-2 mt-5">Welcome to HumbleStore</h1>
      {/* This is the main title of the page with large, bold text. */}
      {/* 'mb-2' adds margin to the bottom, 'mt-5' adds margin to the top for spacing. */}

      {/* Hero Text */}
      <p className="lead mb-4">
        {/* This paragraph provides a short description of the store, introducing the products and special offers. */}
        Thank you for choosing us! The products you’ve been looking for are here.
        Discover your perfect fit at unbeatable prices. Shop now and enjoy exclusive discounts!
      </p>

      {/* Call-to-Action Button with blue color */}
      <Button
        variant="primary" // Sets the button color to blue using the Bootstrap "primary" variant.
        size="lg" // Makes the button large.
        onClick={handleViewProducts} // Executes the handleViewProducts function when the button is clicked, navigating to the products page.
        className="fw-semibold" // Applies Bootstrap's "fw-semibold" class to make the button text slightly bolder.
      >
        View Products
        {/* Button text indicating the action to be taken when clicked. */}
      </Button>
    </div>
  );
};

// Makes the Home component available for use in other parts of the application 
export default Home;  