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
  OnDragHandler,
  MapboxMap,
  SearchBar,
} from "@yext/search-ui-react";
import * as React from "react";
import ProfessionalCard from "../components/Cards/ProfessionalCard";
import ProfessionalFacility from "../components/Cards/ProfessionalFacility";
import Services from "../components/Cards/Services";
import MapPin from "../components/MapPin";
import "mapbox-gl/dist/mapbox-gl.css";
import { LngLat, LngLatBounds } from "mapbox-gl";
import NavBar from "../components/NavBar";

type Page_Props = {
  vertKey: string;
  isUniversal: boolean;
  cardType: string;
};

const SearchResults = () => {
  const [showSearchAreaButton, setShowSearchAreaButton] = useState(false);
  const [mapCenter, setMapCenter] = useState<LngLat | undefined>();
  const [mapBounds, setMapBounds] = useState<LngLatBounds | undefined>();
  const [verticalKey, setVerticalKey] = useState("");
  const [cardType, setCardType] = useState<any>();
  const handleClick = (id: string) => {
    id === "healthcare_professionals"
      ? setCardType("ProfessionalCard")
      : id === "healthcare_facilities"
      ? setCardType("FacilityCard")
      : id === "services"
      ? setCardType("ServicesCard")
      : StandardCard;
    setVerticalKey(id);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const vertQP = queryParams.get("vertical");
    const queryQP = queryParams.get("query");
    vertQP && handleClick(vertQP);
    queryQP && searchActions.setQuery(queryQP);
  }, []);

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

  const getCardType = (cardType: string) => {
    switch (cardType) {
      case "ProfessionalCard":
        return ProfessionalCard;
      case "FacilityCard":
        return ProfessionalFacility;
      case "ServicesCard":
        return Services;
      default:
        return StandardCard;
    }
  };
  const handleDrag: OnDragHandler = (center: LngLat, bounds: LngLatBounds) => {
    setMapCenter(center);
    setMapBounds(bounds);
    setShowSearchAreaButton(true);
  };

  const searchActions = useSearchActions();
  useEffect(() => {
    verticalKey
      ? (searchActions.setVertical(verticalKey),
        searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(), searchActions.executeUniversalQuery());
  });
  return (
    <>
      <div className=" w-full px-10">
        <SearchBar />
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
            selectedId={verticalKey ?? "all"}
          />
        </div>
        {cardType === "FacilityCard" ? (
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
                CardComponent={getCardType(cardType)}
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
        ) : (
          <div className="flex mt-4">
            <div className="w-56 shrink-0 mr-5">
              <StandardFacets />
            </div>
            <div className="flex-grow">
              <div className="flex items-baseline">
                <ResultsCount />
                <AppliedFilters />
              </div>
              <VerticalResults
                CardComponent={getCardType(cardType)}
                customCssClasses={{
                  verticalResultsContainer: "flex flex-col gap-4 ",
                }}
              />
              <Pagination />
              <LocationBias />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;
