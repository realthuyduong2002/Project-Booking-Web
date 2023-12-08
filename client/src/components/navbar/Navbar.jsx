import { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Button, Nav, NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserLarge,
  faRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [logoutClicked, setLogoutClicked] = useState(false);
  // const handleLogout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };
  const handleLogout = () => {
    if (!logoutClicked) {
      dispatch({ type: "LOGOUT" });
      //setLogoutClicked(true);
    }
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>
        {user ? (
          <div className="navItems">

            <Button className="navButton"  >
              <FontAwesomeIcon icon={faUser} style={{ color: "#1e3050", }} className="headerIcon" />
              {user.username}
            </Button>

            <button className="navButton"
              onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />LogOut</button>

          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
