import * as React from "react";
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
    $id: "root",
    filter: {
      savedFilterIds: ["dm_healthcareFacilityDirectory"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.c_addressRegionDisplayName",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return `root.html`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: "Home Page",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          description:
            "This is a description for the Turtlehead Tacos directory home page.",
        },
      },
    ],
  };
};

const Index: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
}) => {
  const { _site, dm_directoryChildren } = document;

  var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
    var a = a.name,
      b = b.name;
    return a < b ? -1 : a > b ? 1 : 0;
  });
  const childrenDivs = dm_directoryChildren.map((entity: any) => (
    <div>
      <a
        key="uRL"
        href={relativePrefixToRoot + entity.slug}
        className="font-bold text-2xl text-[#008080] hover:underline"
      >
        {entity.c_addressRegionDisplayName} ({entity.dm_directoryChildrenCount})
      </a>
    </div>
  ));

  return (
    <>
      <PageLayout _site={_site}>
        <BannerNew text="Index Page" />
        <div className="centered-container">
          <BreadCrumbs name="Home" baseUrl={relativePrefixToRoot} />
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

export default Index;
