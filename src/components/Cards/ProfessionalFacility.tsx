import * as React from "react";
import { CardProps } from "@yext/search-ui-react";
import HealthcareFacility from "../../types/healthcare_facilities";
import { Image } from "@yext/pages/components";
import Address from "../Address";
import FormatPhone from "../FormatPhone";
import HoursText from "../HoursText";

const ProfessionalFacility = ({ result }: CardProps<HealthcareFacility>) => {
  const { name } = result;
  const { photoGallery, address, mainPhone, hours, timezone } = result.rawData;
  return (
    <div className="flex flex-1 p-2 border">
      <div className="flex flex-col">
        <h3 className="font-semibold text-[#008080] text-xl">{name}</h3>
        {address && <Address address={address}></Address>}
        {mainPhone && <FormatPhone phoneNumber={mainPhone} />}
        {hours && <HoursText document={result.rawData} />}
      </div>
    </div>
  );
};

export default ProfessionalFacility;
