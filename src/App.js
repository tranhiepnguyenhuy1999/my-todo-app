import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './component/TodoList';
import {Container, Row} from 'react-bootstrap'

function App() {
  return (
    <Container className='mt-5'>
      <h1>This is the to do app</h1>
      <Row className='justify-content-center'>
        <TodoList ></TodoList>
      </Row>  
    </Container>  
  );
}

export default App;
