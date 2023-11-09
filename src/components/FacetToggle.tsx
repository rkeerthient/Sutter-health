import {
  Matcher,
  NumberRangeValue,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import classNames from "classnames";

interface TileFacetProps {
  fieldId: string;
  displayName?: string;
}

const ToggleFacet = ({
  fieldId,
  displayName,
}: TileFacetProps): JSX.Element | null => {
  const [enabled, setEnabled] = useState(false);
  const searchActions = useSearchActions();
  const facet = useSearchState((state) =>
    state.filters.facets?.find((f) => f.fieldId === fieldId)
  );

  const handleToggleChange = () => {
    setEnabled((prevEnabled) => {
      const newEnabled = !prevEnabled;
      handleFacetClick(fieldId, newEnabled);
      return newEnabled;
    });
  };

  const handleFacetClick = (
    value: string | number | boolean | NumberRangeValue,
    selected: boolean,
    matcher = Matcher.Equals
  ) => {
    console.log(fieldId, { matcher, value }, selected);

    searchActions.setFacetOption(fieldId, { matcher, value }, selected);
    searchActions.executeVerticalQuery();
  };

  return facet && facet.options.length > 0 ? (
    <div className="mb-4">
      <Switch
        checked={enabled}
        onChange={handleToggleChange}
        className={classNames(
          `${enabled ? "bg-teal-900" : "bg-teal-700"}
            relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            `${enabled ? "translate-x-9" : "translate-x-0"}
              pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`
          )}
        />
      </Switch>
      <span className="font-bold">{displayName ?? facet.displayName}</span>
      <div key={facet.fieldId} className="w-72 mt-6 flex flex-wrap">
        {facet.options.map((o, i) => (
          <div
            key={`${fieldId}_${i}`}
            className={classNames(
              "mr-3 mb-3 border border-toast-orange md:hover:bg-[#FFB563] hover:cursor-pointer",
              {
                "bg-[#FFB563]": o.selected,
                "bg-[#FFEEDB]": !o.selected,
              }
            )}
            onClick={() => handleFacetClick(o.value, !o.selected)}
          >
            <div className="px-3 text-sm inline-block">
              <span className="mr-0.5">{o.displayName}</span>
              <span className="text-xs">{`(${o.count})`}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : null;
};

export default ToggleFacet;
