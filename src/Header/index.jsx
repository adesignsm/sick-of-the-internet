import React, {useState} from "react";
import $ from "jquery";

import { NavLink } from "react-router-dom";
import { Links } from "./Links";

import "./index.css";

const Header = () => {

  const toggleVisibility = (e) => {
      if (e.target.id === "about-nav") {
        e.preventDefault();
        if ($(".about-container").css("display") === "none") {
          $(".about-container").fadeIn(100);
          $(".about-container").css("display", "flex");
        } else {
          $(".about-container").fadeOut(100);
        }
      } else if (e.target.id === "contact-nav") {
        e.preventDefault();
        if ($(".contact-form-container").css("display") === "none") {
          $(".contact-form-container").fadeIn(100);
          $(".contact-form-container").css("display", "flex");
        } else {
          $(".contact-form-container").fadeOut(100);
        }
      }
  }

  window.onmouseup = (e) => {
    if (e.target.id !== "about-nav") {
      $(".about-container").fadeOut(100);
    }

    if (e.target.id !== "contact-nav") {
      $(".contact-form-container").fadeOut(100);
    }
  }

  return (
    <>
      <div className="navigation-bar">
        <nav>
          <ul>
            {Links.map((link, i) => {
              return (
                <div className="navigation-item">
                  <li key={i} id={link.id} onClick={(e) => {toggleVisibility(e)}}>
                    {link.name}
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
