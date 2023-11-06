/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { SearchBar } from "@yext/search-ui-react";
import { Link } from "react-router-dom";
import SearchResults from "../pages/SearchResults";
import NavBar from "../components/NavBar";
import { useState } from "react";

export const config: TemplateConfig = {
  name: "search",
};

export const getPath = () => {
  return `search.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Sutter | Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

const Search: Template<TemplateRenderProps> = ({ document }) => {
  const [verticalKey, setVerticalKey] = useState("");
  const handleClick = (id: string) => {
    setVerticalKey(id);
  };
  return (
    <>
      <PageLayout>
        <div className="centered-container">
          <div className="section w-full px-10">
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
            <SearchResults
              vertKey={verticalKey}
              isUniversal={false}
            ></SearchResults>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Search;