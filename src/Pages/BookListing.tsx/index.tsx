// BookListing.tsx
import React, { ReactNode, useEffect, useState } from 'react';
import {booksData} from './constants'; // Sample data for books
import BookCard from './BookCard';
import './style.css'; // Import CSS file for styling

// Function to check if the user is logged in (You need to replace this with your actual authentication logic)
const isLoggedIn = () => {
    // Implement your authentication logic here
    // For example, you might use localStorage, cookies, or context API to manage authentication state
    // Return true if the user is logged in, false otherwise
    return localStorage.getItem('isLoggedIn') === 'true'; // Assuming you are storing login state in localStorage
  }

  
  interface BookListingProps {
    onSelect: (book: string) => void;
  }
  
  


interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  // Add more fields as needed
}


const genres = ['Fantasy', 'Science Fiction', 'Mystery', 'Thriller', 'Romance']; // Sample genres

const BookListing: React.FC <BookListingProps> =  ({ onSelect }) => {
//     const [loggedIn, setLoggedIn] = useState<boolean>(false);

//   useEffect(() => {
//     // Check if the user is logged in when the component mounts
//     setLoggedIn(isLoggedIn());
//   }, []);
  const [filter, setFilter] = useState<string | null>(null); // State for genre filter
  const [searchTerm, setSearchTerm] = useState<string>(''); // State for search term

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBooks = booksData.filter(book => {
    // Filter by genre
    if (filter && book.genre !== filter) return false;

    // Filter by search term
    if (searchTerm && !book.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;

    return true;
  });

    function book(value: { id: number; title: string; author: string; genre: string; }, index: number, array: { id: number; title: string; author: string; genre: string; }[]): ReactNode {
        throw new Error('Function not implemented.');
    }
    // if (!loggedIn) {
    //     return <p>Please log in to view this page.</p>;
    //   }

    
  return (
    <div className="book-listing-container">
      {/* Genre filter */}
      <select value={filter || ''} onChange={handleFilterChange}>
        <option value="">All Genres</option>
        {genres.map(genre => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Search input */}
      <input type="text" placeholder="Search by title..." value={searchTerm} onChange={handleSearchChange} />

      {/* Book list */}
      <div className="book-list">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListing;

// Ensure to add an empty export statement to make it a module
export {};