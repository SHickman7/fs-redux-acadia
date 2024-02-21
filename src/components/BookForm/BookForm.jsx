import axios from 'axios';
import { useState } from 'react';

function BookForm({ fetchBooks }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = event => {
    event.preventDefault();

    console.log(`Adding book`, { title, author });

    const clearInputs = () => {
      setTitle('');
      setAuthor('');
    }

    // TODO - axios request to server to add book

    axios({
      method: 'POST',
      url: '/api/books',
      data: { author: author, title: title }
    })
      .then(reponse => {
        // update our front end bookList state, to match reality
        // We could... add the new book to our reducer
        // That would like:
        // dispatch({ type: 'BOOKLIST_ADD', payload: {author: author, title: title} })
        // ^ We do NOT do it this way.
        // Because, trust me, keeping two things in sync is way way way harder than it sounds
        // It always seems like a good idea.

        // Instead, I'm going fetch the updated reality from our one source of truth
        // id: get it from the database (via the server)

        fetchBooks();
        
        // clear out input fields
        clearInputs();

      })
      .catch(error => {
        console.log(`Error adding new book: ${error}`);
        alert('Could not add a book at this time.  Try again later, or contact support');
      })
  };

  return (
    <section>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          required
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <input
          required
          placeholder="Author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <button type="submit">
          Add Book
        </button>
      </form>
    </section>
  );
}

export default BookForm;
