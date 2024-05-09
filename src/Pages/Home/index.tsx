import HomeScreenImage from "../../assets/home-screen-image.png";
import { homePageContent, whatWeDoContent } from "./constants";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import "./styles.css";
import { getLocalStorageItem } from "../../utils";
import { Button } from "@mui/material";

const Home = () => {
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
          <Link to={ROUTES.BOOKS_LISTING} className="homePageButtons">
            <Button variant="contained">Find Books</Button>
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
        {homePageContent.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
