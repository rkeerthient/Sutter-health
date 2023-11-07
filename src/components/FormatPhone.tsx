import { PhoneIcon } from "@heroicons/react/20/solid";
import * as React from "react";

const FormatPhone = ({ phoneNumber }: any) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <PhoneIcon className="h-4 w-4  " />
      <div className="underline">
        {phoneNumber &&
          phoneNumber
            .replace("+1", "")
            .replace(/\D+/g, "")
            .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
      </div>
    </div>
  );
};

export default FormatPhone;
