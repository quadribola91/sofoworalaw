import React, { useState } from "react";

const sections = [
  {
    title: "Admiralty & Maritime Law",
    items: [
      "Marine Insurance Claims",
      "Demurrages",
      "Arrest of vessel",
      "Ship Brokerage",
    ],
  },
  {
    title: "Arbitration & ADR",
    items: ["Arbitration", "Mediation", "Conciliation"],
  },
  {
    title: "Commercial Litigation",
    items: [
      "Employment and Labor Law",
      "Companies and Allied Matters Dispute",
      "Creditors and Securities Holder Protection",
    ],
  },
  {
    title: "Intellectual Property",
    items: [],
  },
  {
    title: "Private & Property Law",
    items: [
      "Chieftaincy",
      "Child Rights & Custody",
      "Customary Law",
      "Divorce",
      "Family",
      "Land Law and Tenancy",
      "Wills & Probate",
    ],
  },
  {
    title: "Technology, Telecommunications & Media",
    items: [
      "Blockchain Technology",
      "Artificial Intelligence",
      "Internet of Things",
    ],
  },
  {
    title: "Advisory, Compliance & Regulation",
    items: [
      "Corporate Governance, Compliance, Policy and Regulation",
      "Immigration and National Law",
      "Private Client and Wealth Management",
      "Tax",
    ],
  },
  {
    title: "Corporate & Commercial Law",
    items: [
      "Anti-Trust and Competition",
      "Banking and Finance",
      "Capital Market",
      "European Trade Law",
      "Foreign Investment",
      "Insurance Law",
      "International Trade Law",
      "Real Estate",
      "Secured Transaction",
      "Transactional Law",
    ],
  },
  {
    title: "Energy and Natural Resources",
    items: ["Oil & Gas", "Power", "Renewable Energy"],
  },
  {
    title: "Litigation",
    items: [
      "Employment and Labor Law",
      "Companies and Allied Matters Dispute",
      "Creditors and Securities Holder Protection",
    ],
  },
  {
    title: "Public Law",
    items: [
      "Civil Liberties/ Fundamental Human Rights",
      "Criminal Law",
      "Defamation Law",
      "White Collar Defense",
    ],
  },
];

export default function PracticeAreas() {
  // default open state: all sections open so items show without clicking
  const [openState, setOpenState] = useState(sections.map(() => true));

  const toggle = (i) => {
    setOpenState((prev) => {
      const copy = [...prev];
      copy[i] = !copy[i];
      return copy;
    });
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Practice Areas</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            The Firm is grouped into the following Practice Areas run by teams
            with over 100 years combined experience.
          </p>
          <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
        </div>

        {/* Accordion grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl shadow-sm p-6"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full text-left flex justify-between items-center"
              >
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <span className="text-xl">{openState[index] ? "−" : "+"}</span>
              </button>

              {section.items.length > 0 ? (
                <ul
                  className={`mt-4 list-disc ml-6 text-gray-700 ${
                    openState[index] ? "block" : "hidden"
                  }`}
                >
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p
                  className={`mt-4 text-gray-700 ${
                    openState[index] ? "block" : "hidden"
                  }`}
                >
                  No items listed.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
