import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import {
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
  Facets,
  LocationBias,
} from "@yext/search-ui-react";
import * as React from "react";
import { useEffect } from "react";
import ProfessionalCard from "../Cards/ProfessionalCard";
import Loader from "../Loader";
import Services from "../Cards/Services";
import { useState } from "react";
type verticalKey = {
  verticalKey: string;
};
const ServicePage = ({ verticalKey }: verticalKey) => {
  const searchActions = useSearchActions();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex mt-4">
          <div className="w-64 shrink-0 mr-5 mt-4">
            <Facets />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={Services}
              customCssClasses={{
                verticalResultsContainer: "grid grid-cols-3 gap-4",
              }}
            />
            <Pagination />
            <LocationBias />
          </div>
        </div>
      )}
    </>
  );
};

export default ServicePage;
