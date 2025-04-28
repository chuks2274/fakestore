// Import necessary libraries and components
import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import { useParams, useNavigate } from "react-router-dom"; // Hooks for accessing route parameters and navigation
import axios from "axios"; // Axios for making HTTP requests
import Card from "react-bootstrap/Card"; // Bootstrap Card component for displaying product details
import Container from "react-bootstrap/Container"; // Bootstrap Container for layout
import Button from "react-bootstrap/Button"; // Bootstrap Button component for actions
import Spinner from "react-bootstrap/Spinner"; // Bootstrap Spinner for loading indicators

// Define the ProductDetails component
const ProductDetails = () => {
  const { id } = useParams(); // Extract the product ID from the route parameters
  const navigate = useNavigate(); // Initialize the navigate function for redirection

  // State variables for managing product details, loading, and error states
  const [product, setProduct] = useState(null); // Stores the product details
  const [loading, setLoading] = useState(true); // Tracks whether the product data is being fetched
  const [error, setError] = useState(null); // Stores error messages during data fetching
  const [deleting, setDeleting] = useState(false); // Tracks whether the product is being deleted
  const [deleteError, setDeleteError] = useState(null); // Stores error messages during deletion
  const [deleteSuccess, setDeleteSuccess] = useState(null); // Stores success messages after deletion
  const [cartQuantity, setCartQuantity] = useState(0); // Tracks the quantity of the product in the cart
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // Toggles the delete confirmation message

  // Fetch product details from the API when the component mounts or the ID changes
  useEffect(() => {
    setLoading(true); // Set loading state to true
    setError(null); // Clear any previous errors
    axios
      .get(`https://fakestoreapi.com/products/${id}`) // API call to fetch product details
      .then((response) => {
        setProduct(response.data); // Update the product state with the fetched data
      })
      .catch((error) => {
        setError(`Failed to fetch product: ${error.message}`); // Set error message if the request fails
      })
      .finally(() => {
        setLoading(false); // Set loading state to false
      });
  }, [id]); // Dependency array ensures this runs when the ID changes

  // Load the cart data from localStorage when the component mounts
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve the cart from localStorage
    const existingProduct = cart.find((item) => item.id === product?.id); // Check if the product is already in the cart
    if (existingProduct) {
      setCartQuantity(existingProduct.quantity); // Update the cart quantity state
    }
  }, [product]); // Dependency array ensures this runs when the product changes

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve the cart from localStorage
    const existingProduct = cart.find((item) => item.id === product.id); // Check if the product is already in the cart

    if (existingProduct) {
      existingProduct.quantity += 1; // Increment the quantity if the product exists
      setCartQuantity(existingProduct.quantity); // Update the cart quantity state
    } else {
      product.quantity = 1; // Set the initial quantity to 1
      cart.push(product); // Add the product to the cart
      setCartQuantity(1); // Update the cart quantity state
    }

    localStorage.setItem("cart", JSON.stringify(cart)); // Save the updated cart to localStorage
  };

  // Handle deleting the product
  const handleDeleteProduct = () => {
    setDeleting(true); // Set deleting state to true
    setDeleteError(null); // Clear any previous delete errors
    setDeleteSuccess(null); // Clear any previous delete success messages

    axios
      .delete(`https://fakestoreapi.com/products/${id}`) // API call to delete the product
      .then(() => {
        setDeleteSuccess("Product deleted successfully!"); // Set success message
        setTimeout(() => {
          navigate("/products"); // Redirect to the product list page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        setDeleteError(`Failed to delete product: ${error.message}`); // Set error message if the request fails
      })
      .finally(() => {
        setDeleting(false); // Set deleting state to false
        setShowConfirmDelete(false); // Hide the delete confirmation message
      });
  };

  // Toggle the delete confirmation message
  const toggleDeleteConfirmation = () => {
    setShowConfirmDelete(!showConfirmDelete); // Toggle the confirmation message visibility
  };

  // Display a loading message while the product data is being fetched
  if (loading) return <p>Loading product...</p>;

  // Display an error message if the product data fails to load
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Render the product details
  return (
    <Container>
      <Card>
        {/* Display the product image */}
        <Card.Img variant="top" src={product.image} alt={product.title} />
        <Card.Body>
          {/* Display the product title */}
          <Card.Title>{product.title}</Card.Title>
          {/* Display the product price */}
          <Card.Text>${product.price}</Card.Text>
          {/* Display the product description */}
          <Card.Text>{product.description}</Card.Text>

          {/* Action buttons for adding to cart and deleting the product */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <Button variant="primary" onClick={handleAddToCart} disabled={deleting}>
              {cartQuantity > 0 ? `Add to Cart (${cartQuantity})` : "Add to Cart"}
            </Button>

            <Button variant="danger" onClick={toggleDeleteConfirmation} disabled={deleting}>
              {deleting ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  /> Deleting...
                </>
              ) : (
                "Delete Product"
              )}
            </Button>
          </div>

          {/* Display confirmation message for delete */}
          {showConfirmDelete && (
            <div>
              <p>Are you sure you want to delete this product?</p>
              <Button variant="danger" onClick={handleDeleteProduct} disabled={deleting}>
                Yes, Delete
              </Button>
              <Button variant="secondary" onClick={toggleDeleteConfirmation} className="ms-2">
                Cancel
              </Button>
            </div>
          )}

          {/* Show success or error messages */}
          {deleteSuccess && <p style={{ color: "green" }}>{deleteSuccess}</p>}
          {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
        </Card.Body>
      </Card>
    </Container>
  );
};

// Export the ProductDetails component as the default export
export default ProductDetails;