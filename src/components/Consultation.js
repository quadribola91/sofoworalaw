import React from "react";

export default function Consult() {
  return (
    <section id="consult" className="py-20 bg-gray-50">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-brand">Consult Us</h2>
          <p className="mb-6">Fill the form below for a consultation.</p>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Full Name"
              className="w-full p-3 border border-brand rounded"
              required
            />
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full p-3 border border-brand rounded"
              required
            />
            <select className="w-full p-3 border border-brand rounded" required>
              <option value="">Select A Practice Area</option>
              <option value="Admiralty & Maritime Law">Admiralty & Maritime Law</option>
              <option value="Advisory, Compliance & Regulation">Advisory, Compliance & Regulation</option>
              <option value="Arbitration & ADR">Arbitration & ADR</option>
              <option value="Corporate & Commercial Law">Corporate & Commercial Law</option>
              <option value="Commercial Litigation">Commercial Litigation</option>
              <option value="Energy and Natural Resources">Energy and Natural Resources</option>
              <option value="Intellectual Property">Intellectual Property</option>
              <option value="Litigation">Litigation</option>
              <option value="Private & Property Law">Private & Property Law</option>
              <option value="Public Law">Public Law</option>
              <option value="Technology, Telecommunications & Media">Technology, Telecommunications & Media</option>
            </select>
            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-3 border border-brand rounded"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand text-white border border-brand rounded hover:bg-white hover:text-brand transition-colors duration-500"
            >
              Send Request
            </button>
          </form>
        </div>
        <div>
          <img
            src="https://sofoworalaw.com/assets/images/contact-us-pen.jpg"
            alt="Consult"
            className="rounded shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
