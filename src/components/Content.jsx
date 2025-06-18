import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import '../style/Content.css';

function Content({ overrideContent, user }) {
  const [products, setProducts] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  const contentToRender = overrideContent ?? contentList;

  useEffect(() => {
    axios("http://makeup-api.herokuapp.com/api/v1/products.json")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/content/all_content");
        const data = await res.json();
        setContentList(data || []);
      } catch (err) {
        console.error("Failed to fetch content:", err);
        setContentList([]);
      }
    };

    fetchContent();
  }, []);

  useEffect(() => {
  const userId = user?.user_id || user?.id;
  if (!userId) return;

  const fetchSaved = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/content/saved/${userId}`);
      const data = await res.json();
      const ids = data.map(item => item.content_id);
      setSavedIds(ids);
    } catch (err) {
      console.error("Failed to fetch saved content:", err);
    }
  };

  fetchSaved();
}, [user]);

const handleSaveContent = async (contentId) => {
  const userId = user?.user_id || user?.id;
  if (!userId) return;

  try {
    const res = await fetch(`http://localhost:5000/api/content/save/${contentId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId }),
    });

    const result = await res.json();

    setSavedIds(prev => [...new Set([...prev, contentId])]);
  } catch (err) {
    console.error("Save content failed:", err);
  }
};


  return (
    <div className="content-container">

      {products.slice(0, 5).map((item) => (
        <Link to={`/content/${item.id}`} key={item.id} className="product-link">
          <div className="product-card">
            <img src={item.image_link} alt={item.name} className="product-img" />
            <strong className="product-name">{item.name}</strong>
          </div>
        </Link>
      ))}

      {Array.isArray(contentToRender) && contentToRender.length > 0 ? (
        contentToRender.map(item => (
          <div key={item.content_id} className="content-card" style={{ position: "relative" }}>
            {item.image && (
              <img src={item.image} alt={item.title || 'image'} className="content-image" />
            )}
            <button
              className="heart-button"
              onClick={() => handleSaveContent(item.content_id)}
              title={savedIds.includes(item.content_id) ? "Saved" : "Save to profile"}
            >
              ♥
            </button>
          <div className="content-footer">
            <span className="content-name">{item.title}</span>
          </div>
        </div>

                ))
      ) : (
        <p className="no-results-message">No content found.</p>
      )}
    </div>
  );
}

export default Content;
