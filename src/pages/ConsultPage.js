import React from "react";

export default function ConsultPage() {
  return (
    <section id="consult" className="section cta pt-10 pb-10 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4 mt-20">
          {/* Form Column */}
          <div className="w-full md:w-7/12 px-4">
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-2">Consult Us</h2>
              <p className="text-gray-700 mb-6">
                Fill the form below for a consultation.
              </p>
              <div className="border-b border-gray-300 mb-10"></div>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fromName"
                placeholder="Your Full Name"
                required
                className="p-3 border rounded"
              />
              <input
                type="email"
                name="fromEmail"
                placeholder="Your Email Address"
                required
                className="p-3 border rounded"
              />
              <select
                name="subject"
                required
                className="p-3 border rounded col-span-1 md:col-span-2"
              >
                <option value="">Select A Practice Area</option>
                <option value="Admiralty & Maritime Law">
                  Admiralty & Maritime Law
                </option>
                <option value="Advisory, Compliance & Regulation">
                  Advisory, Compliance & Regulation
                </option>
                <option value="Arbitration & ADR">Arbitration & ADR</option>
                <option value="Corporate & Commercial Law">
                  Corporate & Commercial Law
                </option>
                <option value="Commercial Litigation">
                  Commercial Litigation
                </option>
                <option value="Energy and Natural Resources">
                  Energy and Natural Resources
                </option>
                <option value="Intellectual Property">
                  Intellectual Property
                </option>
                <option value="Litigation">Litigation</option>
                <option value="Private & Property Law">
                  Private & Property Law
                </option>
                <option value="Public Law">Public Law</option>
                <option value="Technology, Telecommunications & Media">
                  Technology, Telecommunications & Media
                </option>
              </select>

              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                className="p-3 border rounded col-span-1 md:col-span-2"
              ></textarea>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 col-span-1 md:col-span-2"
              >
                Send Request
              </button>
            </form>
          </div>

          {/* Image Column */}
          <div className="w-full md:w-5/12 px-4 mt-10 md:mt-0">
            <img
              src="https://sofoworalaw.com/assets/images/contact-us-pen.jpg"
              alt="Consultation"
              className="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
