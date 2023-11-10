/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import Carousel from "../components/Carousel";
import { LexicalRichText } from "@yext/react-components";
import PageBreadcrumb from "../components/pageBreadcrumb";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-ser",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "c_imageUrl",
      "shortDescriptionV2",
      "richTextDescriptionV2",
      "c_servicesfacility.name",
      "c_servicesfacility.slug",
      "c_servicesfacility.photoGallery",
      "c_servicesfacility.address",
      "c_servicesfacility.yextDisplayCoordinate",
      "c_servicesdoctors.name",
      "c_servicesdoctors.slug",
      "c_servicesdoctors.headshot",
      "c_servicesdoctors.c_speciality",
      "c_servicesservices.name",
      "c_servicesservices.c_imageUrl",
      "c_servicesservices.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_services"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : ` ${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
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
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Service: Template<TemplateRenderProps> = ({ document }) => {
  const {
    c_imageUrl,
    name,
    c_servicesfacility,
    shortDescriptionV2,
    richTextDescriptionV2,
    c_servicesdoctors,
    c_servicesservices,
  } = document;

  return (
    <PageLayout>
      <div className="space-y-8 text-lg">
        <div className="bg-[#f5f5f4] pt-4">
          <PageBreadcrumb
            paths={[
              { label: "Home", url: "/" },
              {
                label: "Find a service",
                url: "search.html?vertical=services",
              },
              { label: name, url: "" },
            ]}
          ></PageBreadcrumb>
        </div>
        <div className="centered-container  flex flex-row gap-16">
          <div className="flex flex-col gap-4 w-1/2">
            <h1 className="text-4xl font-bold">{name}</h1>
            {shortDescriptionV2 && (
              <div>
                <LexicalRichText
                  serializedAST={JSON.stringify(shortDescriptionV2.json)}
                />
              </div>
            )}
          </div>
          <div>{c_imageUrl && <img src={c_imageUrl}></img>}</div>
        </div>
        {c_servicesservices && (
          <div className=" max-w-screen-2xl mx-auto w-full flex gap-8 centered-container">
            <div className="font-bold w-1/5 text-xl">Featured Services</div>
            <div className="w-4/5">
              <Carousel
                data={c_servicesservices}
                slidesToShow={4}
                type="service"
              />
            </div>
          </div>
        )}
        {richTextDescriptionV2 && (
          <div className=" max-w-screen-2xl mx-auto flex gap-8 centered-container">
            <div className="font-bold w-1/5 text-xl">About</div>
            <div className="flex-1 flex flex-col gap-4">
              <LexicalRichText
                serializedAST={
                  richTextDescriptionV2 &&
                  JSON.stringify(richTextDescriptionV2.json)
                }
              />
            </div>
          </div>
        )}
      </div>
      {c_servicesdoctors && (
        <div className=" max-w-screen-2xl mx-auto w-full flex gap-8 centered-container">
          <div className="font-bold w-1/5 text-xl">Doctor Profiles</div>
          <div className="w-4/5">
            <Carousel data={c_servicesdoctors} slidesToShow={4} type="doctor" />
          </div>
        </div>
      )}
      {c_servicesfacility && (
        <div className=" max-w-screen-2xl mx-auto w-full flex gap-8 centered-container">
          <div className="font-bold w-1/5 text-lg">Services Near You</div>
          <div className="w-4/5">
            <Carousel
              data={c_servicesfacility}
              slidesToShow={4}
              type="facility_nearby"
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Service;
