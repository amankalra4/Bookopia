// BookCard.tsx
import React from 'react';
import { Book } from './types'; // Assuming you have defined the Book type in a separate file

interface Props {
  book: Book;
}

const BookCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      {/* Add more details here */}
    </div>
  );
};

export default BookCard;
