// Import necessary libraries and components
import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import { Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap"; // Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Link component for navigation between routes

// Define the CartPage component
const CartPage = () => {
  // State variables for managing the cart and checkout process
  const [cart, setCart] = useState([]); // Stores the cart items
  const [showCheckout, setShowCheckout] = useState(false); // Controls the visibility of the checkout section
  const [paymentMessage, setPaymentMessage] = useState(""); // Stores the payment confirmation message
  const [showConfirmButton, setShowConfirmButton] = useState(false); // Controls the visibility of the "Yes, Proceed" button

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve the cart from localStorage
    setCart(storedCart); // Update the cart state
  }, []);

  // Handle removing an item from the cart
  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id); // Remove the item with the matching ID
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
  };

  // Handle clearing the entire cart
  const handleClearCart = () => {
    setCart([]); // Clear the cart state
    localStorage.removeItem("cart"); // Remove the cart from localStorage
  };

  // Calculate the total amount in the cart
  const totalAmount = cart.reduce(
    (acc, product) => acc + product.price * product.quantity, // Multiply price by quantity for each product
    0
  );

  // Handle proceeding to the checkout section
  const handleProceedToCheckout = () => {
    setShowCheckout(true); // Show the checkout section
  };

  // Handle confirming the payment
  const handleConfirmPayment = () => {
    setPaymentMessage("Proceeding to payment..."); // Display the payment confirmation message
    setShowConfirmButton(false); // Hide the "Yes, Proceed" button after confirmation
  };

  // Handle showing the confirmation button
  const handleShowConfirmButton = () => {
    setShowConfirmButton(true); // Show the "Yes, Proceed" button
  };

  return (
    <Container>
      {/* Page heading */}
      <h2>Your Cart</h2>

      {/* Show a message if the cart is empty */}
      {cart.length === 0 ? (
        <p>Your cart is empty. Start shopping!</p>
      ) : (
        <div>
          {/* Display the cart items */}
          <Row>
            {cart.map((product) => (
              <Col key={product.id} sm={12} md={6} lg={4}>
                <Card>
                  {/* Product image */}
                  <Card.Img variant="top" src={product.image} alt={product.title} />
                  <Card.Body>
                    {/* Product title */}
                    <Card.Title>{product.title}</Card.Title>
                    {/* Product price */}
                    <Card.Text>Price: ${product.price}</Card.Text>
                    {/* Product quantity */}
                    <Card.Text>Quantity: {product.quantity}</Card.Text>
                    {/* Remove from cart button */}
                    <Button variant="danger" onClick={() => handleRemoveFromCart(product.id)}>
                      Remove from Cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Display the total amount and clear cart button */}
          <div className="mt-4">
            <h4>Total: ${totalAmount.toFixed(2)}</h4> {/* Display the total amount */}
            <Button variant="warning" onClick={handleClearCart}>
              Clear Cart
            </Button>
          </div>

          {/* Proceed to checkout button */}
          {!showCheckout && (
            <div className="mt-4">
              <Button variant="success" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </Button>
            </div>
          )}

          {/* Checkout section */}
          {showCheckout && (
            <div className="mt-4">
              <h3>Checkout</h3>
              <Row>
                <Col md={8}>
                  {/* List of products in the checkout */}
                  <ListGroup>
                    {cart.map((product) => (
                      <ListGroup.Item key={product.id}>
                        <Row>
                          <Col xs={8}>
                            <strong>{product.title}</strong> x {product.quantity}
                          </Col>
                          <Col xs={4}>
                            <strong>${(product.price * product.quantity).toFixed(2)}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
                <Col md={4}>
                  {/* Total amount and payment button */}
                  <Card>
                    <Card.Body>
                      <Card.Title>Total Amount</Card.Title>
                      <Card.Text>${totalAmount.toFixed(2)}</Card.Text>

                      {/* Proceed to Payment button */}
                      {!showConfirmButton ? (
                        <Button variant="success" onClick={handleShowConfirmButton}>
                          Proceed to Payment
                        </Button>
                      ) : (
                        <div>
                          {/* Confirm payment button */}
                          <Button variant="success" onClick={handleConfirmPayment}>
                            Yes, Proceed
                          </Button>
                        </div>
                      )}

                      {/* Display the payment confirmation message */}
                      {paymentMessage && <p>{paymentMessage}</p>}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* Back to cart button */}
              <div className="mt-4">
                <Button variant="secondary" onClick={() => setShowCheckout(false)}>
                  Back to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Back to shop button */}
      <div className="mt-4">
        <Link to="/products">
          <Button variant="secondary">Back to Shop</Button>
        </Link>
      </div>
    </Container>
  );
};

// Export the CartPage component as the default export
export default CartPage;