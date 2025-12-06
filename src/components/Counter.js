import React, { useEffect, useState } from "react";
import { MdGavel } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { AiOutlineSmile } from "react-icons/ai";
import { MdEmojiEvents } from "react-icons/md";

const counters = [
  { title: "Cases won", count: 321, icon: MdGavel },
  { title: "Skilled lawyers", count: 14, icon: FaUser },
  { title: "Happy clients", count: 819, icon: AiOutlineSmile },
  { title: "Great Rewards", count: 18, icon: MdEmojiEvents },
];

export default function Counter() {
  const [numbers, setNumbers] = useState(counters.map(() => 0));

  useEffect(() => {
    const handleScroll = () => {
      const countersSection = document.getElementById("counter");
      if (!countersSection) return;

      const top = countersSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (top < windowHeight) {
        counters.forEach((counter, idx) => {
          let start = 0;
          const end = counter.count;
          const duration = 1500;
          const increment = Math.ceil(end / (duration / 50));

          const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
              start = end;
              clearInterval(interval);
            }
            setNumbers((prev) => {
              const newNums = [...prev];
              newNums[idx] = start;
              return newNums;
            });
          }, 50);
        });
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="counter" className="py-20 bg-gray-100">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {counters.map((counter, idx) => {
          const IconComponent = counter.icon;
          return (
            <div key={idx} className="bg-white rounded shadow p-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <IconComponent className="text-4xl text-brand" aria-hidden />
                <div className="text-4xl font-bold text-brand">{numbers[idx]}</div>
              </div>
              <div className="mt-2 text-lg font-semibold">{counter.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
