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
import Hours from "../components/hours";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import Address from "../components/Address";
import FormatPhone from "../components/FormatPhone";
import { LexicalRichText } from "@yext/react-components";
import Carousel from "../components/Carousel";
import PageBreadcrumb from "../components/pageBreadcrumb";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "yextDisplayCoordinate",
      "services",
      "photoGallery",
      "frequentlyAskedQuestions",
      "c_cRichTextDesc",
      "c_disabilityServices",
      "c_servicesfacility.name",
      "c_servicesfacility.slug",
      "c_servicesfacility.c_imageUrl",
      "c_docToLoc.name",
      "c_docToLoc.slug",
      "c_docToLoc.headshot",
      "c_docToLoc.c_speciality",
      "c_affiliations",
      "dm_directoryParents.meta",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.photoGallery",
      "dm_directoryParents.yextDisplayCoordinate.latitude",
      "dm_directoryParents.yextDisplayCoordinate.longitude",
      "dm_directoryParents.dm_directoryChildren.yextDisplayCoordinate.latitude",
      "dm_directoryParents.dm_directoryChildren.yextDisplayCoordinate.longitude",
      "dm_directoryParents.dm_directoryChildren.photoGallery",
      "dm_directoryParents.dm_directoryChildren.name",
      "dm_directoryParents.dm_directoryChildren.address",
      "dm_directoryParents.dm_directoryChildren.hours",
      "dm_directoryParents.dm_directoryChildren.slug",
      "dm_directoryParents.dm_directoryChildren.timezone",
      "dm_directoryParents.dm_directoryChildren.mainPhone",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["healthcareFacility"],
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
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
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
const Location: Template<TemplateRenderProps> = ({ document }) => {
  const {
    name,
    address,
    hours,
    mainPhone,
    yextDisplayCoordinate,
    photoGallery,
    frequentlyAskedQuestions,
    c_cRichTextDesc,
    c_disabilityServices,
    c_servicesfacility,
    c_docToLoc,
    c_affiliations,
    dm_directoryParents,
  } = document;

  return (
    <PageLayout>
      <div className="space-y-12">
        <div className="bg-[#f5f5f4] pt-4">
          <PageBreadcrumb
            paths={[
              { label: "Home", url: "/" },
              {
                label: "Find a Locations",
                url: "/search.html?vertical=healthcare_facilities",
              },
              { label: name, url: "" },
            ]}
          ></PageBreadcrumb>
        </div>
        <div className="centered-container ">
          <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold">{name}</h1>
            <div className="grid grid-cols-2 justify-between items-start">
              <div className="grid grid-cols-2">
                {photoGallery && <Image image={photoGallery[0]}></Image>}
                <div className="flex flex-col gap-5">
                  <Address address={address}></Address>
                  <div className=" hover:cursor-pointer">
                    <FormatPhone phoneNumber={mainPhone}></FormatPhone>
                  </div>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${yextDisplayCoordinate.latitude},${yextDisplayCoordinate.longitude}`}
                    className="px-4 w-fit py-2 bg-[#008080] text-white font-bold text-sm uppercase  rounded-md"
                  >
                    Map & Directions
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div className="text-gray-500 font-bold border-b-2">
                    NETWORK AFFILIATION
                  </div>
                  <div>
                    This location is part of Sutter Health's {c_affiliations}
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-gray-500 font-bold border-b-2">
                    HOURS:
                  </div>
                  <div>{hours && <Hours title={""} hours={hours} />}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#008080] py-5 ">
          <div className="text-3xl text-white centered-container">
            Please call {mainPhone} to schedule an appointment.
          </div>
        </div>
        {c_cRichTextDesc && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              About {name}
            </div>
            <div className="flex-1">
              <LexicalRichText
                serializedAST={JSON.stringify(c_cRichTextDesc.json)}
              />
            </div>
          </div>
        )}
        {frequentlyAskedQuestions && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Frequently Asked Questions
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {frequentlyAskedQuestions.map((item, index) => (
                <div key={index}>
                  <div className="font-normal text-xl">{item.question}</div>
                  <div>{item.answer}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        {c_disabilityServices && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Disability Services
            </div>
            <div className="flex-1">
              <LexicalRichText
                serializedAST={JSON.stringify(c_disabilityServices.json)}
              />
            </div>
          </div>
        )}
        {c_servicesfacility && (
          <div className="my-4 max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Services Offered
            </div>
            <div className="w-4/5">
              <Carousel
                data={c_servicesfacility}
                slidesToShow={4}
                type="service"
              />
            </div>
          </div>
        )}
        {c_docToLoc && (
          <div className="my-4 max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Doctors
            </div>
            <div className="w-4/5">
              <Carousel data={c_docToLoc} slidesToShow={3} type="doctor" />
            </div>
          </div>
        )}
        <div className="my-4 max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
          <div className="font-bold w-1/5 text-2xl text-[#008080]">
            Nearby Facilities
          </div>
          <div className="w-4/5">
            <Carousel
              data={dm_directoryParents.filter(
                (item: any) => item.meta.entityType.id === "ce_city"
              )}
              slidesToShow={4}
              type="facility_nearby"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Location;
