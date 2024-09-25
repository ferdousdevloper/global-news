import React from "react";
import { Link } from "react-router-dom";
import img from "../Images/liveImg.jpg";
import img5 from "../Images/img5.jpeg";
import img6 from "../Images/img6.webp";
import img7 from "../Images/img7.jpg";
import img8 from "../Images/img8.jpeg";

const Politics = () => {
  return (
    <div className="bg-gray-800">
      <div className="my-1 md:my-3 lg:my-4 text-center font-bold text-4xl  text-orange-600">
        Politics
      </div>
      {/* Politics News bar section */}
      <div>
        <section className="px-3 py-3 dark:bg-gray-100 dark:text-gray-800">
          <div className="container grid grid-cols-12 mx-auto gap-y-6 md:gap-6">
            <div className="flex flex-col justify-between col-span-12 py-2 space-y-8 md:space-y-16 md:col-span-3 bg-slate-900 text-white rounded-xl">
              <div className="flex flex-col space-y-8 md:space-y-12 px-4">
                <div className="flex flex-col space-y-2">
                  <h3 className="flex items-center space-x-2 dark:text-gray-600">
                    <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Exclusive
                    </span>
                  </h3>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    The Road to Reform: Analyzing Proposed Changes in Electoral
                    Laws
                  </Link>
                  <p className="text-xs dark:text-gray-600">
                    47 minutes ago by
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="flex items-center space-x-2 dark:text-gray-600">
                    <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Exclusive
                    </span>
                  </h3>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Power Struggles: How Regional Conflicts Are Redrawing Global
                    Alliances
                  </Link>
                  <p className="text-xs dark:text-gray-600">2 hours ago by</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h3 className="flex items-center space-x-2 dark:text-gray-600">
                    <span className="flex-shrink-0 w-2 h-2 uppercase rounded-full dark:bg-violet-600"></span>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Exclusive
                    </span>
                  </h3>
                  <Link
                    rel="noopener noreferrer"
                    href="#"
                    className="font-serif hover:underline"
                  >
                    Inside the Debate: Key Issues Dividing Parliament Over New
                    Legislation
                  </Link>
                  <p className="text-xs dark:text-gray-600">4 hours ago by</p>
                </div>
              </div>
              <div className="flex flex-col w-full space-y-2">
                <div className="flex w-full h-1 bg-opacity-10 dark:bg-violet-600">
                  <div className="w-1/2 h-full dark:bg-violet-600"></div>
                </div>
                <Link
                  rel="noopener noreferrer"
                  href="#"
                  className="flex items-center justify-between w-full"
                >
                  <span className="text-xs mx-auto bg-green-700 text-white btn font-bold border-none tracking-wider uppercase">
                    See more exclusives
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 strokeCurrent dark:text-violet-600"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative flex col-span-12 dark:bg-gray-500 bg-center bg-no-repeat bg-cover xl:col-span-6 lg:col-span-5 md:col-span-9 min-h-96">
              <span className="absolute z-20 px-1 pb-2 text-xs text-gray-50 font-bold uppercase border-b-2 left-6 top-6 dark:text-gray-800 dark:border-violet-600">
                paris, france
              </span>
              <img src={img} className=" w-full h-full z-10" alt="" />
              <Link className="flex absolute bottom-0 flex-col items-center z-20 justify-end p-6 text-center sm:p-8 group dark:via- flex-grow-1 bg-gradient-to-b dark:from-gray-50 dark:to-gray-50">
                <span className="flex items-center mb-4 space-x-2 text-gray-50 dark:text-violet-600">
                  <span className="relative flex-shrink-0 w-2 h-2 bg-gray-50 rounded-full dark:bg-violet-600">
                    <span className="absolute flex-shrink-0 w-3 h-3 bg-gray-50 rounded-full -left-1 -top-1 animate-ping dark:bg-violet-600"></span>
                  </span>
                  <span className="text-sm font-bold">Live</span>
                </span>
                <h1
                  rel="noopener noreferrer"
                  href="#"
                  className="font-serif text-gray-50 text-xl font-semibold group-hover:underline dark:text-gray-800"
                >
                  Diplomacy at a Crossroads: Major Policy Shifts in U.S.-China
                  Relations
                </h1>
              </Link>
            </div>
            <div className="hidden py-2 xl:col-span-3 lg:col-span-4 md:hidden lg:block bg-slate-900 text-white rounded-xl">
              <div className="mb-8 px-2 space-x-5 border-b-2 border-opacity-10 dark:border-violet-600">
                <button
                  type="button"
                  className="pb-5 text-xs font-bold uppercase border-b-2 dark:border-violet-600"
                >
                  Latest
                </button>
                <button
                  type="button"
                  className="pb-5 text-xs font-bold uppercase border-b-2 dark:border- dark:text-gray-600"
                >
                  Popular
                </button>
              </div>
              <div className="flex flex-col divide-y dark:divide-gray-300">
                <div className="flex px-1 py-4">
                  <img
                    alt=""
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                    src={img5}
                  />
                  <div className="flex flex-col flex-grow">
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      className="font-serif hover:underline"
                    >
                      Global Power Shift: Key Outcomes from the Latest G20
                      Summit
                    </Link>
                    <p className="mt-auto text-xs dark:text-gray-600">
                      5 minutes ago
                      <Link
                        rel="noopener noreferrer"
                        href="#"
                        className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline"
                      >
                        Politics
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex px-1 py-4">
                  <img
                    alt=""
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                    src={img6}
                  />
                  <div className="flex flex-col flex-grow">
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      className="font-serif hover:underline"
                    >
                      Election Drama Unfolds: Breaking Down the Key Political
                      Battles
                    </Link>
                    <p className="mt-auto text-xs dark:text-gray-600">
                      14 minutes ago
                      <Link
                        rel="noopener noreferrer"
                        href="#"
                        className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline"
                      >
                        Politics
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex px-1 py-4">
                  <img
                    alt=""
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                    src={img7}
                  />
                  <div className="flex flex-col flex-grow">
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      className="font-serif hover:underline"
                    >
                      New Leadership, New Direction: How Recent Cabinet Changes
                      Could Shape Policy
                    </Link>
                    <p className="mt-auto text-xs dark:text-gray-600">
                      22 minutes ago
                      <Link
                        rel="noopener noreferrer"
                        href="#"
                        className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline"
                      >
                        Politics
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex px-1 py-4">
                  <img
                    alt=""
                    className="flex-shrink-0 object-cover w-20 h-20 mr-4 dark:bg-gray-500"
                    src={img8}
                  />
                  <div className="flex flex-col flex-grow">
                    <Link
                      rel="noopener noreferrer"
                      href="#"
                      className="font-serif hover:underline"
                    >
                      Rising Tensions: How International Sanctions Are Impacting
                      Global Relations
                    </Link>
                    <p className="mt-auto text-xs dark:text-gray-600">
                      37 minutes ago
                      <Link
                        rel="noopener noreferrer"
                        href="#"
                        className="block dark:text-blue-600 lg:ml-2 lg:inline hover:underline"
                      >
                        Politics
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Politics;
