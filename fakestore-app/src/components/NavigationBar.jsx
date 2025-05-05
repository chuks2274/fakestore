// Import React hook for managing component state
import { useState } from "react";
// Import Bootstrap components for navbar UI
import { Navbar, Nav, Container } from "react-bootstrap";
// Import Link from React Router to enable client-side navigation
import { Link } from "react-router-dom";
// Import shopping cart icon from react-icons
import { FaShoppingCart } from "react-icons/fa";

// Define the NavigationBar component
const NavigationBar = () => {
  // State to track if the navbar menu is expanded (useful on mobile)
  const [expanded, setExpanded] = useState(false);

  // Toggle the expanded state when the toggle button is clicked
  const handleToggle = () => { // Function to handle toggle button click
    setExpanded(!expanded); // Toggle the expanded state
  };

  // Collapse the navbar menu when a nav link is clicked
  const handleNavItemClick = () => { // Function to handle nav link click
    setExpanded(false); // Collapse menu after clicking a link
  };

  return (
    // Bootstrap Navbar with expand behavior and dynamic state
    <Navbar bg="light" expand="lg" expanded={expanded}> {/* Light background and large screen expansion */}
      <Container>
        {/* Brand/logo that navigates to the home page */}
        <Navbar.Brand as={Link} to="/" onClick={handleNavItemClick}>
          HumbleStore
        </Navbar.Brand>

        {/* Button shown on smaller screens to toggle menu */}
        <Navbar.Toggle onClick={handleToggle} aria-controls="basic-navbar-nav" />

        {/* Collapsible section that contains nav links */}
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Nav links aligned to the right */}
          <Nav className="ms-auto align-items-center">
            {/* Link to home page */}
            <Nav.Link as={Link} to="/" onClick={handleNavItemClick}> 
              Home
            </Nav.Link>
            {/* Link to product list page */}
            <Nav.Link as={Link} to="/products" onClick={handleNavItemClick}> 
              Products
            </Nav.Link>
            {/* Link to add product page */}
            <Nav.Link as={Link} to="/addproducts" onClick={handleNavItemClick}>
              Add Product
            </Nav.Link>
            {/* Link to update product page */}
            <Nav.Link as={Link} to="/updateproducts" onClick={handleNavItemClick}>
              Update Product
            </Nav.Link>
            {/* Link to delete product page */}
            <Nav.Link as={Link} to="/deleteproducts" onClick={handleNavItemClick}>
              Delete Product
            </Nav.Link>
            {/* Styled link to the cart page, includes cart icon */}
            <Nav.Link
              as={Link} // Link to the cart page
              to="/cart" // Path to the cart page
              onClick={handleNavItemClick} // Collapse menu after clicking the link
              style={{ // Inline styles for the cart link
                backgroundColor: "#0d6efd", // Bootstrap primary blue
                color: "white", // Text color
                padding: "8px 16px", // Padding for the link
                borderRadius: "6px", // Rounded corners
                marginLeft: "15px", // Space between cart and other links
                fontWeight: "500", // Font weight
                display: "flex", // Flexbox for alignment
                alignItems: "center", // Center items vertically
                gap: "8px", // Space between icon and text
              }}
            >
              {/* Cart icon */}
              <FaShoppingCart /> Cart
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

// Makes the NavigationBar component available for use in other parts of the application 
export default NavigationBar;