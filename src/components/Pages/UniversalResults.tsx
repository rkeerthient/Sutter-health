import * as React from "react";
import {
  DirectAnswer,
  ResultsCount,
  SpellCheck,
  StandardSection,
  UniversalResults,
} from "@yext/search-ui-react";
import ProfessionalCard from "../Cards/ProfessionalCard";
import ProfessionalFacility from "../Cards/ProfessionalFacility";
import Services from "../Cards/Services";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";
import Loader from "../Loader";
import CustomDA from "../CustomDA";

const UniversalResult = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const searchActions = useSearchActions();

  const da = useSearchState((state) => state.directAnswer.result);

  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversal();
    searchActions
      .executeUniversalQuery()
      .then((res) => (console.log(JSON.stringify(res)), setIsLoading(false)));
  }, []);
  const Grid3Section = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-3 gap-1 md:grid-cols-3 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const Grid4Section = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-4 gap-1 md:grid-cols-4 md:gap-8 ">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SpellCheck />
            {/* <DirectAnswer /> */}
            {da ? (
              typeof da.value === "string" ? (
                <DirectAnswer />
              ) : (
                <div className="p-4 border border-gray-200 rounded-lg shadow-sm">
                  <CustomDA
                    data={da.value}
                    className="text-[rgb(75, 85, 99)] font-semibold"
                  />
                  <div className="mt-4">
                    <div className="pt-4 text-neutral flex gap-2 flex-row">
                      <div>
                        <a
                          className="text-primary"
                          href={da.relatedResult.rawData.slug}
                        >
                          {da.relatedResult.name}
                        </a>
                      </div>
                      <div className="flex gap-1">
                        <div>/</div>
                        <div>{da.fieldName}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              ""
            )}

            <ResultsCount />
            <UniversalResults
              verticalConfigMap={{
                healthcare_facilities: {
                  label: "Healthcare Facilities",
                  CardComponent: ProfessionalFacility,
                  SectionComponent: Grid3Section,
                },
                healthcare_professionals: {
                  label: "Healthcare Professionals",
                  CardComponent: ProfessionalCard,
                  SectionComponent: StandardSection,
                },
                services: {
                  label: "Services",
                  CardComponent: Services,
                  SectionComponent: Grid4Section,
                },
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

export default UniversalResult;
