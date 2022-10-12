import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import {SearchBar} from "../SearchBar/SearchBar"

export function NavBar() {
    return (
        <div className="nav-container">
            <div className="all-li">
              <Link to="/recipes/" style={{ textDecoration: "inherit" }}>
                <li className="link-route">Home</li>
              </Link>
              <Link to="/create" style={{ textDecoration: "inherit" }}>
                <li className="link-route">Create Recipe</li>
              </Link>
            </div>
            <div className="search-container">
                <SearchBar/>               
            </div>

        </div>
      );
}