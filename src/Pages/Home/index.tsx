import HomeScreenImage from "../../assets/home-screen-image.png";
import { whatWeDoContent } from "./constants";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import "./styles.css";
import { getLocalStorageItem } from "../../utils";

function Home() {
  const token = getLocalStorageItem("token");
  return (
    <div className="homeContainer">
      <section className="heroImageContainer">
        <img
          src={HomeScreenImage}
          alt="Bookopia Home Screen Reading Card"
          height={500}
          width={500}
          style={{ borderRadius: "16px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Welcome to Bookopia: Your Ultimate Book Exchange Platform</h1>
          {token && token?.length > 0 ? null : (
            <Link
              to={ROUTES.REGISTER}
              style={{
                backgroundColor: "green",
              }}
              className="homePageButtons"
            >
              <span>Join Us</span>
            </Link>
          )}
          <Link
            to={ROUTES.BOOKS_LISTING}
            style={{
              backgroundColor: "#3d5150",
            }}
            className="homePageButtons"
          >
            <span>Find Books</span>
          </Link>
        </div>
      </section>
      <div className="whatWeDoCards">
        {whatWeDoContent.map((item) => (
          <div className="cardContainer" key={item.heading}>
            <h2>{item.heading}</h2>
            <span>{item.content}</span>
          </div>
        ))}
      </div>
      <div className="homePageContent">
        <p>
          {`Join Bookopia Today and Start Sharing the Magic of Reading! Join our
    active book club by creating an account right now.`}
        </p>
        <p>
          {`Savor the excitement of learning about new stories, making connections with
    other readers, and encouraging a culture of sharing in our
    community.`}
        </p>
        <p>{`Here at Bookopia, each book has a tale to tell. Welcome.`}</p>
      </div>
    </div>
  );
}

export default Home;
