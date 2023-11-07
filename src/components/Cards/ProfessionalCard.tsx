import { CardProps } from "@yext/search-ui-react";
import * as React from "react";
import HealthcareProfessional from "../../types/healthcare_professionals";
import {
  CheckIcon,
  MapPinIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@yext/pages/components";
import Address from "../Address";
import FormatPhone from "../FormatPhone";
import HoursText from "../HoursText";

const ProfessionalCard = ({ result }: CardProps<HealthcareProfessional>) => {
  const { name } = result;
  const {
    headshot,
    slug,
    mainPhone,
    c_speciality,
    address,
    acceptingNewPatients,
    languages,
    hours,
  } = result.rawData;
  return (
    <div className="grid grid-cols-3 border p-4 items-start">
      {headshot && (
        <Image
          image={headshot}
          className="mx-auto h-52 w-52 flex-shrink-0 rounded-full"
        ></Image>
      )}
      <div className="my-auto">
        <div className="text-2xl font-bold text-[#008080]">{name}</div>
        <div className="flex flex-1">
          <div className="flex flex-col gap-2">
            <div>
              <Address address={address}></Address>
            </div>

            <div>
              <FormatPhone phoneNumber={mainPhone}></FormatPhone>
            </div>
            <div className="flex flex-col text-sm gap-2 mt-4">
              <div className="font-bold ">{c_speciality}</div>
              <div className="flex gap-1">
                {acceptingNewPatients ? (
                  <CheckIcon className="h-4 w-4 text-[#008080]" />
                ) : (
                  <XMarkIcon className="h-4 w-4 text-red-600" />
                )}
                <div>Accepting New Patients</div>
              </div>
            </div>
            <div className="flex flex-col text-sm gap-2 mt-2 ">
              <div className="font-bold ">Languages</div>
              <div className="grid grid-cols-2 gap-3">
                {languages?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-auto flex flex-col gap-6">
        {hours && <HoursText document={result.rawData} />}
        <a
          href="#"
          className="w-full uppercase text-white hover:text-white bg-[#008080] hover:bg-[#066] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2 border"
        >
          Book Appointment
        </a>
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

export default ProfessionalCard;
