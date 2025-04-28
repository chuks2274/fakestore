import { StrictMode } from 'react' // Import React's StrictMode for highlighting potential problems in an application
import { createRoot } from 'react-dom/client' // Import ReactDOM's createRoot for rendering the React application
import './index.css' // Import the global CSS file for styling
import App from './App.jsx' // Import the main App component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS for styling
import { BrowserRouter} from 'react-router-dom'; // Import BrowserRouter for enabling routing in the application

// Render the React application into the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the application in BrowserRouter to enable routing */}
    <BrowserRouter> 
    <App />
    </BrowserRouter>
  </StrictMode>,
)
