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
import { useSearchActions } from "@yext/search-headless-react";
import Loader from "../Loader";

const UniversalResult = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const searchActions = useSearchActions();
  React.useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const query = urlSearchParams.get("query");
    query && searchActions.setQuery(query);
    searchActions.setUniversal();
    searchActions.executeUniversalQuery().then(() => setIsLoading(false));
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
            <DirectAnswer />
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
