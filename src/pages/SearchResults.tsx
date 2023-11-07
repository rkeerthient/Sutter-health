import { useEffect, useState } from "react";
import {
  useSearchActions,
  SelectableStaticFilter,
  Matcher,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  ResultsCount,
  StandardCard,
  VerticalResults,
  LocationBias,
  StandardFacets,
  Pagination,
  DirectAnswer,
  SpellCheck,
  OnDragHandler,
  MapboxMap,
  SearchBar,
  onSearchFunc,
  UniversalResults,
  StandardSection,
} from "@yext/search-ui-react";
import * as React from "react";
import ProfessionalCard from "../components/Cards/ProfessionalCard";
import ProfessionalFacility from "../components/Cards/ProfessionalFacility";
import MapPin from "../components/MapPin";
import "mapbox-gl/dist/mapbox-gl.css";
import { LngLat, LngLatBounds } from "mapbox-gl";
import NavBar from "../components/NavBar";
import Services from "../components/Cards/Services";

const SearchResults = () => {
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [mapCenter, setMapCenter] = useState<LngLat | undefined>();
  const [mapBounds, setMapBounds] = useState<LngLatBounds | undefined>();
  const [verticalKey, setVerticalKey] = useState("");
  const [inpQuery, setInpQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const searchActions = useSearchActions();
  const GridSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-4 md:gap-8 text-xs">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const vertQP = queryParams.get("vertical");
    const queryQP = queryParams.get("query");
    vertQP && setVerticalKey(vertQP);
    queryQP && setInpQuery(queryQP);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    verticalKey && verticalKey !== "all"
      ? (console.log("entrd vert"),
        searchActions.setVertical(verticalKey),
        searchActions.executeVerticalQuery().then(() => setIsLoading(false)))
      : (console.log("entrd unib"),
        searchActions.setUniversal(),
        searchActions.executeUniversalQuery().then(() => setIsLoading(false)));
    const queryParams = new URLSearchParams(window.location.search);
    inpQuery && searchActions.setQuery(inpQuery);
    verticalKey
      ? queryParams.set("vertical", verticalKey)
      : queryParams.delete("vertical");
    inpQuery ? queryParams.set("query", inpQuery) : queryParams.delete("query");
    history.pushState(null, "", "?" + queryParams.toString());
  }, [verticalKey, inpQuery]);

  const handleSearchAreaClick = () => {
    if (mapCenter && mapBounds) {
      const locationFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Current map area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          value: {
            lat: mapCenter.lat,
            lng: mapCenter.lng,
            radius: mapBounds.getNorthEast().distanceTo(mapCenter),
          },
          matcher: Matcher.Near,
        },
      };
      searchActions.setVertical(verticalKey!);
      searchActions.setStaticFilters([locationFilter]);
      searchActions.executeVerticalQuery();
      setShowSearchAreaButton(false);
    }
  };

  const handleClick = (id: string) => {
    setIsLoading(true);
    setVerticalKey(id);
  };

  const handleDrag: OnDragHandler = (center: LngLat, bounds: LngLatBounds) => {
    setMapCenter(center);
    setMapBounds(bounds);
    setShowSearchAreaButton(true);
  };

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    query ? setInpQuery(query) : setInpQuery("");
  };

  return (
    <>
      <div className=" w-full px-10 ">
        <SearchBar onSearch={handleSearch} />
        <div className=" bg-white">
          <NavBar
            onSelect={handleClick}
            items={[
              {
                label: "All Results",
                id: "all",
              },

              {
                label: "Doctors",
                id: "healthcare_professionals",
              },
              {
                label: "Healthcare Facilities",
                id: "healthcare_facilities",
              },
              {
                label: "Services",
                id: "services",
              },
            ]}
            selectedId={verticalKey}
          />
        </div>
        <>
          {isLoading && (
            <div className="flex items-center justify-center h-screen">
              <div className="border-t-4 border-blue-500 border-solid h-12 w-12 rounded-full animate-spin"></div>
            </div>
          )}
          {verticalKey === "all" ? (
            <>
              {!isLoading && (
                <>
                  <SpellCheck />
                  <DirectAnswer />
                  <ResultsCount />
                  <UniversalResults
                    verticalConfigMap={{
                      healthcare_facilities: {
                        label: "Healthcare Facilities",
                        CardComponent: ProfessionalFacility,
                        SectionComponent: GridSection,
                      },
                      healthcare_professionals: {
                        label: "Healthcare Professionals",
                        CardComponent: ProfessionalCard,
                        SectionComponent: StandardSection,
                      },
                      services: {
                        label: "Services",
                        CardComponent: Services,
                        SectionComponent: GridSection,
                      },
                    }}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {verticalKey === "healthcare_facilities" ? (
                <>
                  {!isLoading && (
                    <div className="flex gap-2 mt-4 w-full">
                      <div
                        className={`
                  w-2/4 md:overflow-scroll md:h-[800px]`}
                      >
                        <div className="flex items-baseline">
                          <ResultsCount />
                          <AppliedFilters />
                        </div>

                        <VerticalResults
                          customCssClasses={{
                            verticalResultsContainer: "flex flex-col gap-y-4",
                          }}
                          CardComponent={ProfessionalCard}
                        />
                        <div className="mt-4">
                          <Pagination />
                          <LocationBias />
                        </div>
                      </div>
                      <div className={`relative w-2/4 md:overflow-scroll`}>
                        <MapboxMap
                          mapboxOptions={{ zoom: 4 }}
                          mapboxAccessToken={
                            "pk.eyJ1Ijoic3VubnlrZWVydGhpIiwiYSI6ImNsNWh5ZGt3czAyejUzY3A3Y3pvZ2E0bTgifQ.TNHfh1HL0LwTzLxs2TOaBQ"
                          }
                          PinComponent={MapPin}
                          onDrag={handleDrag}
                        />
                        {showSearchAreaButton && (
                          <div className="absolute bottom-10 left-0 right-0 flex justify-center">
                            <button
                              onClick={handleSearchAreaClick}
                              className="rounded-2xl border bg-white py-2 px-4 shadow-xl"
                            >
                              <p>Search This Area</p>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {!isLoading && (
                    <div className="flex mt-4">
                      {verticalKey !== "services" && (
                        <div className="w-56 shrink-0 mr-5">
                          <StandardFacets />
                        </div>
                      )}
                      <div className="flex-grow">
                        <div className="flex items-baseline">
                          <ResultsCount />
                          <AppliedFilters />
                        </div>
                        <VerticalResults
                          CardComponent={
                            verticalKey === "services"
                              ? Services
                              : ProfessionalCard
                          }
                          customCssClasses={{
                            verticalResultsContainer: `${
                              verticalKey === "services"
                                ? "grid grid-cols-4 gap-4"
                                : "flex flex-col gap-4"
                            }`,
                          }}
                        />
                        <Pagination />
                        <LocationBias />
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default SearchResults;
