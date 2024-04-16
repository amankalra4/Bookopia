import "./styles.css";

type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  condition: string;
  availability: string;
  image: string;
};

const BookCard = ({
  title,
  author,
  genre,
  condition,
  availability,
  image,
}: BookCardProps) => {
  return (
    <div className="bookCardContainer">
      <img src={image} alt={title} className="bookImage" />
      <div className="bookDetails">
        <h2>{title}</h2>
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p>
          <strong>Genre:</strong> {genre}
        </p>
        <p>
          <strong>Condition:</strong> {condition}
        </p>
        <p>
          <strong>Availability:</strong> {availability}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
