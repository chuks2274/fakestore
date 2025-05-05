// React hooks for component state and lifecycle
import { useState, useEffect } from "react";
// React Router hooks for accessing route parameters and navigation
import { useParams, useNavigate } from "react-router-dom";
// Axios for HTTP requests
import axios from "axios";
// Bootstrap components for UI styling
import {
  Card, 
  Container,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
// Icon for cart button
import { FaShoppingCart } from "react-icons/fa";

// Main functional component for displaying product details
const ProductDetails = () => { 
  // Extract product ID from route parameters
  const { id } = useParams();
  // Hook to programmatically navigate between routes
  const navigate = useNavigate();

  // State for product data
  const [product, setProduct] = useState(null);
  // State to indicate if data is loading
  const [loading, setLoading] = useState(true);
  // State to hold any error messages
  const [error, setError] = useState("");
  // State to track quantity of this product in cart
  const [cartQuantity, setCartQuantity] = useState(0);
  // State to track total number of items in cart
  const [totalCartItems, setTotalCartItems] = useState(0);

  // States for handling product deletion
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // Fetch product details on component mount or when ID changes
  useEffect(() => { // Effect to fetch product details
    const fetchProduct = async () => { // Function to fetch product data from API
      try {
        const res = await axios.get(`https://fakestoreapi.com/products/${id}`); // API call to fetch product details
        setProduct(res.data); // Set fetched product
        setError(""); // Clear error
      } catch (err) {
        setError("Failed to fetch product details."); // Set error message
        console.error(err);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]); // Dependency: runs when `id` changes

  // Update cart states when product data is available
  useEffect(() => { // Effect to update cart states
    if (!product) return; // Exit if product is not yet loaded
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage

    // Get quantity of current product in cart
    const existing = cart.find((item) => item.id === product.id); // Check if product exists in cart
    setCartQuantity(existing ? existing.quantity : 0); // Set cart quantity

    // Get total quantity of all items in cart
    const total = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items in cart
    setTotalCartItems(total); // Set total items in cart
  }, [product]); // Run when product is set

  // Adds product to cart and updates localStorage and UI states
  const handleAddToCart = () => { // Function to handle adding product to cart
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage
    const index = cart.findIndex((item) => item.id === product.id); // Check if product is already in cart

    if (index >= 0) { // if product is already in cart
      cart[index].quantity += 1; // Increment quantity if already in cart
      setCartQuantity(cart[index].quantity); // Update cart quantity state
    } else {
      const newProduct = { ...product, quantity: 1 }; // Create new product object with quantity
      cart.push(newProduct); // Add new product to cart
      setCartQuantity(1); // Set cart quantity to 1 for new product
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage

    // Recalculate total cart items
    const total = cart.reduce((sum, item) => sum + item.quantity, 0); // Calculate total items in cart
    setTotalCartItems(total); // Update total items in cart state

    // Navigate back to product list after a short delay
    setTimeout(() => navigate("/products"), 1000); // Redirect to product list after 1 second
  };

  // Handles product deletion with confirmation and feedback
  const handleDeleteProduct = async () => { // Function to handle product deletion
    setDeleting(true); // Start deletion state
    setDeleteError(""); // Clear error
    setDeleteSuccess(""); // Clear previous success

    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`); // API call to delete
      setDeleteSuccess("Product deleted successfully!"); // Set success message
      setTimeout(() => navigate("/products"), 2000); // Redirect after success
    } catch (err) {
      setDeleteError("Failed to delete the product."); // Set error message
      console.error(err);
    } finally {
      setDeleting(false); // End deleting state
      setShowConfirmDelete(false); // Hide confirm box
    }
  };

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-info"> {/* Full-screen loading spinner */}
        <Spinner animation="border" variant="primary" /> {/* Bootstrap spinner for loading indication */}
      </div>
    );
  }

  // Show error message if fetch fails
  if (error) {
    return (
      // Outer div that serves as the full-page container with a blue background
<div className="bg-info d-flex justify-content-center align-items-center min-vh-100 w-100"> 
  
  {/*Bootstrap Alert component styled as a red ("danger") alert and centered text*/}
  <Alert variant="danger" className="text-center">
    
  {/*Bold label for the error followed by the actual error message */}
    <strong>Error:</strong> {error}
  
  </Alert>
</div>
    );
  }

  // Render product detail page once data is ready
  return (
    <div className="bg-info py-4 min-vh-100"> {/* Full-screen product detail page */}
      <Container>
        <Card className="shadow"> {/* Bootstrap card for product details*/}
          {/* Product image */}
          <Card.Img
            variant="top" // Image variant for card top
            src={product.image} // Product image URL
            alt={product.title} // Alt text for image
            style={{ objectFit: "contain", height: "300px", padding: "1rem" }} // Style for image to fit within card
          />
          <Card.Body>
            {/* Product title and price */}
            <Card.Title>{product.title}</Card.Title> {/* Product title */}
            <Card.Text className="fw-bold text-success">${product.price}</Card.Text> {/* Product price with formatting */}
            <Card.Text>{product.description}</Card.Text> {/* Product description */}

            {/* Action buttons for cart, delete, navigation */}
            <div className="d-flex flex-wrap gap-2 my-3"> {/* Flexbox for button layput */}
              {/* Add to cart with quantity label */}
              <Button
                variant="primary" // Bootstrap primary button for adding to cart
                onClick={handleAddToCart} // Function to handle adding product to cart
                disabled={deleting} // Disable button if deleting
              >
                {cartQuantity > 0 ? `Add to Cart (${cartQuantity})` : "Add to Cart"} {/* Button text changes based on cart quantity */}
              </Button>

              {/* Delete product button */}
              <Button
                variant="danger" // Bootstrap danger button for deleting product
                onClick={() => setShowConfirmDelete(true)} // Show confirmation dialog
                disabled={deleting} // Disable button if deleting
              >
                {deleting ? ( // Show spinner if deleting
                  <>
                    <Spinner
                      as="span" // Bootstrap spinner component
                      animation="border" // Spinner animation type
                      size="sm" // Small size for spinner
                      role="status" // Accessibility role
                      aria-hidden="true" // Hide spinner from screen readers
                    />{" "} {/* Space between spinner and text */}
                    Deleting...
                  </>
                ) : (
                  "Delete Product"
                )}
              </Button>

              {/* Back to product list */}
              <Button
                variant="secondary" // Bootstrap secondary button for navigation
                onClick={() => navigate("/products")} // Function to navigate back to product list
              >
                Back to Products
              </Button>

              {/* Go to cart with item count */}
              <Button
                variant="success" // Bootstrap success button for cart navigation
                onClick={() => navigate("/cart")} // Function to navigate to cart page
              >
                <FaShoppingCart className="me-2" /> {/* Cart icon */}
                Go to Cart ({totalCartItems}) {/* Display total items in cart */}
              </Button>
            </div>

            {/* Confirmation dialog for deletion */}
            {showConfirmDelete && (  // Show confirmation dialog if delete button is clicked 
              <div className="mb-3"> {/* Margin bottom for spacing */}
                <Alert variant="warning"> {/* Bootstrap aleart for warning */}
                  <p>Are you sure you want to delete this product?</p> {/* Warning message */}
                  <div className="d-flex gap-2"> {/* Flexbox for button layout */}
                    <Button
                      variant="danger" // Bootstrap danger button for confirmation
                      onClick={handleDeleteProduct} // Function to handle product deletion
                      disabled={deleting} // Disable button if deleting
                    >
                      Yes, Delete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => setShowConfirmDelete(false)} // Function to hide confirmation dialog
                    >
                      Cancel
                    </Button>
                  </div>
                </Alert>
              </div>
            )}

            {/* Show success message after deletion */}
            {deleteSuccess && ( // Show success message if deletion is successful
              <Alert variant="success" className="mt-3"> {/* Bootstrap alert for success */}
                {deleteSuccess} {/* Display success message */}
              </Alert>
            )}
            {/* Show error message if deletion fails */}
            {deleteError && ( // Show error message if deletion fails
              <Alert variant="danger" className="mt-3"> {/*Bootstrap alert for error */}
                {deleteError} {/* Display error message */}
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

// Makes the ProductDetails component available for use in other parts of the application 
export default ProductDetails;