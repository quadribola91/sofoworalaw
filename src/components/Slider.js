import React from "react";
// import heroBanner from "../assets/law-distance-learning-img-01.jpg";
import slider from "../assets/sofowora_law_slide.jpg";

export default function Slider() {
  return (
    <section id="slider" className="relative h-screen">
      <div className="absolute inset-0">
        <img
          src={slider}
          alt="Slider Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Olumide Sofowora</h1>
        <p className="text-xl mb-6">
          Legal Practitioners | Arbitrators | Notaries Public
        </p>
        <a
          href="#consult"
          className="px-16 py-4 bg-transparent text-brand border border-brand rounded transition-colors duration-500 hover:bg-brand hover:text-white"
        >
          Consult Us
        </a>
      </div>
    </section>
  );
}
