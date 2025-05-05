import { useState, useEffect } from "react"; // React hooks for managing state and side effects
import { Button, Card, Container, Row, Col, ListGroup } from "react-bootstrap"; // Bootstrap components for layout and styling
import { Link } from "react-router-dom"; // Link component for navigation between routes

// Define the CartPage component
const CartPage = () => {
  // Declare state variables
  const [cart, setCart] = useState([]); // State to store the cart items (initially empty)
  const [showCheckout, setShowCheckout] = useState(false); // State to control whether checkout section is visible
  const [paymentMessage, setPaymentMessage] = useState(""); // State to store payment confirmation message
  const [showConfirmButton, setShowConfirmButton] = useState(false); // State to control visibility of "Yes, Proceed" button

  // Load cart from localStorage when component mounts
  useEffect(() => { // useEffect to run side effects in functional components
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Get cart from localStorage (or default to an empty array)
    setCart(storedCart); // Set the cart state with the loaded data
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Handle item removal from the cart
  const handleRemoveFromCart = (id) => { // Function to remove an item from the cart by its ID
    const updatedCart = cart.filter((item) => item.id !== id); // Filter out the item with the given ID
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
  };

  // Handle clearing the entire cart
  const handleClearCart = () => { // Function to clear the entire cart
    setCart([]); // Clear the cart state
    localStorage.removeItem("cart"); // Remove the cart from localStorage
  };

  // Handle increasing the quantity of an item
  const handleIncrease = (id) => { // Function to increase the quantity of an item in the cart
    const updatedCart = cart.map(item =>  // Map through the cart items
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item // Increase the quantity of the matching item
    );
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
  };

  // Handle decreasing the quantity of an item
  const handleDecrease = (id) => { // Function to decrease the quantity of an item in the cart
    const updatedCart = cart // Map through the cart items
      .map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item) // Map through the cart items and decrease the quantity of the matching item
      .filter(item => item.quantity > 0); // Remove the item if its quantity is 0
    setCart(updatedCart); // Update the cart state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save the updated cart to localStorage
  };

  // Calculate the total amount of all items in the cart
  const totalAmount = cart.reduce( // Use reduce to calculate the total amount
    (acc, product) => acc + product.price * product.quantity, // Sum up the price times quantity for each product
    0 // Initial value of the accumulator is 0
  );

  // Show checkout section when the "Proceed to Checkout" button is clicked
  const handleProceedToCheckout = () => { // Function to handle checkout button click
    setShowCheckout(true); // Show the checkout section
  };

  // Confirm payment and show a message
  const handleConfirmPayment = () => { // Function to handle payment confirmation
    setPaymentMessage("Proceeding to payment..."); // Set the payment message
    setShowConfirmButton(false); // Hide the "Yes, Proceed" button
  };

  // Show the "Yes, Proceed" button for payment confirmation
  const handleShowConfirmButton = () => { // Function to show the "Yes, Proceed" button
    setShowConfirmButton(true); // Show the confirmation button
  };

  return (
    <div className="bg-info min-vh-100 py-4"> {/* Background color and padding for the entire page */}
      <Container className="mt-4 bg-info"> {/* Container for the cart content */}
        <h2>Your Cart</h2> {/* Heading for the cart section */}

        {cart.length === 0 ? ( // If the cart is empty, show this message
          <p>Your cart is empty. Start shopping!</p> // Message to inform the user that the cart is empty
        ) : ( // Otherwise, display the cart items
          <div>
            <Row> {/* Start a row to display the cart items */}
              {cart.map((product) => ( // Map through the cart items and display each product
                <Col key={product.id} sm={12} md={6} lg={4}> {/* Define column width for responsive layout */}
                  <Card> {/* Card to display product details */}
                    <Card.Img variant="top" src={product.image} alt={product.title} /> {/* Product image */}
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title> {/* Product title */}
                      <Card.Text>Price: ${product.price}</Card.Text> {/* Product price */}
                      <Card.Text>Quantity: {product.quantity}</Card.Text> {/* Product quantity */}

                      <div className="d-flex align-items-center mb-2"> {/* Buttons to increase or decrease quantity */}
                        <Button variant="secondary" size="sm" onClick={() => handleDecrease(product.id)}>-</Button> {/* Decrease quantity */}
                        <span className="mx-2">{product.quantity}</span> {/* Display current quantity */}
                        <Button variant="secondary" size="sm" onClick={() => handleIncrease(product.id)}>+</Button> {/* Increase quantity */}
                      </div>

                      <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(product.id)}> {/* Remove button */}
                        Remove from Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            <div className="mt-4"> {/* Section to display total amount and clear cart button */}
              <h4>Total: ${totalAmount.toFixed(2)}</h4> {/* Display the total amount of the cart */}
              <Button variant="warning" onClick={handleClearCart}> {/* Button to clear the cart */}
                Clear Cart
              </Button>
            </div>

            {/* Proceed to checkout section */}
            {!showCheckout && ( // If the checkout section is not visible
              <div className="mt-4"> {/* Section to proceed to checkout */}
                <Button variant="success" onClick={handleProceedToCheckout}> {/* Proceed to checkout button */}
                  Proceed to Checkout
                </Button>
              </div>
            )}

            {showCheckout && ( // If the checkout section is visible
              <div className="mt-4"> {/* Checkout section */}
                <h3>Checkout</h3> {/* Heading for checkout section */}
                <Row> {/* Start a row for the checkout layout */}
                  <Col md={8}> {/* Column for the cart item list */}
                    <ListGroup>
                      {cart.map((product) => ( // Map through cart items and display each product in the checkout
                        <ListGroup.Item key={product.id}> {/* List item for each product */}
                          <Row>
                            <Col xs={8}> {/* Product name and quantity */}
                              <strong>{product.title}</strong> x {product.quantity} {/* Display product title and quantity */}
                            </Col>
                            <Col xs={4}> {/* Product total price */}
                              <strong>${(product.price * product.quantity).toFixed(2)}</strong> {/* Display total price for this product */}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                  <Col md={4}> {/* Column for total amount and payment button */}
                    <Card>
                      <Card.Body>
                        <Card.Title>Total Amount</Card.Title> {/* Title for total amount */}
                        <Card.Text>${totalAmount.toFixed(2)}</Card.Text> {/* Display total amount */}

                        {!showConfirmButton ? ( // If the "Yes, Proceed" button is not shown yet
                          <Button variant="success" onClick={handleShowConfirmButton}> {/* Show "Proceed to Payment" button */}
                            Proceed to Payment
                          </Button>
                        ) : ( // Otherwise, show the "Yes, Proceed" button
                          <Button variant="success" onClick={handleConfirmPayment}> {/* Show "Yes, Proceed" button */}
                            Yes, Proceed
                          </Button>
                        )}

                        {paymentMessage && <p>{paymentMessage}</p>} {/* Display payment message if it exists */}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <div className="mt-4">
                  <Button variant="secondary" onClick={() => setShowCheckout(false)}> {/* Button to go back to cart */}
                    Back to Cart
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-4"> {/* Section to navigate back to the shop page */}
          <Link to="/products"> {/* Link to navigate back to the shop page */}
            <Button variant="secondary">Back to Shop</Button> {/* Button to navigate to shop */}
          </Link>
        </div>
      </Container>
    </div>
  );
};

// Makes the CartPage component available for use in other parts of the application
export default CartPage;