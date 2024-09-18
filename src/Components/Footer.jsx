/* eslint-disable jsx-a11y/anchor-is-valid */
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-black">
      <div>
        <h1 className="text-center py-20 text-4xl font-bold tracking-widest">
          <span className="text-[#02AA08]">Global</span> News
        </h1>
      </div>
      <div>
        <div className="flex items-center justify-center gap-10 max-w-[800px] mx-auto">
          <h1 className="text-3xl">Get the Latest News Delivered Right to Your Inbox!</h1>
          <div className="flex">
            <input className="px-10 py-2 rounded-l-xl" type="text" placeholder="Enter your email" />{" "}
            <button className="px-6 py-2 bg-red-600 text-white font-bold rounded-r-xl">Subscribe</button>
          </div>
        </div>
      </div>
      <hr className="my-10 container mx-auto" />
      <footer className="px-4">
        <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
          <div className=""></div>
          <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-full sm:grid-cols-4">
            <div className="space-y-3">
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Politics
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Sports
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Entertainment
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    All news
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Teach
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <ul className="space-y-1">
                <li>
                  <a rel="noopener noreferrer" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    FAQ
                  </a>
                </li>
                <li>
                  <a rel="noopener noreferrer" href="#">
                    Advertise
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <div className="uppercase ">Social media</div>
              <div className="flex justify-start space-x-3">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              </div>
              
            </div>
          </div>
        </div>
        <div className="py-6 text-sm text-center ">
          © 1968 Company Co. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
