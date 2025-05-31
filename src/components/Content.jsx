import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../style/Content.css';

function Content() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios(`http://makeup-api.herokuapp.com/api/v1/products.json`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="content-container">
      {products.slice(0, 10).map((item) => (
        <Link to={`/product/${item.id}`} key={item.id} className="product-link">
          <div className="product-card">
            <img src={item.image_link} alt={item.name} className="product-img" />
            <strong className="product-name">{item.name}</strong>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Content;
