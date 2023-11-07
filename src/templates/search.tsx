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
import { useEffect, useState } from "react";
import ProfessionalCard from "../components/Cards/ProfessionalCard";
import { CardComponent, StandardCard } from "@yext/search-ui-react";

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
  return (
    <>
      <PageLayout>
        <div className="max-w-screen-2xl mx-auto px-20">
          <SearchResults></SearchResults>
        </div>
      </PageLayout>
    </>
  );
};

export default Search;
