import { MapPinIcon } from "@heroicons/react/20/solid";
import * as React from "react";

export type Address = {
  line1: string;
  line2: string;
  line3: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type AddressProps = {
  address: Address;
};
const Address = (props: AddressProps) => {
  const { address } = props;
  const { line1, line2, line3, postalCode, region, city } = address;
  return (
    <div className="flex flex-row gap-2 items-start">
      <MapPinIcon className="h-4 w-4 mt-2" />
      <div className="flex flex-col underline">
        <div>{line1}</div>
        {line2 && <div>{line2}</div>}
        <div>{`${city}, ${region}, ${postalCode}`}</div>
      </div>
    </div>
  );
};

export default Address;
