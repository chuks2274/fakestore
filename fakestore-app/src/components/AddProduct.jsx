import { useState } from "react"; // Importing React's useState hook for managing state
import axios from "axios"; // Importing Axios for making HTTP requests
import Container from "react-bootstrap/Container"; // Importing Bootstrap's Container component for layout
import Form from "react-bootstrap/Form"; // Importing Bootstrap's Form component for form elements
import Button from "react-bootstrap/Button"; // Importing Bootstrap's Button component for button elements
import Spinner from "react-bootstrap/Spinner"; // Importing Bootstrap's Spinner component for loading indicator
import Alert from "react-bootstrap/Alert"; // Importing Bootstrap's Alert component for displaying messages

const AddProduct = () => {
  // State to store the form data
  const [formData, setFormData] = useState({
    title: "", // Title of the product
    description: "", // Description of the product
    category: "", // Category of the product
    price: "", // Price of the product
    image: "", // Image URL of the product
  });

  // State to manage loading status during form submission
  const [loading, setLoading] = useState(false);
  
  // State to store the newly added product data after successful submission
  const [newProduct, setNewProduct] = useState(null);
  
  // State to store error message if any occurs during product addition
  const [error, setError] = useState("");
  
  // State to store success message after successful product addition
  const [success, setSuccess] = useState("");

  // Function to reset error and success messages
  const resetMessages = () => {
    setError(""); // Reset the error message
    setSuccess(""); // Reset the success message
  };

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure the name and value from the event
    setFormData((prev) => ({
      ...prev, // Copy the previous form data
      [name]: value, // Update the specific field with the new value
    }));
    // Reset messages if there was an error or success
    if (error || success) resetMessages();
  };

  // Function to validate the form data before submission
  const validateForm = () => {
    const { title, description, category, price, image } = formData;
    // Check if any field is empty
    if (!title.trim() || !description.trim() || !category.trim() || !price.trim() || !image.trim()) {
      setError("All fields are required."); // Set error message if any field is empty
      return false; // Return false to indicate invalid form
    }
    // Check if the price is a positive number
    if (isNaN(price) || Number(price) <= 0) {
      setError("Price must be a positive number."); // Set error message if price is invalid
      return false; // Return false to indicate invalid form
    }
    return true; // Return true if the form is valid
  };

  // Function to handle product addition (form submission)
  const addProduct = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateForm()) return; // Validate the form, if not valid, return

    setLoading(true); // Set loading state to true while submitting
    resetMessages(); // Reset any previous error or success messages
    setNewProduct(null); // Reset newly added product state

    try {
      // Make an HTTP POST request to add the product using Axios
      const response = await axios.post("https://fakestoreapi.com/products", {
        ...formData, // Send all form data
        price: Number(formData.price), // Convert the price to a number
      });

      console.log("New product added:", response.data); // Log the response data

      setNewProduct(response.data); // Store the newly added product data
      setSuccess("Product added successfully!"); // Set success message

      // Reset the form fields
      setFormData({
        title: "",
        description: "",
        category: "",
        price: "",
        image: "",
      });
    } catch (err) {
      // Handle errors from the API request
      setError(
        err.response?.data?.message ||
        "Failed to add product. Please try again." // Set error message if API request fails
      );
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  return (
    <div
      className="bg-info d-flex justify-content-center align-items-start py-5" // Center and style the outer container
      style={{ minHeight: "100vh", overflow: "hidden" }} // Set minimum height to full screen and hide overflow
    >
      <Container className="p-4 rounded shadow-sm bg-info" style={{ maxWidth: "700px" }}>
        {/* Container to hold the form content */}
        <h2 className="text-center mb-4">Add a New Product</h2> {/* Heading for the page */}

        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if error exists */}
        {success && <Alert variant="success">{success}</Alert>} {/* Display success message if success exists */}

        {newProduct && (
          // If a new product was successfully added, display its details
          <div className="text-center mb-4">
            <img
              src={newProduct.image} // Display the image of the newly added product
              alt={newProduct.title} // Set alt text as the product title
              className="img-fluid mb-3 rounded"
              style={{ maxWidth: "200px" }}
            />
            <div>
              <p><strong>ID:</strong> {newProduct.id}</p>
              <p><strong>Title:</strong> {newProduct.title}</p>
              <p><strong>Category:</strong> {newProduct.category}</p>
              <p><strong>Price:</strong> ${newProduct.price}</p>
              <p><strong>Description:</strong> {newProduct.description}</p>
            </div>
          </div>
        )}

        <Form onSubmit={addProduct} className="d-flex flex-column align-items-center"> {/* Form submission handler */}
          {["title", "description", "category", "price", "image"].map((field, idx) => (
            // Loop through the form fields and create a form group for each
            <Form.Group key={idx} className="mb-3 w-100 d-flex flex-column align-items-center">
              <Form.Label className="w-100 text-center text-capitalize">
                {field === "image" ? "Image URL" : field} {/* Set label for the form field */}
              </Form.Label>
              <Form.Control
                type="text" // Use text input for all fields
                name={field} // Name attribute to identify the field
                placeholder={`Enter product ${field}`} // Placeholder text for each field
                value={formData[field]} // Set the current value of the field
                onChange={handleChange} // Handle input change
                disabled={loading} // Disable the input fields while the form is submitting
                required // Make the field required
                style={{ width: "60%" }} // Set the width of the input field
              />
            </Form.Group>
          ))}

          <Button
            variant="primary" // Primary button style
            type="submit" // Submit button type
            style={{ width: "40%" }} // Set button width
            disabled={loading} // Disable the button if loading
          >
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />{" "}
                Adding... {/* Show loading spinner and text while submitting */}
              </>
            ) : (
              "Add Product" // Display the normal button text when not loading
            )}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

// Makes the AddProduct component available for use in other parts of the application
export default AddProduct;