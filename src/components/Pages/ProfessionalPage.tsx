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
import { useEffect, useState } from "react";
import ProfessionalCard from "../Cards/ProfessionalCard";
import Loader from "../Loader";
import ToggleFacet from "../FacetToggle";

type verticalKey = {
  verticalKey: string;
};

const ProfessionalPage = ({ verticalKey }: verticalKey) => {
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
            {/* <ToggleFacet fieldId={"acceptingNewPatients"}></ToggleFacet>
            <ToggleFacet fieldId={"c_videoVisits"}></ToggleFacet>
            <ToggleFacet fieldId={"c_myHealthOnline"}></ToggleFacet> */}
            <Facets
              // excludedFieldIds={[
              //   "c_videoVisits",
              //   "c_myHealthOnline",
              //   "acceptingNewPatients",
              // ]}
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={ProfessionalCard}
              customCssClasses={{
                verticalResultsContainer: "flex flex-col gap-4",
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

export default ProfessionalPage;
