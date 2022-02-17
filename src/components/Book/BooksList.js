import React from 'react';

const BooksList = ({
                     isLoading,
                     books,
                     isLoggedIn,
                     deleteBook,
                     dispatch,
                     getBookById
                   }) => {

  const bookList = books.length > 0 ? books.map((item) => (
    <li className='list-group-item d-flex  justify-content-between align-items-center' key={item.id}>
      <div>{item.title}</div>
      <div className='btn-group' role='group'>
        <button
          type='button'
          className='btn btn-primary'
          disabled={!isLoggedIn}
          onClick={() => getBookById(item.id)}
        >
          Read
        </button>
        <button
          type='button'
          className='btn btn-danger'
          disabled={!isLoggedIn}
          onClick={() => dispatch(deleteBook(item))
            .unwrap()
            .then((originalPromiseResult) => {
              // handle result here
              // console.log(originalPromiseResult)
              alert(`${originalPromiseResult.title} Was Deleted`)
            })
            .catch((rejectedValueOrSerializedError) => {
              // handle error here
              console.log(rejectedValueOrSerializedError.message)
            })
          }
        >
          Delete
        </button>
      </div>
    </li>
  )) : 'There is no Books available';

  return (
    <div>
      <h2>Books List</h2>
      {
        isLoading ? (
          'loading...'
        ) : (
          <ul className='list-group'>
            {bookList}
          </ul>
        )
      }
    </div>
  );
};

export default BooksList;
