import * as React from "react";
import HomeIcon from "./Icons/HomeIcon";
import { HomeModernIcon } from "@heroicons/react/20/solid";
import { HiHome } from "react-icons/hi2";
interface Breadcrumb {
  label: string;
  url: string;
}

interface BreadcrumbsProps {
  paths: Breadcrumb[];
}
const PageBreadcrumb = ({ paths }: BreadcrumbsProps) => {
  return (
    <div className="centered-container ">
      <div className="flex space-x-2 items-center border-b-8 border-[#008080] pb-2">
        {paths.map((path, index) => {
          const { label, url } = path;

          return (
            <span key={index} className="flex items-center font-semibold">
              {url ? (
                <a
                  href={`/${url}`}
                  className="  text-[#008080] hover:underline hover:underline-offset-4"
                >
                  {label != "Home" ? label : <HiHome className="w-5 h-5 " />}
                </a>
              ) : (
                label
              )}

              {index < paths.length - 1 && (
                <span className="mx-2 text-gray-500">{"/"}</span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PageBreadcrumb;
