import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="mb-2 fixed left-0 bottom-0  w-full ">
      <div className="container shadow-md bg-gray-50 px-4 py-4  mx-auto flex items-center justify-between">
        <span className="text-gray-500">
          {" "}
          Copyright @2022 by Nikhil Taneja{" "}
        </span>

        <div className="flex">
          <FontAwesomeIcon className="ml-2" icon={faTwitter} />
          <FontAwesomeIcon className="ml-2" icon={faInstagram} />
          <FontAwesomeIcon className="ml-2" icon={faLinkedin} />
          <FontAwesomeIcon className="ml-2" icon={faGithub} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
