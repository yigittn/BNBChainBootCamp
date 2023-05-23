import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-slate-700 via-pink-900 to-black text-white">
      <div className="relative mx-auto  max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="mx-auto hover:scale-105 cursor-default max-w-md text-center leading-relaxed lg:text-left">
              This study has been conducted solely for educational purposes and
              does not pursue any particular objective. I would like to express
              my gratitude in advance for your recommendations and
              feedback.Thanks for visiting!
            </p>
          </div>

          <nav className="mt-12 lg:mt-0">
            <ul className="flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12">
              <li>
                <a
                  className="text-white transition hover:text-gray-700/75"
                  href="https://twitter.com/ygttnn"
                  target="_blank"
                >
                  Twitter
                </a>
              </li>

              <li>
                <a
                  className="text-white transition hover:text-gray-700/75"
                  href="https://www.linkedin.com/in/yigittn/"
                  target="_blank"
                >
                  Linkedin
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
