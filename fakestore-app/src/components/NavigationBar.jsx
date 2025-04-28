// Import Bootstrap components for building the navigation bar
import Container from 'react-bootstrap/Container'; // Provides a responsive fixed-width container
import Nav from 'react-bootstrap/Nav'; // Used for navigation links
import Navbar from 'react-bootstrap/Navbar'; // Main navigation bar component

// Define the NavigationBar component
const NavigationBar = () => {
  return (
    <> 
      {/* Bootstrap Navbar component */}
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* Brand name or logo on the left */}
          <Navbar.Brand href="/">HumbleStore</Navbar.Brand>

          {/* Toggle button for collapsing the navbar on smaller screens */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible navigation links */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto"> {/* Align navigation links to the right */}
              {/* Navigation links for different pages */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="products">Products</Nav.Link>
              <Nav.Link href="addproducts">Add Product</Nav.Link>
              <Nav.Link href="updateproducts">Update Product</Nav.Link>
              <Nav.Link href="deleteproducts">Delete Product</Nav.Link>
              <Nav.Link href="cart">Cart</Nav.Link>
            </Nav> 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

// Export the NavigationBar component as the default export
export default NavigationBar;