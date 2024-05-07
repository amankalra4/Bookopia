import React from "react";
import { IBooksList } from "../../Pages/BookListing.tsx/interface";
import { Divider, List, ListItem, ListItemText } from "@mui/material";

const BooksOwned = ({ ownedBooks }: { ownedBooks: IBooksList[] }) => {
  return (
    <div className="tabContent">
      <div className="booksOwnedContainer">
        <h2>Books Owned</h2>
        <List>
          {ownedBooks.map((book) => (
            <React.Fragment key={book.id}>
              <ListItem>
                <ListItemText
                  primary={`Title: ${book.title}`}
                  secondary={`Author: ${book.author}`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </div>
    </div>
  );
};

export default BooksOwned;
