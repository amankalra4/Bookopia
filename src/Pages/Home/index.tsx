import Header from "../../ Components/Header";
import Footer from "../../ Components/Footer";
import HomeScreenImage from "../../assets/home-screen-image.jpg";
import "./styles.css";
import { whatWeDoContent } from "./constants";
import BookListing from "../BookListing.tsx";
import BookExchange from "../BookExchange";

function Home() {
  return (
    <div className="homeContainer">
      <Header />
      <main className="contentContainer">
        <section className="heroImageContainer">
          <img
            src={HomeScreenImage}
            alt="Bookopia Home Screen Reading Card"
            height={500}
            width={500}
          />
          <h1>Welcome to Bookopia: Your Ultimate Book Exchange Platform</h1>
        </section>
        <div className="whatWeDoCards">
          {whatWeDoContent.map((item) => (
            <div className="cardContainer" key={item.heading}>
              <h2>{item.heading}</h2>
              <span>{item.content}</span>
            </div>
          ))}
        </div>
        <BookListing onSelect={function (book: string): void {
          throw new Error("Function not implemented.");
        } } />
        <BookExchange />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
