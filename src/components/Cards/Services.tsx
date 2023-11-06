import * as React from "react";
import Ce_services from "../../types/services";
import { CardProps } from "@yext/search-ui-react";

const Services = ({ result }: CardProps<Ce_services>) => {
  const { name } = result;
  return <div>{name}</div>;
};

export default Services;
