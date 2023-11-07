import * as React from "react";
import Banner from "../components/banner";
import BreadCrumbs from "../components/BreadCrumbs";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BannerNew from "../components/bannerNew";
import PageLayout from "../components/page-layout";

export const config: TemplateConfig = {
  stream: {
    $id: "states",
    filter: {
      savedFilterIds: ["dm_healthcareFacilityDirectory_address_region"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "description",
      "c_addressRegionDisplayName",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `${document.slug.toString()}`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description: document.description,
        },
      },
    ],
  };
};

const State: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const {
    _site,
    name,
    description,
    c_addressRegionDisplayName,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name;
    var b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });

  const childrenDivs = dm_directoryChildren.map((entity: any) => (
    <div>
      <a
        key="uRL"
        href={relativePrefixToRoot + entity.slug}
        className="font-bold text-2xl text-[#008080] hover:underline"
      >
        {entity.name} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));

  var updatedDescription;
  if (description && description.includes("United States")) {
    updatedDescription = description.replace(
      "United States",
      "the United States"
    );
  } else {
    updatedDescription = description;
  }

  return (
    <>
      <PageLayout _site={_site}>
        <BannerNew text="Index Page" />
        <div className="centered-container">
          <BreadCrumbs
            name={name}
            parents={dm_directoryParents}
            baseUrl={relativePrefixToRoot}
          />
          <div className="section space-y-14 px-10">
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
              {childrenDivs}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default State;
