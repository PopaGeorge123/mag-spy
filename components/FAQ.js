"use client";

import { useRef, useState } from "react";
import { track } from '@vercel/analytics';

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList

const faqList = [
  {
    question: "Ce primesc mai exact?",
    answer: <div className="space-y-2 leading-relaxed">Obțineți un instrument care vă ajută să urmăriți prețurile produselor preferate. Puteți configura alerte și puteți primi notificări când prețul scade. De asemenea, puteți vedea istoricul prețurilor produselor pe care le urmăriți.</div>,
  },
  {
    question: "Pot primi o rambursare?",
    answer: (
      <p> Da! Puteți solicita o rambursare în termen de 7 zile de la achiziție. Contactați prin e-mail sau <span><a className="text-white text-bold" href="/support">aici</a></span>.</p>
    ),
  },
  {
    question: "Cum verifică această aplicație prețurile?",
    answer: (
      <div className="space-y-2 leading-relaxed">Folosim algoritmi avansați pentru a obține prețurile produselor pe care le monitorizati. De asemenea, folosim cele mai noi tehnologii pentru a ne asigura că prețurile sunt corecte.</div>
    ),
  },
];

const Item = ({ item }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
          track("faq-item-click", { item: item.question });
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
          Întrebări frecvente
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <Item key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ;
