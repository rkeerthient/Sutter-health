import { FilterSearch, OnSelectParams } from "@yext/search-ui-react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import * as React from "react";
import InsuranceCardIcon from "./Icons/InsuranceCardIcon";
import LocationPinIcon from "./Icons/LocationPinIcon";
import SpecialtyIcon from "./Icons/SpecialtyIcon";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";

interface DoctorFilterSearchProps {
  // for closing the mobile search panel
  onSearchClick?: () => void;
  navigateOnSearch?: boolean;
}

// TODO: Add Icons next search queries
const DoctorFilterSearch = ({
  onSearchClick,
  navigateOnSearch,
}: DoctorFilterSearchProps) => {
  const [service, setService] = useState("");
  const [locationDisplayName, setLocationDisplayName] = useState("");
  const [language, setLanguage] = useState("");
  const searchActions = useSearchActions();
  const staticFilters = useSearchState((state) => state.filters.static);
  searchActions.setVertical("healthcare_professionals");

  // const handleSelect = (params: OnSelectParams) => {
  //   console.log("inn");

  //   if (navigateOnSearch) {
  //     const urlParams = new URLSearchParams({});
  //     urlParams.set(`sf_${params.newFilter.fieldId}`, params.newDisplayName);
  //     window.location.href = `/search?${urlParams.toString()}`;
  //   } else {
  //     staticFilters?.filter((sf) => console.log(sf.filter.fieldId)) ?? [];

  //     const filteredFilters =
  //       staticFilters?.filter(
  //         (sf) => sf.filter.fieldId !== params.newFilter.fieldId
  //       ) ?? [];
  //     console.log(JSON.stringify(filteredFilters));

  //     searchActions.setStaticFilters([
  //       ...filteredFilters,
  //       {
  //         filter: params.newFilter,
  //         selected: true,
  //         displayName: params.newDisplayName,
  //       },
  //     ]);

  //     searchActions.executeVerticalQuery();
  //   }
  // };

  // const handleSearchClick = () => {
  //   onSearchClick && onSearchClick();
  //   searchActions.executeVerticalQuery();
  // };

  return (
    <div className="hidden z-0 justify-center bg-stone-300 lg:flex text-left ">
      <div className="px-4 py-8 lg:flex lg:items-center">
        <div className="px-8 py-2 bg-white flex rounded-[100px]">
          <div className="flex items-center">
            <SpecialtyIcon />
          </div>
          <FilterSearch
            placeholder="Condition, procedure, doctor"
            sectioned
            customCssClasses={{
              filterSearchContainer: "relative mb-0 lg:flex lg:items-center",
              inputElement:
                "rounded-none border-0 border-r py-6 placeholder:text-disabled-gray w-80",
              option: "py-2 px-4",
              highlighted: "text-blue text-sm",
              nonHighlighted: "text-sm",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setService(params.newDisplayName);
            }}
            searchFields={[
              {
                fieldApiName: "c_speciality",
                entityType: "healthcareProfessional",
              },
              {
                fieldApiName: "name",
                entityType: "healthcareProfessional",
              },
            ]}
          />
          <div className="flex items-center ml-8">
            <LocationPinIcon />
          </div>
          <FilterSearch
            placeholder="City, state, or zip code"
            customCssClasses={{
              filterSearchContainer: "mb-0 block lg:flex lg:items-center",
              inputElement:
                "rounded-none py-6 border-0 border-r placeholder:text-disabled-gray w-80",
              option: "py-2 px-4",
              highlighted: "text-blue text-sm",
              nonHighlighted: "text-sm",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setLocationDisplayName(params.newDisplayName);
            }}
            searchFields={[
              {
                fieldApiName: "builtin.location",
                entityType: "healthcareProfessional",
              },
            ]}
          />
          <div className="flex items-center ml-8">
            <InsuranceCardIcon />
          </div>
          <FilterSearch
            placeholder="Languages known"
            customCssClasses={{
              filterSearchContainer: "mb-0 lg:flex lg:items-center",
              inputElement:
                "rounded-none py-6 border-0 placeholder:text-disabled-gray w-80",
              option: "py-2 px-4",
              highlighted: "text-blue text-sm",
              nonHighlighted: "text-sm",
              sectionLabel: "text-lg",
            }}
            onSelect={(params) => {
              setLanguage(params.newDisplayName);
            }}
            searchFields={[
              {
                fieldApiName: "languages",
                entityType: "healthcareProfessional",
              },
            ]}
          />
          <button className="bg-green-700 flex justify-center items-center p-1  my-auto rounded-full">
            <MagnifyingGlassIcon className="h-6 w-6 text-white " />
            <p className="text-white text-sm ml-2 lg:hidden">Search</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorFilterSearch;
