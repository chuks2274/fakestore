// Import necessary libraries and components
import React, { useState } from "react"; // React and useState hook
import axios from "axios"; // Axios for making HTTP requests
import Container from "react-bootstrap/Container"; // Bootstrap container for layout
import Form from "react-bootstrap/Form"; // Bootstrap form component
import Button from "react-bootstrap/Button"; // Bootstrap button component
import Spinner from "react-bootstrap/Spinner"; // Bootstrap spinner for loading indication
import Alert from "react-bootstrap/Alert"; // Bootstrap alert for messages

// Functional component for updating a product
const UpdateProduct = () => {
  // Local state for form data, representing product fields
  const [formData, setFormData] = useState({
    productId: '',       // ID of the product to update
    title: '',           // Product title
    description: '',     // Product description
    category: '',        // Product category
    price: '',           // Product price
    image: '',           // Product image URL
  });

  // Local states to manage error message, success message, loading status, and result
  const [error, setError] = useState(''); // Holds error message if any
  const [success, setSuccess] = useState(''); // Holds success message
  const [loading, setLoading] = useState(false); // Indicates if update is in progress
  const [updatedProduct, setUpdatedProduct] = useState(null); // Stores updated product data

  // Handle input changes and reset error/success messages
  const handleChange = (event) => { // Function to handle input changes
    const { name, value } = event.target; // Destructure name and value from the input event
    setFormData((prev) => ({ // Update formData for the changed field
      ...prev, // Spread previous state to keep other fields intact
      [name]: value, // Use computed property name to set the correct data field
    }));
    if (error) setError(''); // Clear error on input change
    if (success) setSuccess(''); // Clear success on input change
  };

  // Validate that all fields are filled and price is a number
  const validateForm = () => { // Function to validate form data
    const { productId, title, description, category, price, image } = formData; // Destructure formData for validation
    // Check if any field is empty or if price is not a number
    if (!productId || !title || !description || !category || !price || !image) {
      setError('All fields are required.'); // Show error if any field is missing or empty
      return false; // Stop validation if any field is empty
    }
    if (isNaN(price)) { // Check if price is not a number
      setError('Price must be a valid number.'); // Show error if price is not a number
      return false; // Stop validation if price is invalid
    }
    return true; // Return true if all validations pass
  };

  // Handle form submission and send PUT request to update product
  const handleUpdateProduct = async (event) => { // Function to handle form submission
    event.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return; // Stop if form is invalid

    setLoading(true); // Start loading spinner
    setError(''); // Clear previous error
    setSuccess(''); // Clear previous success
    setUpdatedProduct(null); // Clear previous updated product display

    try {
      // Separate productId from the rest of the product details
      const { productId, ...productDetails } = formData; // Destructure productId and rest of the details

      // Send PUT request to update the product
      const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, productDetails); // API endpoint for updating product
      console.log('Updated product:', response.data); // Log updated product

      // Update state with the returned product and success message
      setUpdatedProduct(response.data); // Store updated product data
      setSuccess(`Product #${response.data.id} updated successfully!`); // Show success massage

      // Reset form fields after successful update
      setFormData({
        productId: '', // Reset productId field
        title: '',   // Reset tittle field
        description: '', // Reset description field
        category: '', // Reset category field
        price: '', // Reset price field
        image: '', // Reset image field
      });
    } catch (err) {
      // Handle errors and display appropriate message
      setError(err.response?.data?.message || 'An error occurred while updating the product.'); // Show error message if request fails
    } finally {
      setLoading(false); // Stop spinner regardless of outcome
    }
  };

  return (
    // Page container with background and vertical spacing
    <div
      className="bg-info d-flex justify-content-center align-items-start py-5"
      style={{ minHeight: "100vh", overflow: "hidden" }} // Full height and hidden overflow for better layout
    >
      {/* Bootstrap container for form layout */}
      <Container className="p-4 rounded shadow-sm bg-info" style={{ maxWidth: '700px' }}> {/* Set max width for the form */}
        <h2 className="text-center mb-4">Update Product</h2> {/* Form title */}

        {/* Show error alert if error exists */}
        {error && <Alert variant="danger">{error}</Alert>} 
        
        {/* Show success alert if product was updated */}
        {success && <Alert variant="success">{success}</Alert>} 

        {/* Show updated product info after successful update */}
        {updatedProduct && (
          <div className="mb-4 text-center"> {/* Centered display of updated product */}
            <img
              src={updatedProduct.image} // Display updated product image
              alt={updatedProduct.title} // Alt text for image
              className="img-fluid mb-3" // Responsive image class
              style={{ maxHeight: '200px', borderRadius: '10px' }} // Style for image
              /> 
            <div>
              <p><strong>ID:</strong> {updatedProduct.id}</p> {/* Display updated product ID */}
              <p><strong>Title:</strong> {updatedProduct.title}</p>  {/* Display updated product title */}
              <p><strong>Description:</strong> {updatedProduct.description}</p> {/* Display updated product description */}
              <p><strong>Category:</strong> {updatedProduct.category}</p> {/* Display updated product category */}
              <p><strong>Price:</strong> ${updatedProduct.price}</p> {/* Display updated product price */}
            </div>
          </div>
        )}

        {/* Form to update product */}
        <Form onSubmit={handleUpdateProduct} className="d-flex flex-column align-items-center"> {/* Form submission handler */}
          {/* Dynamically render input fields */}
          {[ 
            { label: 'Product ID', name: 'productId', type: 'number' }, // Prduct ID field
            { label: 'Title', name: 'title', type: 'text' }, // Product title field
            { label: 'Description', name: 'description', type: 'text' }, // Product description field
            { label: 'Category', name: 'category', type: 'text' }, // Product category field
            { label: 'Price', name: 'price', type: 'text' }, // Product price field
            { label: 'Image URL', name: 'image', type: 'text' }, // Product image URL field
          ].map(({ label, name, type }) => (
            <Form.Group key={name} className="mb-3 w-100 d-flex flex-column align-items-center"> {/* Map through fields to create input elements */}
              <Form.Label className="w-100 text-center">{label}</Form.Label> {/* label for each field */}
              <Form.Control
                type={type} // Field type (text, number)
                name={name} // Field name
                value={formData[name]} // Controlled component: value comes from state
                onChange={handleChange} // Update state on change
                placeholder={`Enter ${label.toLowerCase()}`} // Placeholder text
                disabled={loading} // Disable input during loading
                required // Make field required
                style={{ width: "60%" }} // Input field width
              />
            </Form.Group>
          ))}

          {/* Submit button with spinner if loading */}
          <Button
            variant="primary" // Bootstrap primary button style
            type="submit" // Submit button type
            style={{ width: "40%" }} // Button width
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <>
                <Spinner
                  as="span" // Spinner component
                  animation="border" // Spinner animation type
                  size="sm" // Spinner size
                  role="status" // Accessibility role
                  aria-hidden="true" // Hide spinner from screen readers
                />{" "}
                Updating...
              </> // Spinner and text if loading
            ) : (
              "Update Product" // Button text if not loading
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

// Makes the UpdateProduct component available for use in other parts of the application 
export default UpdateProduct;