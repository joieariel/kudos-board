import { useState, useEffect } from "react";
import { giphyApi } from "./services/giphyApi";
import "./GifPicker.css";

const GifPicker = ({ onGifSelect, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // load trending GIFs on component mount
  useEffect(() => {
    loadTrendingGifs();
  }, []);

  // search GIFs when search term changes (with debounce)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchGifs();
      } else {
        loadTrendingGifs();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const loadTrendingGifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const trendingGifs = await giphyApi.getTrendingGifs(20);
      setGifs(trendingGifs);
    } catch (err) {
      setError("Failed to load trending GIFs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchGifs = async () => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await giphyApi.searchGifs(searchTerm, 20);
      setGifs(searchResults);
    } catch (err) {
      setError("Failed to search GIFs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGifClick = (gif) => {
    // pass the GIF data to parent component
    onGifSelect({
      id: gif.id,
      url: gif.images.fixed_width.url,
      title: gif.title,
      width: gif.images.fixed_width.width,
      height: gif.images.fixed_width.height,
    });
  };

  return (
    <div className="gif-picker-overlay">
      <div className="gif-picker-modal">
        <div className="gif-picker-header">
          <h3>Choose a GIF</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="gif-search">
          <input
            type="text"
            placeholder="Search for GIFs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="gif-search-input"
          />
        </div>

        <div className="gif-results">
          {loading && <div className="loading">Loading GIFs...</div>}

          {error && <div className="error">{error}</div>}

          {!loading && !error && gifs.length === 0 && (
            <div className="no-results">No GIFs found</div>
          )}

          <div className="gif-grid">
            {gifs.map((gif) => (
              <div
                key={gif.id}
                className="gif-item"
                onClick={() => handleGifClick(gif)}
              >
                <img
                  src={gif.images.fixed_height_small.url}
                  alt={gif.title}
                  className="gif-thumbnail"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPicker;
