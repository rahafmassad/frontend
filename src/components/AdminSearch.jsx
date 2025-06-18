import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import '../style/Search.css';

function AdminSearch({ onResults }) {

  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
          .then(res => res.json())
          .then(data => {
            if (onResults) onResults(data);
          })
          .catch(err => console.error("Search error:", err));
      } 
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="search-bar-container">
      <InputGroup className="search-input">
        <Form.Control
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search"
          aria-describedby="inputGroup-sizing-default"
          className="search-form-control"
        />
      </InputGroup>
    </div>
  );
}

export default AdminSearch;