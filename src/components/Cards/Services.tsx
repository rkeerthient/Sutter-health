import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import Ce_services from "../../types/services";

const Services = ({ result }: CardProps<Ce_services>) => {
  const { name } = result;
  const { c_imageUrl, slug } = result.rawData;

  return (
    <div className="border flex flex-col justify-center gap-4">
      {c_imageUrl ? (
        <img src={c_imageUrl} className="mx-auto h-52" alt="Product Image" />
      ) : (
        <img
          src="https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg"
          className="mx-auto h-52 w-52"
          alt="Default Image"
        />
      )}
      <div className="flex flex-col justify-between gap-2 p-2 h-[1/2]">
        <div className="h-18 font-bold text-[#008080] mx-auto">{name}</div>
        <div className="m-auto flex flex-col gap-6">
          <a
            href={`/${slug}`}
            className="w-full uppercase text-[#066] hover:text-white border-2 border-[#066] hover:bg-[#066] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-1"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;
