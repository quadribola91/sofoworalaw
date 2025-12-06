import React from "react";
import logo from "../assets/osc-logo-bg-blue.png";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white pt-10">
      <div className="container p-12 mx-auto grid md:grid-cols-3 gap-8 mb-8">
        <div className="gap-3 gap-col-3">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <p>
            Our Law Firm engages in General Legal Practice, providing
            comprehensive services to clients.
          </p>
        </div>
        <div></div>
        <div>
          <h5 className="text-xl font-bold mb-4 gap-3">Get In Touch</h5>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MdLocationOn className="text-2xl text-brand mt-1" />
              <span>
                Olumide Sofowora, 2 Ibeju Lekki Street, Dolphin Estate, Lagos.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <FaPhone className="text-2xl text-brand mt-1" />
              <span>
                <a href="tel:+2348054012125" className="hover:underline">
                  (+234) 805 4012 125
                </a>
                <span className="mx-2">|</span>
                <a href="tel:+2348064660083" className="hover:underline">
                  (+234) 806 4660 083
                </a>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MdEmail className="text-2xl text-brand mt-1" />
              <span>
                <a
                  href="mailto:contact@sofoworalaw.com"
                  className="text-brand hover:underline"
                >
                  contact@sofoworalaw.com
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-gray-900 text-gray-300 text-center py-6">
          <div className="container mx-auto">
            &copy; 2025, All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
