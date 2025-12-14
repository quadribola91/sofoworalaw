import React from "react";
import logo from "../assets/osc-logo-bg-blue.png";
import { MdLocationOn, MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#363636] text-white pt-10">
      <div className="container p-4 md:p-12 lg:p-24 mx-auto grid md:grid-cols-3 gap-8 mb-16">
        <div className="gap-3 gap-col-3">
          <img src={logo} alt="Logo" className="h-20 mb-4" />
          <p className="text-md">
            Our Law Firm engages in General Legal Practice, providing a very
            comprehensive service that enables us to assist our Clients whatever
            their problems may be.
          </p>
        </div>
        <div></div>
        <div>
          <h5 className="text-lg font-bold mb-4 gap-3">Get In Touch</h5>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MdLocationOn className="text-2xl text-brand mt-1" />
              <span>
                Olumide Sofowora, 2 Ibeju Lekki Street, Dolphin Estate, Lagos.
              </span>
            </li>
            <li className="flex items-start gap-3 mb-4">
              <FaPhone className="text-2xl text-brand mt-1" />
              <span>
                <a href="tel:+2348054012125" className="hover:underline">
                  (+234) 805 4012 125 (till 6pm)
                </a>{" "}
                <br />
                <a href="tel:+2348064660083" className="hover:underline">
                  (+234) 806 4660 083 (24 Hours)
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
        <div className="bg-[#333333] text-gray-300 text-center py-6">
          <div className="container mx-auto">
            &copy; 2025, All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
