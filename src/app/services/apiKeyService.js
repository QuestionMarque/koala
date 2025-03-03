// API Key Service for handling all API key related operations

export const apiKeyService = {
  // Fetch all API keys
  async fetchApiKeys() {
    try {
      const response = await fetch('/api/keys');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching API keys:', error);
      throw error;
    }
  },

  // Create a new API key
  async createApiKey({ name, type, monthlyLimit, piiEnabled = false }) {
    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          type,
          monthlyLimit: monthlyLimit ? parseInt(monthlyLimit) : null,
          piiEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating API key:', error);
      throw error;
    }
  },

  // Update an existing API key
  async updateApiKey(keyId, { name, type, monthlyLimit, piiEnabled }) {
    try {
      const response = await fetch(`/api/keys/${keyId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          type,
          monthlyLimit: monthlyLimit ? parseInt(monthlyLimit) : null,
          piiEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update API key');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating API key:', error);
      throw error;
    }
  },

  // Delete an API key
  async deleteApiKey(keyId) {
    try {
      const response = await fetch(`/api/keys/${encodeURIComponent(keyId)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete API key');
      }

      return true;
    } catch (error) {
      console.error('Error deleting API key:', error);
      throw error;
    }
  }
}; 