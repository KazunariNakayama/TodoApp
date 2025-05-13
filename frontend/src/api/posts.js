const API_URL = process.env.REACT_APP_API_URL;

export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/api/tasks`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

    