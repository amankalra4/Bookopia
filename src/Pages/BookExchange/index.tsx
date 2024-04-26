// TwoParallelCards.tsx
import React, { useState } from 'react';
import BookListing from '../BookListing.tsx';

const GiveBooksCard: React.FC = () => {
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [condition, setCondition] = useState<'new' | 'barely used' | 'heavily used' | ''>('');
  const [useCredit, setUseCredit] = useState(false);

  const handleCancel = () => {
    setBookName('');
    setAuthorName('');
    setCondition('');
  };

  const handleSubmit = () => {
    // Assuming you have a function to navigate to the next page
    // For demonstration, let's just log the form data
    console.log('Book Name:', bookName);
    console.log('Author Name:', authorName);
    console.log('Condition:', condition);
    console.log('Use Credit:', useCredit);
    // Navigate to the next page (email page)
  };

  return (
    <div className="card" style={{ backgroundColor: '#87CEEB' }}>
      <h2>Give Books</h2>
      <div className="input-group">
        <label htmlFor="bookName">Book Name:</label>
        <input type="text" id="bookName" value={bookName} onChange={e => setBookName(e.target.value)} />
      </div>
      <div className="input-group">
        <label htmlFor="authorName">Author Name:</label>
        <input type="text" id="authorName" value={authorName} onChange={e => setAuthorName(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Book Condition:</label>
        <div className="radio-group">
          <input type="radio" id="new" name="condition" value="new" checked={condition === 'new'} onChange={() => setCondition('new')} />
          <label htmlFor="new">New</label>
          <input type="radio" id="barelyUsed" name="condition" value="barely used" checked={condition === 'barely used'} onChange={() => setCondition('barely used')} />
          <label htmlFor="barelyUsed">Barely Used</label>
          <input type="radio" id="heavilyUsed" name="condition" value="heavily used" checked={condition === 'heavily used'} onChange={() => setCondition('heavily used')} />
          <label htmlFor="heavilyUsed">Heavily Used</label>
        </div>
      </div>
      <div>
        <input type="checkbox" id="useCredit" checked={useCredit} onChange={() => setUseCredit(!useCredit)} />
        <label htmlFor="useCredit">Use my credit</label>
      </div>
      <div>
        <button onClick={handleCancel}>Cancel</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

const AddBookCard: React.FC = () => {
  const [showBookListing, setShowBookListing] = useState(false);
  const [selectedBook, setSelectedBook] = useState('');
  const [doItLater, setDoItLater] = useState(false);

  const handleAddBook = () => {
    setShowBookListing(true);
  };

  const handleBookSelection = (book: string) => {
    setSelectedBook(book);
    // Navigate to the next page (email page)
  };

  const handleDoItLater = () => {
    setDoItLater(!doItLater);
  };

  return (
    <div className="card" style={{ backgroundColor: '#87CEEB' }}>
      <h2>Add Book</h2>
      <button className="add-button" onClick={handleAddBook}>+</button>
      <div>
        <input type="checkbox" id="doItLater" checked={doItLater} onChange={handleDoItLater} />
        <label htmlFor="doItLater">Do it later</label>
      </div>
      {showBookListing && <BookListing onSelect={handleBookSelection} />}
      {selectedBook && <p>Selected Book: {selectedBook}</p>}
    </div>
  );
}

const BookExchange: React.FC = () => {
  return (
    <div className="">
      <GiveBooksCard />
      <AddBookCard />
    </div>
  );
}

export default BookExchange;
