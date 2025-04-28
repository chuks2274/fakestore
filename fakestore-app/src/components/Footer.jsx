// Import React library
import React from 'react';

// Define the Footer component
const Footer = () => {
  // Get the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    // Footer container for styling and layout
    <div className="footer-container">
      <footer className="footer">
        {/* Display the copyright text with the current year */}
        <p className="text-footer">&copy; {currentYear} HumbleStore. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Export the Footer component as the default export
export default Footer;