import { useSelector } from 'react-redux';

function BookList() {
  const bookList = useSelector(store => store.bookList);

  return (
    <section>
      <h2>All Books</h2>
      <ul>
        {bookList.map((book) => 
          <li key={book.id}>{book.title} by {book.author}</li>  
        )}
      </ul>
    </section>
  );
}

export default BookList;
