import * as React from "react";
import Cta from "../components/cta";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "About",
    url: "/turtlehead-tacos",
  },
];

const Header = () => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <>
      <div className=" bg-[#003333]">
        <div className="flex justify-end centered-container gap-6">
          <a href="/index.html" className="text-white py-4 font-bold ">
            Home
          </a>
          <a href="/search.html" className="text-white py-4 font-bold ">
            Search
          </a>
          <a href="" className="text-white py-4 font-bold ">
            Directory
          </a>
        </div>
      </div>

      <img src="https://i.imgur.com/ARYzCu4.png" alt="" className="w-full " />
      <hr />
    </>
  );
};

export default Header;
