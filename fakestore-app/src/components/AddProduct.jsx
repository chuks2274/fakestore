// Import necessary libraries and components
import axios from "axios"; // Axios for making HTTP requests
import { useState } from "react"; // React hook for managing state
import Container from "react-bootstrap/Container"; // Bootstrap Container for layout
import Form from "react-bootstrap/Form"; // Bootstrap Form for input fields
import Button from "react-bootstrap/Button"; // Bootstrap Button component
import Alert from "react-bootstrap/Alert"; // Bootstrap Alert for displaying messages
import Spinner from "react-bootstrap/Spinner"; // Bootstrap Spinner for loading indicators

// Define the AddProduct component
const AddProduct = () => {
    // State variables for managing form inputs, product data, and UI states
    const [product, setProduct] = useState(null); // Stores the added product details
    const [submitted, setSubmitted] = useState(false); // Tracks whether the form has been successfully submitted
    const [error, setError] = useState(null); // Stores error messages
    const [loading, setLoading] = useState(false); // Tracks the loading state for form submission
    const [formData, setFormData] = useState({
        title: '', // Product title
        description: '', // Product description
        category: '', // Product category
        price: '', // Product price
        image: '', // Product image URL
    });

    // Handle changes to form input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Extract the name and value of the input field
        setFormData((prev) => ({
            ...prev, // Keep the previous form data
            [name]: value, // Update the specific field
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior

        // Validate that the price is a number
        if (isNaN(formData.price)) {
            setError("Price must be a number."); // Set an error message if the price is invalid
            setSubmitted(false); // Reset the submitted state
            return;
        }

        setLoading(true); // Set the loading state to true
        setError(null); // Clear any previous error messages

        try {
            // Make a POST request to add the product
            const response = await axios.post("https://fakestoreapi.com/products", {
                ...formData, // Include the form data
                price: parseFloat(formData.price), // Ensure the price is a number
            });

            console.log("Product added:", response.data); // Log the added product
            setProduct(response.data); // Update the product state with the response data
            setSubmitted(true); // Set the submitted state to true

            // Reset the form fields
            setFormData({
                title: '',
                description: '',
                category: '',
                price: '',
                image: '',
            });
        } catch (error) {
            console.error("Submit error:", error); // Log the error to the console
            setError(`Error submitting the form: ${error.message}`); // Set an error message
            setSubmitted(false); // Reset the submitted state
        } finally {
            setLoading(false); // Set the loading state to false
        }
    };

    return (
        <Container className="mt-5">
            {/* Page heading */}
            <h2 className="mt-5 text-h">Add Product</h2>

            {/* Display success message if the product is added */}
            {submitted && product && (
                <Alert variant="success" dismissible>
                    Product <strong>{product.title}</strong> added successfully!
                    <br />
                    <img src={product.image} alt={product.title} width="100" style={{ marginTop: '10px' }} />
                </Alert>
            )}

            {/* Display error message if an error occurs */}
            {error && (
                <Alert variant="danger" dismissible>
                    {error}
                </Alert>
            )}

            {/* Form for adding a product */}
            <Form onSubmit={handleSubmit}>
                {/* Input field for the product title */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Input field for the product description */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Input field for the product category */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Input field for the product price */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter a price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Input field for the product image URL */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter an image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Submit button */}
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />{" "}
                            Adding...
                        </>
                    ) : (
                        "Add Product"
                    )}
                </Button>
            </Form>
        </Container>
    );
};

// Export the AddProduct component as the default export
export default AddProduct;