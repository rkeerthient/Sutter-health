import * as React from "react";
import Hours from "./hours";

const CustomDA = ({ data }: any) => {
  console.log(JSON.stringify(data));

  return <Hours hours={data}></Hours>;
};

export default CustomDA;
