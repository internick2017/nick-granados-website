/**
 * Gumroad API Configuration Example
 * 
 * Copy this file to your environment variables or create a .env.local file
 * with the following variables:
 */

module.exports = {
  // Your Gumroad Application ID (Client ID)
  GUMROAD_CLIENT_ID: 'your_gumroad_client_id_here',
  
  // Your Gumroad Application Secret (Client Secret)
  GUMROAD_CLIENT_SECRET: 'your_gumroad_client_secret_here',
  
  // Redirect URI for OAuth callback
  GUMROAD_REDIRECT_URI: 'http://localhost:3000/api/auth/gumroad/callback',
  
  // For production deployment, update to your actual domain:
  // GUMROAD_REDIRECT_URI: 'https://nickgranados.com/api/auth/gumroad/callback',
};

/**
 * Environment Variables Setup:
 * 
 * Create a .env.local file in your project root with:
 * 
 * GUMROAD_CLIENT_ID=your_actual_client_id
 * GUMROAD_CLIENT_SECRET=your_actual_client_secret
 * GUMROAD_REDIRECT_URI=http://localhost:3000/api/auth/gumroad/callback
 * 
 * Never commit your actual credentials to version control!
 */ 