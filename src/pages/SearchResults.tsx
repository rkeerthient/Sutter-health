import { useEffect, useState } from "react";
import { SearchBar } from "@yext/search-ui-react";
import * as React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { twMerge } from "tailwind-merge";
import FacilitiesPage from "../components/Pages/FacilitiesPage";
import ServicePage from "../components/Pages/ServicesPage";
import ProfessionalPage from "../components/Pages/ProfessionalPage";
import UniversalResult from "../components/Pages/UniversalResults";
import { useSearchActions } from "@yext/search-headless-react";

const SearchResults = () => {
  const searchActions = useSearchActions();
  const [currentPath, setCurrentPath] = useState({
    label: "All Results",
    id: "all",
  });

  const navbarItem = [
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
  ];

  useEffect(() => {
    console.log(currentPath);

    const queryParams = new URLSearchParams(window.location.search);
    currentPath.id !== "all"
      ? queryParams.set("vertical", currentPath.id)
      : queryParams.delete("vertical");
    history.pushState(null, "", "?" + queryParams.toString());
  }, [currentPath]);

  useEffect(() => {
    const verticalKey = new URLSearchParams(window.location.search).get(
      "vertical"
    );
    const query = new URLSearchParams(window.location.search).get("query");
    verticalKey &&
      (setCurrentPath(navbarItem.filter((item) => item.id === verticalKey)[0]),
      searchActions.setVertical(verticalKey));
    query && searchActions.setQuery(query);
    searchActions.executeVerticalQuery();
  }, []);
  return (
    <>
      <div className=" w-full px-10 ">
        <SearchBar />
        <div className=" bg-white">
          <div className="mx-auto ">
            <div className="h-16 justify-between border-b hidden sm:flex ">
              <div className="ml-6 flex justify-between flex-1">
                {navbarItem.map((item) => (
                  <button
                    key={item.id}
                    className={twMerge(
                      `inline-flex items-center px-1 pt-1 border-transparent hover:border-primary-green border-b-2 text-sm font-medium`,
                      currentPath.id === item.id && "border-primary-green"
                    )}
                    onClick={() => setCurrentPath(item)}
                  >
                    <div className="font-bold">{item.label ?? item.id}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        {currentPath && currentPath.id === "healthcare_professionals" ? (
          <ProfessionalPage verticalKey={currentPath.id} />
        ) : currentPath.id === "healthcare_facilities" ? (
          <FacilitiesPage verticalKey={currentPath.id} />
        ) : currentPath.id === "services" ? (
          <ServicePage verticalKey={currentPath.id} />
        ) : (
          <UniversalResult />
        )}
      </div>
    </>
  );
};

export default SearchResults;
