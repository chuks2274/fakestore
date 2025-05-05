// Import necessary hooks and libraries
import { useState, useEffect } from "react"; // React hooks for managing state and lifecycle
import axios from "axios"; // For making HTTP requests
import { Link } from "react-router-dom"; // For navigation between pages
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap"; // Bootstrap components for layout and UI

// Functional component to list products
const ProductList = () => {
  // State to store products array
  const [products, setProducts] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to store any error messages
  const [error, setError] = useState("");

  // useEffect to fetch products on component mount
  useEffect(() => {
    // AbortController to cancel the request if component unmounts
    const controller = new AbortController();

    // Async function to fetch product data
    const fetchProducts = async () => { // Function to fetch products from API
      try {
        // Make GET request to fake store API with signal and timeout
        const response = await axios.get("https://fakestoreapi.com/products", { // API endpoint for fetching products
          signal: controller.signal, // Attach the abort signal to the request
          timeout: 5000, // Set a 5-second timeout for the request
        })

        // If data is an array, update state
        if (Array.isArray(response.data)) { // Check if the response data is an array
          setProducts(response.data); // Set products state with the fetched data
        } else {
          // If data is not an array, throw an error
          throw new Error("Invalid product data."); // Custom error message
        }
      } catch (err) {
        // If request was cancelled
        if (axios.isCancel(err)) { // Check if the error is due to request cancellation
          console.log("Fetch cancelled"); // Log cancellation message
        } else {
          console.error("Fetch error:", err); // Log the error for debugging

          // Handle different error types
          if (err.response) {
            // Server responded with a status outside 2xx
            if (err.response.status === 404) {
              setError("Products not found (404)."); // Specific error message for 404
            } else {
              setError("Server error occurred while fetching products."); // General error message for other statuses
            }
          } else if (err.request) {
            // Request was made but no response received
            setError("No response received from server."); // Error message for no response
          } else {
            // Any other error
            setError("Failed to fetch products."); // General error message
          }
        }
      } finally {
        // Stop the loading spinner
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    // Slight delay before fetching products (optional UI polish)
    const timer = setTimeout(fetchProducts, 100); // Delay of 100ms before calling fetchProducts

    // Cleanup function: clear timer and cancel request if component unmounts
    return () => { 
      clearTimeout(timer); // Clear the timer to prevent memory leaks
      controller.abort(); // Abort the request if component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once on mount

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-info"> {/* Full-screen loading spinner */}
        <Spinner animation="border" role="status" variant="primary"> {/* Bootstrap spinner for loading indication */}
          <span className="visually-hidden">Loading...</span> {/* Screen reader text for accessibility */}
        </Spinner>
      </div>
    );
  }

  // Show error alert if there's an error
  if (error) {
    return (
      <div className="bg-info d-flex justify-content-center align-items-center min-vh-100"> { /* Full-screen error message */}
        <Alert variant="danger" className="text-center"> { /* Bootstrap alert for error message */}
          <strong>Error:</strong> {error} { /* Display error message */}
        </Alert>
      </div>
    );
  }

  // Render product list UI once data is successfully loaded
  return (
    <div className="ProductList bg-info py-5 min-vh-100"> {/* Full-screen product list */}
      <Container className="bg-info"> {/* Bootstrap container for layout */}
        <h2 className="text-center mb-5">Our Products</h2> {/* Title for the product list */}
        <Row>
          {/* Loop through all products and render each inside a Bootstrap column */}
          {products.map((product) => ( /* Map through products array to create a list of product cards */
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4"> { /* Responsive column layout */}
              <Card className="h-100 shadow-sm"> {/* Bootstrap card for product display */}
                {/* Product image with fallback on error */}
                <Card.Img
                  variant="top" // Image variant for card top
                  src={product.image} // Product image URL
                  alt={product.title} // Alt text for image
                  title={product.title} // Tittle for image tooltip
                  style={{ objectFit: "contain", height: "200px" }} // Style for image to fit within card
                  className="p-3" // Padding for image
                  onError={(e) => (e.currentTarget.src = "/fallback.png")} // Fallback image on error
                />
                <Card.Body className="d-flex flex-column"> {/* Card body with flex column layout */}
                  {/* Product title, truncated if long */}
                  <Card.Title className="fs-6 text-truncate" title={product.title}>
                    {product.title} {/* Display product title */}
                  </Card.Title>
                  {/* Product price with formatting */}
                  <Card.Text className="fw-bold text-success mb-3"> {/* Bold and colored price text */}
                    ${product.price.toFixed(2)} {/* Format price to 2 decimal places */}
                  </Card.Text>
                  {/* Button linking to product details page */}
                  <Link to={`/products/${product.id}`} className="btn btn-primary mt-auto"> {/* Button to view product details */}
                    View Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

// Makes the ProductList component available for use in other parts of the application 
export default ProductList;