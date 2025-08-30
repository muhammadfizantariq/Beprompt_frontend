// API Configuration - Point to Node backend
const API_BASE_URL = 'https://backend-beprompted.onrender.com/';

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

// Check backend connection status
export const checkBackendConnection = async () => {
  // Try multiple endpoints to test connection
  const endpoints = ['/health', '/ping', '/', '/api/health'];
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout to prevent hanging
        signal: AbortSignal.timeout(5000), // 5 second timeout
      });
      
      if (response.ok) {
        return {
          status: 'connected',
          message: `Backend is reachable via ${endpoint}`,
          statusCode: response.status,
          endpoint: endpoint,
          timestamp: new Date().toISOString(),
        };
      } else {
        // If endpoint exists but returns error, backend is reachable
        return {
          status: 'connected',
          message: `Backend responded via ${endpoint} (status: ${response.status})`,
          statusCode: response.status,
          endpoint: endpoint,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      // Continue to next endpoint if this one fails
      continue;
    }
  }
  
  // If all endpoints failed, try a basic connection test
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000),
    });
    
    return {
      status: 'connected',
      message: 'Backend is reachable (root endpoint)',
      statusCode: response.status,
      endpoint: '/',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        status: 'timeout',
        message: 'Backend connection timed out after 5 seconds',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        status: 'network_error',
        message: 'Network error - unable to reach backend',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: 'unknown_error',
        message: `Connection error: ${error.message}`,
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }
};

// Ping backend with simple request
export const pingBackend = async () => {
  // Try multiple endpoints for ping
  const endpoints = ['/ping', '/health', '/', '/api/ping'];
  
  for (const endpoint of endpoints) {
    try {
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });
      const endTime = Date.now();
      const latency = endTime - startTime;
      
      if (response.ok) {
        return {
          status: 'success',
          message: `Backend responding via ${endpoint}`,
          latency: `${latency}ms`,
          statusCode: response.status,
          endpoint: endpoint,
          timestamp: new Date().toISOString(),
        };
      } else {
        // If endpoint exists but returns error, still measure latency
        return {
          status: 'success',
          message: `Backend responding via ${endpoint} (status: ${response.status})`,
          latency: `${latency}ms`,
          statusCode: response.status,
          endpoint: endpoint,
          timestamp: new Date().toISOString(),
        };
      }
    } catch (error) {
      // Continue to next endpoint if this one fails
      continue;
    }
  }
  
  // If all endpoints failed, try basic connection
  try {
    const startTime = Date.now();
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      signal: AbortSignal.timeout(10000),
    });
    const endTime = Date.now();
    const latency = endTime - startTime;
    
    return {
      status: 'success',
      message: 'Backend responding (root endpoint)',
      latency: `${latency}ms`,
      statusCode: response.status,
      endpoint: '/',
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        status: 'timeout',
        message: 'Backend ping timed out after 10 seconds',
        latency: 'N/A',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        status: 'error',
        message: `Ping failed: ${error.message}`,
        latency: 'N/A',
        statusCode: 0,
        timestamp: new Date().toISOString(),
      };
    }
  }
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

const api = {
  // Node backend endpoints
  runQuickScan,
  runFullAnalysis,
  
  // Connection checking
  checkBackendConnection,
  pingBackend,
  
  // Error handling
  handleApiError,
};

export default api; 