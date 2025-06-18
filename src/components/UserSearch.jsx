import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function UserSearch({ onResults }) {
  const [query, setQuery] = useState("");
  const [Searched, setSearched] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const trimmed = query.trim();

      if (!trimmed) {
        if (Searched && onResults) {
          onResults({ content: [], users: [], query: "" });
        }
        return;
      }

      fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (onResults) {
            onResults({ ...data, query });
            setSearched(true);
          }
        })
        .catch(err => console.error("Search error:", err));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, onResults, Searched]);

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

export default UserSearch;
