// pages/HomePage.js
import React from "react";
import Slider from "../components/Slider";
import Counter from "../components/Counter";
import About from "../components/About";
import Consultation from "../components/Consultation";

export default function HomePage() {
  return (
    <>
      <Slider />
      <Counter />
      <About />
      <Consultation />
    </>
  );
}
