import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ROUTES } from "./utils/constants";
import Home from "./Pages/Home";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import BookListing from "./Pages/BookListing.tsx";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Profile from "./Pages/Profile";
import BookDetails from "./Pages/BookDetails";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="appWrapper">
        <Header />
        <div className="contentWrapper">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Home />} />
              <Route path={ROUTES.REGISTER} element={<Registration />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.BOOKS_LISTING} element={<BookListing />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.BOOK_DETAILS} element={<BookDetails />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;
