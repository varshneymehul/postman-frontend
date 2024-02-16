import React, { useEffect, useState } from "react";

import "./stylesheets/Nav.css";
import logo from "../assets/images/netflix-logo.png";
// import SearchContext from "../store/search-context";
function Nav() {
  // const [searchTerm, setSearchTerm] = useState("");
  // const searchCtx = useContext(SearchContext);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setSearchTerm(e.target[0].value);
  // }
  // useEffect(() => {
  //   searchCtx.searchTerm = searchTerm;
  // }, [searchTerm, searchCtx]);

  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img className="nav__logo" src={logo} alt="netflix-logo" />
      {/* <form onSubmit={handleSubmit}>
        <input
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Search"
        />
        <button type="submit">Search</button>
      </form> */}
    </div>
  );
}

export default Nav;
