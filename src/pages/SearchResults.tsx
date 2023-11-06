import { useLayoutEffect } from "react";
import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  ResultsCount,
  StandardCard,
  VerticalResults,
  LocationBias,
  StandardFacets,
  Pagination,
} from "@yext/search-ui-react";
import * as React from "react";

type Page_Props = {
  vertKey: string;
  isUniversal: boolean;
  cardType?: string;
};

const SearchResults = ({ vertKey, isUniversal = false }: Page_Props) => {
  console.log(vertKey);

  const searchActions = useSearchActions();
  useLayoutEffect(() => {
    vertKey
      ? (searchActions.setVertical(vertKey),
        searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(), searchActions.executeUniversalQuery());
  });
  return (
    <div className="flex">
      <div className="w-56 shrink-0 mr-5">
        <StandardFacets />
      </div>
      <div className="flex-grow">
        <div className="flex items-baseline">
          <ResultsCount />
          <AppliedFilters />
        </div>
        <VerticalResults CardComponent={StandardCard} />
        <Pagination />
        <LocationBias />
      </div>
    </div>
  );
};

export default SearchResults;
