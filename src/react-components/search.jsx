import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Form, Button } from 'react-bootstrap';

function Search(props) {
  function handleSubmit(e) {
    window.alert("handleSubmit in react " + e.target.elements.searchInput.value)
    // ipc to send message to the main app
    window.api.send("toMain:search", e.target.elements.searchInput.value)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formSearch">
        <Form.Label>Search</Form.Label>
        <Form.Control type="search" placeholder="Search" name="searchInput"/>
      </Form.Group>
    </Form>
  )
}

export default Search
