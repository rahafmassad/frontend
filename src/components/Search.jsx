import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import search from '../assets/search.png';
import '../style/Search.css';

function Search() {
  return (
    <div className="search-bar-container">
      <InputGroup className="search-input">
        <InputGroup.Text className="search-icon-wrapper">
          <img src={search} alt="search icon" className="search-icon" />
        </InputGroup.Text>
        <Form.Control
          placeholder="Search"
          aria-label="Search"
          aria-describedby="inputGroup-sizing-default"
          className="search-form-control"
        />
      </InputGroup>
    </div>
  );
}

export default Search;
