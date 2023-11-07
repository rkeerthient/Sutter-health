import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import HealthcareFacility from "../../types/healthcare_facilities";
import { Image } from "@yext/pages/components";
import Address from "../Address";
import FormatPhone from "../FormatPhone";
import HoursText from "../HoursText";
import { useState } from "react";
import Hours from "../hours";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ProfessionalFacility = ({ result }: CardProps<HealthcareFacility>) => {
  const { name } = result;
  const { photoGallery, address, mainPhone, hours, slug, c_servicesfacility } =
    result.rawData;
  console.log(c_servicesfacility);

  const [showBooking, setShowBooking] = useState(false);
  const [showHours, setShowHours] = useState(true);
  const getStatus = (val: string) => {
    val === "Closed perm" ? setShowBooking(false) : setShowBooking(true);
  };
  return (
    <div className="flex flex-1 p-2 border flex-col">
      <div className="flex flex-row gap-4">
        {photoGallery ? (
          <div>
            <Image image={photoGallery[0]}></Image>
          </div>
        ) : (
          <img
            src="https://img.freepik.com/premium-vector/photo-icon-picture-icon-image-sign-symbol-vector-illustration_64749-4409.jpg"
            className="w-[147px] h-[146px]"
            alt=""
          />
        )}
        <div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-[#008080] text-xl">{name}</h3>
            {address && <Address address={address}></Address>}
            {mainPhone && <FormatPhone phoneNumber={mainPhone} />}
            {hours && (
              <>
                <div className="flex gap-2 font-bold mt-2 items-center">
                  <div>Hours</div>
                  <ChevronDownIcon
                    onClick={() => setShowHours(!showHours)}
                    className={`${
                      !showHours ? `rotate-180 transform h-6 w-6` : `h-6 w-6`
                    }`}
                  />
                </div>
                {showHours ? (
                  <HoursText document={result.rawData} status={getStatus} />
                ) : (
                  <Hours hours={hours} />
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-2 mx-auto w-full mt-4">
        {showBooking && (
          <div className="w-1/2 uppercase text-white hover:text-white bg-[#008080] hover:bg-[#066] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2 border">
            Book Appointment
          </div>
        )}
        <a
          href={`/${slug}`}
          className="w-1/2 uppercase text-[#066] hover:text-white border-2 border-[#066] hover:bg-[#066] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2 "
        >
          View Location
        </a>
      </div>
    </div>
  );
};

export default ProfessionalFacility;
