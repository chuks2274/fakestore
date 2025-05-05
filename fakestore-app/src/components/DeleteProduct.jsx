// Import necessary libraries and components
import { useState } from "react"; // useState is a React hook to manage state in the component
import axios from "axios"; // Import axios for making HTTP requests
import Container from "react-bootstrap/Container"; // Import Container from Bootstrap for layout
import Form from "react-bootstrap/Form"; // Import Form component from Bootstrap to handle form inputs
import Button from "react-bootstrap/Button"; // Import Button from Bootstrap to create buttons
import Spinner from "react-bootstrap/Spinner"; // Import Spinner from Bootstrap for loading indicators
import Alert from "react-bootstrap/Alert"; // Import Alert from Bootstrap to display error or success messages

// Define the DeleteProduct component
const DeleteProduct = () => {
  // Declare state variables
  const [productId, setProductId] = useState(""); // State to store the product ID input by the user
  const [product, setProduct] = useState(null); // State to store the fetched product data
  const [error, setError] = useState(""); // State to store error messages
  const [success, setSuccess] = useState(""); // State to store success messages
  const [loading, setLoading] = useState(false); // State to track loading status when searching for a product
  const [loadingDelete, setLoadingDelete] = useState(false); // State to track loading status during product deletion

  // Reset error and success messages
  const resetMessages = () => { // Function to reset error and success messages
    setError(""); // Reset error message
    setSuccess(""); // Reset success message
  };

  // Handle changes in the product ID input field
  const handleProductIdChange = (e) => { // Function to handle input changes
    setProductId(e.target.value); // Update the productId state with the new value
    if (error || success) resetMessages(); // Reset error or success messages if present
  };

  // Validate the product ID input
  const validateProductId = () => { // Function to validate the product ID
    if (!productId.trim()) { // Check if productId is empty or consists of only spaces
      setError("Product ID is required."); // Set error message
      return false; // Return false to indicate validation failed
    }
    if (isNaN(productId) || Number(productId) <= 0) { // Check if productId is not a valid positive number
      setError("Please enter a valid numeric Product ID."); // Set error message
      return false; // Return false to indicate validation failed
    }
    return true; // Return true if validation passes
  };

  // Find product using the product ID
  const findProduct = async (e) => { // Function to find a product by its ID
    e.preventDefault(); // Prevent form submission
    if (!validateProductId()) return; // If product ID is invalid, stop the function

    setLoading(true); // Set loading to true to indicate the product search is in progress
    resetMessages(); // Reset any existing error or success messages
    setProduct(null); // Reset product state to null before searching

    try {
      // Make an HTTP GET request to fetch the product from the API
      const response = await axios.get(`https://fakestoreapi.com/products/${productId}`); // API endpoint to fetch product by ID
      setProduct(response.data); // Set the product data in state
      console.log("Found product:", response.data); // Log the found product
    } catch (err) {
      // Handle error if the product is not found
      console.error("Find error:", err); // Log the error
      setError(
        err.response?.data?.message || // Check if the error response has a message
        "Failed to find product. Please try again." // Display error message from the server or a generic message
      );
    } finally {
      setLoading(false); // Set loading to false once the request is complete
    }
  };

  // Delete the product using the product ID
  const deleteProduct = async () => { // Function to delete the product
    if (!product) { // If no product is selected, show an error
      setError("No product selected for deletion."); // Set error message
      return; // Stop function execution
    }

    setLoadingDelete(true); // Set loadingDelete to true to indicate the deletion process is ongoing
    resetMessages(); // Reset error or success messages

    try {
      // Make an HTTP DELETE request to remove the product from the API
      await axios.delete(`https://fakestoreapi.com/products/${productId}`); // API endpoint to delete product by ID
      console.log("Deleted product ID:", productId); // Log the ID of the deleted product
      setSuccess(`Product #${productId} deleted successfully.`); // Display success message
      setProduct(null); // Reset product data after successful deletion
      setProductId(""); // Reset the product ID input field
    } catch (err) {
      // Handle error during product deletion
      console.error("Delete error:", err); // Log the error
      setError(
        err.response?.data?.message || // Check if the error response has a message
        "Failed to delete product. Please try again." // Display error message from the server or a generic message
      );
    } finally {
      setLoadingDelete(false); // Set loadingDelete to false after the deletion request is complete
    }
  };

  return (
    <div
      className="bg-info d-flex justify-content-center align-items-start py-5" // Styling for the background and layout of the container
      style={{ minHeight: "100vh", overflow: "hidden" }} // Make sure the height is 100% of the viewport and prevent scrolling
    >
      <Container className="bg-info p-4 rounded shadow-sm" style={{ maxWidth: "700px" }}> {/* Bootstrap container for the form */}
        <h2 className="mb-4 text-center">Find and Delete a Product</h2> {/* Title of the page */}

        {error && <Alert variant="danger">{error}</Alert>} {/* Display error alert if error message exists */}
        {success && <Alert variant="success">{success}</Alert>} {/* Display success alert if success message exists */}

        <Form onSubmit={findProduct} className="d-flex flex-column align-items-center"> {/* Form to find a product */}
          <Form.Group
            controlId="productId" // Control ID for the product ID input field
            className="mb-3 w-100 d-flex flex-column align-items-center" // Bootstrap class for styling and layout
          >
            <Form.Label className="w-100 text-center">Product ID</Form.Label> {/* Label for the input field */}
            <Form.Control
              type="text" // Input type for the product ID
              placeholder="Enter product ID" // Placeholder text for the input field
              value={productId} // Value of the input field bound to the productId state
              onChange={handleProductIdChange} // Update the productId state on input change
              disabled={loading || loadingDelete} // Disable input if loading or deleting
              style={{ width: "60%" }} // Set the width of the input field
            />
          </Form.Group>

          <Button
            variant="primary" // Button styled with blue color
            type="submit" // Submit type to trigger form submission
            disabled={loading || loadingDelete} // Disable the button if loading or deleting
            style={{ width: "40%" }} // Set the width of the button
          >
            {loading ? ( // Display loading state in the button while searching
              <>
                <Spinner
                  as="span" // Spinner component for loading indication
                  animation="border" // Spinner animation type
                  size="sm" // Size of the spinner
                  role="status" // Role for accessibility
                  aria-hidden="true" // Hide spinner from screen readers
                />{" "} 
                Finding...
              </> // Show spinner and text while loading
            ) : (
              "Find Product"
            )}
          </Button>
        </Form>

        {product && ( // Display product details if product is found
          <div className="mt-4 p-3 rounded shadow-sm bg-info form"> {/* Container for product details */}
            <h4 className="mb-3">Product Information</h4> {/* Title for product information */}
            <p><strong>Title:</strong> {product.title}</p> {/* Display product title */}
            <p><strong>Category:</strong> {product.category}</p> {/* Display product category */}
            <p><strong>Price:</strong> ${product.price}</p> {/* Display product price */}
            <p><strong>Description:</strong> {product.description}</p> {/* Display product description */}
            <div className="text-center"> {/* Centered image display */}
              <img
                src={product.image} // Display product image
                alt={product.title} // Alt text for image
                width="150" // Set image width
                height="150" // Set image height
                style={{ objectFit: "contain" }} // Style to fit the image within the container
                className="mb-3" // Margin bottom for spacing
              />
            </div>

            <div className="d-flex justify-content-center mt-3"> {/* Flexbox for button layout */}
              <Button
                variant="danger" // Delete button styled with red color
                onClick={deleteProduct} // Trigger delete product function
                disabled={loadingDelete} // Disable button if deleting
                style={{ width: "40%" }} // Set the width of the button
              >
                {loadingDelete ? ( // Display loading state in the button while deleting
                  <>
                    <Spinner
                      as="span" // Spinner component for loading indication
                      animation="border" // Spinner animation type
                      size="sm" // Size of the spinner
                      role="status" // Role for accessibility
                      aria-hidden="true" // Hide spinner from screen readers
                    />{" "} 
                    Deleting...
                  </> // Show spinner and text while loading
                ) : (
                  "Delete Product"
                )}
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

// Makes the DeleteProduct component available for use in other parts of the application 
export default DeleteProduct;