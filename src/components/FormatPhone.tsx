import * as React from "react";

const FormatPhone = ({ phoneNumber }: any) => {
 
  return (
    <div>
      {phoneNumber &&
        phoneNumber
          .replace("+1", "")
          .replace(/\D+/g, "")
          .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
    </div>
  );
};

export default FormatPhone;
