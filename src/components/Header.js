import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import logoLight from "../assets/logo-white.png";
import logoDark from "../assets/logo-blue.png";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    // call once to set initial state
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Force dark/scrolled header on certain pages where the background is light
  useEffect(() => {
    if (
      ["/practice-areas", "/teampage", "/consultpage"].includes(
        location.pathname
      )
    ) {
      setScrolled(true);
    } else {
      // respect scroll position for other pages
      setScrolled(window.scrollY > 50);
    }
  }, [location]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  const navItems = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Practice Areas", to: "/practice-areas" },
    { name: "Team", to: "/teampage" },
    { name: "Consult", to: "/consultpage" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* LOGO */}
        <Link to="/">
          <img
            src={scrolled ? logoDark : logoLight}
            alt="Olumide Sofowora Logo"
            className="h-20 transition-all duration-500"
            style={{ padding: "0.8rem 0" }}
          />
        </Link>
        {/* DESKTOP NAV BAR */}
        <nav className="hidden md:block">
          <ul
            className={`flex space-x-6 text-md font-semibold transition-colors duration-500 ${
              scrolled ? "text-black" : "text-white"
            }`}
          >
            {navItems.map((item, index) => (
              <li key={index} className="relative">
                <Link
                  to={item.to}
                  className="
                    hover:after:block 
                    after:absolute 
                    after:-bottom-2 
                    after:left-0 
                    after:w-full 
                    after:h-[2px] 
                    after:bg-black 
                    after:scale-x-0 
                    after:origin-left 
                    after:transition-transform 
                    after:duration-700 
                    hover:after:scale-x-100
                  "
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* MOBILE HAMBURGER BUTTON */}
        <button
          onClick={toggleMenu}
          className="md:hidden border-1.5 border-brand flex flex-col gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-brand" : "bg-brand"
            } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-brand" : "bg-brand"
            } ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 transition-all duration-300 ${
              scrolled ? "bg-brand" : "bg-brand"
            } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`absolute top-full left-0 right-0 bg-white shadow-lg md:hidden overflow-hidden transition-all duration-500 ease-out ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="px-6 py-4">
          <ul className="flex flex-col space-y-4 text-lg font-semibold text-black">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.to}
                  onClick={closeMenu}
                  className="
                    relative
                    hover:text-brand
                    transition-colors duration-300
                    after:absolute 
                    after:-bottom-1 
                    after:left-0 
                    after:w-full 
                    after:h-[2px] 
                    after:bg-brand 
                    after:scale-x-0 
                    after:origin-left 
                    after:transition-transform 
                    after:duration-700 
                    hover:after:scale-x-100
                  "
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
