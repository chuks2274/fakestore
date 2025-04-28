import axios from "axios"; // Axios for making HTTP requests
import { useState } from "react"; // React hook for managing state
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Container from "react-bootstrap/Container"; // Bootstrap Container for layout
import Form from "react-bootstrap/Form"; // Bootstrap Form for input fields
import Button from "react-bootstrap/Button"; // Bootstrap Button component
import Spinner from "react-bootstrap/Spinner"; // Bootstrap Spinner for loading indicators

// Define the DeleteProduct component
const DeleteProduct = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const [productId, setProductId] = useState(''); // Stores the product ID entered by the user
    const [product, setProduct] = useState(null); // Stores the product details fetched from the API
    const [error, setError] = useState(''); // Stores error messages
    const [success, setSuccess] = useState(''); // Stores success messages
    const [loadingFind, setLoadingFind] = useState(false); // Tracks the loading state for finding a product
    const [loadingDelete, setLoadingDelete] = useState(false); // Tracks the loading state for deleting a product

    // Handle changes to the product ID input field
    const handleproductIdChange = (event) => {
        setProductId(event.target.value);
    };

    // Validate the form to ensure the product ID is not empty
    const validateForm = () => {
        if (String(productId).trim() === '') {
            setError('Product ID is required'); // Set an error message if the product ID is empty
            return false;
        }
        setError(''); // Clear any previous error messages
        return true;
    };

    // Function to find a product by its ID
    const findProduct = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        if (!validateForm()) return; // Validate the form before proceeding

        setLoadingFind(true); // Set the loading state to true
        setError(''); // Clear any previous error messages
        setSuccess(''); // Clear any previous success messages

        try {
            // Make a GET request to fetch the product details
            const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
            setProduct(response.data); // Update the product state with the fetched data
            setProductId(String(response.data.id)); // Update the product ID state
        } catch (error) {
            setProduct(null); // Clear the product state if an error occurs
            setError(error.response?.data?.message || error.message || 'Failed to find product'); // Set an error message
            console.error("Find error:", error); // Log the error to the console
        } finally {
            setLoadingFind(false); // Set the loading state to false
        }
    };

    // Function to delete a product by its ID
    const deleteProduct = async () => {
        if (!productId || !product) {
            setError("No product selected for deletion"); // Set an error message if no product is selected
            return;
        }

        setLoadingDelete(true); // Set the loading state to true
        setError(''); // Clear any previous error messages
        setSuccess(''); // Clear any previous success messages

        try {
            console.log("Attempting to delete product with ID:", productId);

            // Make a DELETE request to delete the product
            const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`);

            console.log("API response:", response.data);
            console.log("Deleted Product Info:", product);

            setSuccess(`Product #${productId} deleted successfully`); // Set a success message
            setProduct(null); // Clear the product state

            // Redirect to the product listing page after deletion
            setTimeout(() => {
                navigate("/products"); // Redirect to the products page
            }, 1500); // Redirect after 1.5 seconds to show the success message
        } catch (error) {
            console.error("Delete error:", error); // Log the error to the console
            setError(
                error.response?.data?.message ||
                error.message ||
                'Failed to delete product' // Set an error message
            );
        } finally {
            setLoadingDelete(false); // Set the loading state to false
        }
    };

    return (
        <Container className="mt-5">
            {/* Page heading */}
            <h2 className="mt-5 text-h">Find and Delete a Product</h2>

            {/* Display error messages */}
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {/* Display success messages */}
            {success && <div style={{ color: 'green' }}>{success}</div>}

            {/* Form for finding a product */}
            <Form onSubmit={findProduct}>
                <Form.Group className="mb-3 form">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter product ID"
                        name="productId"
                        value={productId}
                        onChange={handleproductIdChange}
                        required
                        disabled={loadingFind || loadingDelete} // Disable input while loading
                    />
                </Form.Group>

                {/* Button to find a product */}
                <Button variant="primary" type="submit" disabled={loadingFind}>
                    {loadingFind ? (
                        <>
                            <Spinner animation="border" size="sm" className="me-2" />
                            Finding...
                        </>
                    ) : (
                        "Find Product"
                    )}
                </Button>
            </Form>

            {/* Display product details if a product is found */}
            {product && (
                <div className="mt-4">
                    <h4>Product Info</h4>
                    <p><strong>Title:</strong> {product.title}</p>
                    <p><strong>Description:</strong> {product.description}</p>
                    <p><strong>Category:</strong> {product.category}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Image:</strong> <img src={product.image} alt={product.title} width="100" /></p>

                    {/* Button to delete the product */}
                    <Button
                        variant="danger"
                        className="mt-3"
                        onClick={deleteProduct}
                        disabled={loadingDelete} // Disable button while loading
                    >
                        {loadingDelete ? (
                            <>
                                <Spinner animation="border" size="sm" className="me-2" />
                                Deleting...
                            </>
                        ) : (
                            "Delete Product"
                        )}
                    </Button>
                </div>
            )}
        </Container>
    );
};

// Export the DeleteProduct component as the default export
export default DeleteProduct;