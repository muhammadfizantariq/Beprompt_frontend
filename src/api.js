// API Configuration - Point to Node backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Quick Scan (synchronous) - Node backend
export const runQuickScan = async (websiteUrl, email) => {
  return apiCall('/quick-scan', {
    method: 'POST',
    body: JSON.stringify({
      url: websiteUrl,
      email: email,
    }),
  });
};

// Full Analysis (queued, long-running) - Node backend
export const runFullAnalysis = async (websiteUrl, email) => {
  return apiCall('/analyze', {
    method: 'POST',
    body: JSON.stringify({
      url: websiteUrl,
      email: email,
    }),
  });
};

// Error handling utility
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: 500,
    };
  }
};

export default {
  // Node backend endpoints
  runQuickScan,
  runFullAnalysis,
  
  // Error handling
  handleApiError,
}; 