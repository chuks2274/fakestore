// Import necessary hooks and libraries
import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import axios from "axios"; // Axios for making HTTP requests
import Card from "react-bootstrap/Card"; // Bootstrap Card component for displaying product details
import Container from "react-bootstrap/Container"; // Bootstrap Container for layout
import Row from "react-bootstrap/Row"; // Bootstrap Row for grid layout
import Col from "react-bootstrap/Col"; // Bootstrap Col for grid layout
import { Link } from "react-router"; // Link component for navigation

// Define the ProductList component
const ProductList = () => {
  // State variables for storing products, loading status, and error messages
  const [products, setProducts] = useState(); // Stores the list of products
  const [loading, setLoading] = useState(true); // Tracks whether data is being loaded
  const [error, setError] = useState(); // Stores any error messages

  // Fetch products from the API when the component mounts
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products") // API endpoint for fetching products
      .then((response) => {
        setProducts(response.data); // Update the products state with the fetched data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(`Failed to fetch products: ${error.message}`); // Set error message if the request fails
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Display a loading message while data is being fetched
  if (loading) return <p>Loading products...</p>;

  // Display an error message if the API request fails
  if (error) return <p>{error}</p>;

  // Render the list of products
  return (
    <>
      <div className="ProductList">
        {/* Bootstrap container for layout */}
        <Container className="container">
          <Row>
            {/* Map through the products array and render each product */}
            {products.map((product) => (
              <Col key={product.id} mb={4} className="mb-3">
                {/* Bootstrap card for displaying product details */}
                <Card className="card">
                  <Card.Img
                    className="Url"
                    variant="top"
                    src={product.image} // Display the product image
                  />
                  <Card.Body>
                    <Card.Title className="text">
                      {product.title} {/* Display the product title */}
                    </Card.Title>
                    <Card.Text className="text">
                      ${product.price} {/* Display the product price */}
                    </Card.Text>
                  </Card.Body>
                  {/* Link to the product details page */}
                  <Link
                    className="custom-button text"
                    to={`/products/${product.id}`}
                  >
                    View Details
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

// Export the ProductList component as the default export
export default ProductList;