// giphy API service
const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
const BASE_URL = "https://api.giphy.com/v1/gifs";

export const giphyApi = {
  // search for GIFs
  searchGifs: async (query, limit = 25) => {
    try {
      const response = await fetch(
        `${BASE_URL}/search?api_key=${GIPHY_API_KEY}&q=${query}&limit=${limit}&rating=g`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data; // returns array of GIF objects
    } catch (error) {
      console.error("Error searching GIFs:", error);
      throw error;
    }
  },

  // get trending GIFs
  getTrendingGifs: async (limit = 25) => {
    try {
      const response = await fetch(
        `${BASE_URL}/trending?api_key=${GIPHY_API_KEY}&limit=${limit}&rating=g`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching trending GIFs:", error);
      throw error;
    }
  },
};
