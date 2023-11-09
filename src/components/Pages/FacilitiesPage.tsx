import {
  useSearchActions,
  useSearchState,
  SelectableStaticFilter,
  Matcher,
} from "@yext/search-headless-react";
import {
  OnDragHandler,
  ResultsCount,
  AppliedFilters,
  Pagination,
  MapboxMap,
  VerticalResults,
  LocationBias,
  Coordinate,
  MapboxMapProps,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Loader from "../Loader";
import ProfessionalFacility from "../Cards/ProfessionalFacility";
import MapPin from "../MapPin";
import { useEffect, useState } from "react";
export interface Location {
  yextDisplayCoordinate?: Coordinate;
}

const mapboxOptions: MapboxMapProps<Location>["mapboxOptions"] = {
  zoom: 10,
};
type verticalKey = {
  verticalKey: string;
};
const FacilitiesPage = ({ verticalKey }: verticalKey) => {
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    searchActions.setVertical(verticalKey);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, [searchActions]);

  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );

  return (
    <>
      <div>
        <ResultsCount />
        {/* <CustomFacet fieldId={"services"}></CustomFacet> */}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className="flex flex-row">
            <div
              className="flex flex-col w-2/5  p-4 overflow-scroll"
              style={{ height: "95vh" }}
            >
              <AppliedFilters />
              <VerticalResults CardComponent={ProfessionalFacility} />
              <Pagination />
              <LocationBias />
            </div>
            <div className=" w-3/5 h-screen">
              <MapboxMap
                mapboxOptions={{ zoom: 4 }}
                mapboxAccessToken={
                  "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
                }
                PinComponent={MapPin}
                onDrag={onDrag}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FacilitiesPage;
