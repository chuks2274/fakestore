// Import the React library to use JSX and create components
import React from 'react';

// Define a functional component named Footer
const Footer = () => {
  // Get the current year dynamically using JavaScript's Date object
  const currentYear = new Date().getFullYear(); // Get the current year

  // Return the JSX markup for rendering the footer
  return (
    // Use the <footer> semantic HTML5 tag for the website footer
    // Apply Bootstrap utility classes:
    // - bg-light: light grey background
    // - text-dark: dark text color for contrast
    // - text-center: center-align text
    // - py-3: vertical padding (top and bottom)
    // - mt-auto: pushes footer to the bottom in flex layouts
    // Also include ARIA attributes for accessibility
    <footer className="bg-light text-dark text-center py-3 mt-auto" role="contentinfo" aria-label="Footer">
      
      {/* Container class centers and constrains the content horizontally */}
      <div className="container">
        
        {/* Display the copyright symbol and dynamic year */}
        {/* mb-0 removes bottom margin; text-footer is likely a custom class for styling */}
        <p className="mb-0 text-footer">&copy; {currentYear} HumbleStore. All rights reserved.</p>
      
      </div>
    </footer>
  );
};

// Makes the Footer component available for use in other parts of the application 
export default Footer;