import React from "react";
import aboutImg from "../assets/logo-blue.png";

export default function About() {
  return (
    <section id="about" className="py-20 px-3">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-5/12">
          <img src={aboutImg} alt="About" className="" />
        </div>
        <div className="md:w-6/12 md:ml-10">
          <h2 className="text-3xl font-bold mb-12 flex justify-start hover:underline">
            About Our Firm
          </h2>
          <div className="w-12 h-1 bg-black mb-8"></div>
          <p className="mb-4">
            Olumide Sofowora is a Full Service Firm providing a comprehensive
            legal service to enable us assist our Clients meet their various
            needs.
          </p>
          <p className="mb-4">
            The Firm was founded in 1989 by Olumide Sofowora, SAN with the
            mission to be the “Pillar of Justice and Fairness” and has over the
            years trained over 50 lawyers who have imbibed the high ethical
            culture of the firm.
          </p>
          <p className="mb-6">
            The Strength of the firm lies particularly in the depth and variety
            of experiences and exposure of our lawyers. Our quest for the
            provision of a unique and personalized service to our clients has
            also led to our innovation in anticipating clients’ needs through a
            system of continuous professional development globally in areas of
            our clients’ specialties thereby enhancing our understanding of
            their business.
          </p>
          <div className="flex gap-4">
            <a
              href="/about"
              className="px-6 py-2 bg-brand text-white border border-brand rounded hover:bg-white hover:text-brand transition-colors duration-500"
            >
              More About Us
            </a>
            <a
              href="/teampage"
              className="px-6 py-2 border border-brand text-brand rounded hover:bg-brand hover:text-white transition-colors duration-500"
            >
              Our Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
