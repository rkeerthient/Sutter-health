import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import Ce_services from "../../types/services";

const Services = ({ result }: CardProps<Ce_services>) => {
  const { name } = result;
  const { c_imageUrl, slug } = result.rawData;

  return (
    <div className=" p-4  border ">
      {c_imageUrl ? (
        <img src={"c_imageUrl"} className="mx-auto h-52 w-52 "></img>
      ) : (
        <img
          src={
            "https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg"
          }
          className="mx-auto h-52 w-52 "
        ></img>
      )}
      <div className="my-auto">
        <div className="h-24 font-bold text-[#008080]">{name}</div>
      </div>
      <div className="m-auto flex flex-col gap-6">
        <a
          href={`/${slug}`}
          className="w-full uppercase text-[#066] hover:text-white border-2 border-[#066] hover:bg-[#066] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2 "
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default Services;
