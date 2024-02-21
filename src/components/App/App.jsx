import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import BookForm from '../BookForm/BookForm';
import BookList from '../BookList/BookList';

import './App.css';

function App() {

  // TODO - GET Book List from server

  const dispatch = useDispatch();

  // Go get the books from the server
  // and update the reducer with the results.
  const fetchBooks = () => {
    axios.get('/api/books')
      .then(response => {
        console.log('all the books?', response.data);
        // send the results to the reducer
        dispatch({ type: 'BOOKLIST_REFRESH', payload: response.data })
      })
      .catch(error => {
        console.log(`Error fetching books: ${error}`);
        alert('Could not get books at this time.  Try again later, or contact support');
      })
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  return (
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm fetchBooks={fetchBooks} />
        <BookList />
      </main>
    </div>
  );
}

export default App;
