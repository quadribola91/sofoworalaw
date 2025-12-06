import React from "react";
import heroImage from "../assets/law-distance-learning-img-01.jpg";
import logoBlueLarge from "../assets/logo-blue.png";

export default function AboutPage() {
  return (
    <div className="w-full">
      {/* HERO / SLIDER SECTION */}
      <section
        id="slider"
        className="relative h-[120vh] flex items-center justify-center text-center reveal-on-scroll"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Olumide Sofowora
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Legal Practitioners | Arbitrators | Notaries Public
          </p>
          <a
            href="#about"
            className="px-6 py-3 border-2 border-brand text-brand bg-white font-semibold rounded-md hover:bg-brand hover:text-white transition-all"
          >
            More About Us
          </a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="container mx-auto px-6 py-20 reveal-on-scroll"
      >
        <div className="max-w-4xl mx-auto text-start">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About Our Firm
              </h2>
              <div className="w-20 h-1 bg-brand mb-8"></div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6">
            Apart from the drafting of legal documentation and offering legal
            advice in our practice areas, lawyers in the Firm have appeared and
            continue to prosecute and defend cases in many Divisions of the
            Federal and States High Courts on matters relating to Admiralty and
            Maritime Law, Industrial, Corporate and Commercial Law, Banking and
            Insurance Law, Intellectual Property Law, Energy and Natural
            Resources Law, and have also successfully registered Judgments
            obtained in Foreign Jurisdictions in the said Courts.
          </p>

          <p className="text-lg leading-relaxed mb-10">
            We have also appeared and still have several cases pending in the
            Federal and States High Courts including but not limited to Lagos
            State, Oyo State, Ogun State, Ondo State, Edo State, Rivers State,
            Plateau State and Abuja – The Federal Capital Territory as well as
            in several Divisions of the Court of Appeal and the Supreme Court on
            matters relating to Corporate and Commercial Law (Banking,
            Insurance, Commercial Transactions generally – Sale of Goods, Hire
            Purchase, Breach of Contracts, Recovery of Debts etc.), Land Law,
            Employment Law, Defamation Law, Domestic or Family Law Matters –
            Probate/ Administration of Estates, Divorce, Maintenance of Spouse,
            Custody of Children etc., Landlord and Tenant Matters etc.
          </p>

          <a
            href="/practice-areas"
            className="px-6 py-3 border-2 border-brand text-brand font-semibold rounded-md hover:bg-brand hover:text-white transition-all"
          >
            Our Practice Areas
          </a>
        </div>
      </section>
    </div>
  );
}
