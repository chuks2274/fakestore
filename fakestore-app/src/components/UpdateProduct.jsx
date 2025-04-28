// Import necessary libraries and components
import axios from "axios"; // For making HTTP requests
import { useState } from "react"; // For managing component state
import Container from "react-bootstrap/Container"; // Bootstrap container for layout
import Form from "react-bootstrap/Form"; // Bootstrap form for input fields
import Button from "react-bootstrap/Button"; // Bootstrap button for form submission
import Spinner from "react-bootstrap/Spinner"; // Bootstrap spinner for loading state

// Define the UpdateProduct component
export const UpdateProduct = () => {
    // State for managing form data
    const [formData, setFormData] = useState({
        productId: '', // Product ID
        title: '', // Product title
        description: '', // Product description
        category: '', // Product category
        price: '', // Product price
        image: '', // Product image URL
    });

    // State for managing error and success messages
    const [error, setError] = useState(''); // Error message
    const [success, setSuccess] = useState(''); // Success message
    const [loading, setLoading] = useState(false); // Spinner state for loading

    // Handle input changes in the form
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update the form data state
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Validate the form before submission
    const validateForm = () => {
        const { productId, title, description, category, price, image } = formData;

        // Check if any required field is empty
        if (
            productId.trim() === '' ||
            title.trim() === '' ||
            description.trim() === '' ||
            category.trim() === '' ||
            price.trim() === '' ||
            image.trim() === ''
        ) {
            setSuccess(''); // Clear success message
            setError('Product ID, title, description, category, price, and image are required'); // Set error message
            return false;
        }
        setError(''); // Clear error message
        return true;
    };

    // Handle the form submission to update the product
    const updateProduct = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Validate the form
        if (!validateForm()) return;

        setLoading(true); // Show the spinner
        setError(''); // Clear error message
        setSuccess(''); // Clear success message

        try {
            const { productId, title, description, category, price, image } = formData;

            // Make an HTTP PUT request to update the product
            const response = await axios.put(`https://fakestoreapi.com/products/${productId}`, {
                id: productId,
                title,
                description,
                category,
                price,
                image,
            });

            console.log("Updated product:", response.data); // Log the updated product data

            // Set the success message with updated product details
            setSuccess(
                <div>
                    <p>Product #{response.data.id} Updated Successfully!</p>
                    <p>New Title: {response.data.title}</p>
                    <p>New Description: {response.data.description}</p>
                    <p>New Category: {response.data.category}</p>
                    <p>New Price: ${response.data.price}</p>
                    <p>New Image: {response.data.image}</p>
                </div>
            );
        } catch (error) {
            console.error("Update failed:", error); // Log the error
            setError(error.response?.data?.message || 'Failed to update product'); // Set error message
        } finally {
            setLoading(false); // Hide the spinner
        }
    };

    return (
        <Container className="mt-5">
            {/* Page heading */}
            <h2 className="mt-5 text-h">Update Product</h2>

            {/* Display error message if any */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Display success message if any */}
            {success && <div style={{ color: 'green' }}>{success}</div>}

            {/* Form for updating the product */}
            <Form onSubmit={updateProduct}>
                {/* Product ID input */}
                <Form.Group className="mb-3 form">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter id"
                        name="productId"
                        value={formData.productId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                {/* Title input */}
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

                {/* Description input */}
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

                {/* Category input */}
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

                {/* Price input */}
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

                {/* Image URL input */}
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
                            {/* Spinner for loading state */}
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> Updating...
                        </>
                    ) : (
                        "Update Product" // Button text when not loading
                    )}
                </Button>
            </Form>
        </Container>
    );
};

// Export the UpdateProduct component as the default export
export default UpdateProduct;