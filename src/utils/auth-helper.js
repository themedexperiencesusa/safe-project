/**
 * Ensures the user is authenticated with Google and returns a client.
 * If not authenticated, it triggers the OAuth flow.
 * @param {function} log - A logging function.
 * @returns {Promise<object>} A promise that resolves with the authenticated Google OAuth2 client.
 */
async function getAuthenticatedClient(log) {
  log('Checking authentication status...');
  const isAuthenticated = await window.electronAPI.getAuthStatus();

  if (!isAuthenticated) {
    log('User not authenticated. Initiating Google OAuth flow...');
    try {
      await window.electronAPI.startOAuth();
      log('Authentication successful!');
    } catch (error) {
      log(`Authentication failed: ${error.message}`);
      throw new Error('Authentication failed. Please try again.');
    }
  } else {
    log('User already authenticated.');
  }

  // In the renderer process, we don't directly get the oAuth2Client object.
  // Instead, the main process (electron.js) will pass the authenticated client
  // to the agents when `run-agents` is called.
  // This function primarily ensures the authentication flow is completed.
  return {}; // Return a dummy object as the actual client is managed in the main process.
}

module.exports = {
  getAuthenticatedClient,
};
