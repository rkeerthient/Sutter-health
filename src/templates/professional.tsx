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
import { Image } from "@yext/pages/components";
import Address from "../components/Address";
import Carousel from "../components/Carousel";
import FormatPhone from "../components/FormatPhone";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import PageBreadcrumb from "../components/pageBreadcrumb";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-hp",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "slug",
      "geocodedCoordinate",
      "photoGallery",
      "languages",
      "headshot",
      "frequentlyAskedQuestions",
      "c_cRichTextDesc",
      "c_disabilityServices",
      "c_docToLoc.name",
      "c_docToLoc.yextDisplayCoordinate",
      "c_docToLoc.address",
      "c_docToLoc.slug",
      "c_docToLoc.headshot",
      "c_docToLoc.c_speciality",
      "c_servicesdoctors.name",
      "c_servicesdoctors.slug",
      "c_servicesdoctors.c_imageUrl",
      "c_servicesdoctors.c_speciality",
      "c_nearByDocs.name",
      "c_nearByDocs.slug",
      "c_nearByDocs.headshot",
      "c_nearByDocs.c_speciality",
      "c_affiliations",
      "c_communityActivities",
      "c_additionalInformation",
      "c_personalInterests",
      "c_philosophyOfCare",
      "c_professionalInterest",
      "c_professionalInterest1",
      "c_publications",
      "c_rating",
      "c_votes",
      "acceptingNewPatients",
      "c_speciality",
      "c_credentialsAndNotables",
      "certifications",
      "c_myHealthOnline",
      "c_videoVisits",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["healthcareProfessional"],
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
    address,
    headshot,
    mainPhone,
    c_docToLoc,
    c_servicesdoctors,
    c_nearByDocs,
    c_affiliations,
    c_additionalInformation,
    c_personalInterests,
    c_philosophyOfCare,
    c_professionalInterest,
    c_professionalInterest1,
    languages,
    c_credentialsAndNotables,
    certifications,
    name,
    c_speciality,
    acceptingNewPatients,
    c_myHealthOnline,
    c_videoVisits,
  } = document;

  return (
    <PageLayout>
      <div className="space-y-12  text-lg">
        <div className="bg-[#f5f5f4] pt-4">
          <PageBreadcrumb
            paths={[
              { label: "Home", url: "/" },
              {
                label: "Find a doctor",
                url: "/search.html?vertical=healthcare_professionals",
              },
              { label: name, url: "" },
            ]}
          ></PageBreadcrumb>
        </div>

        <div className="centered-container border-b-2 pb-2">
          <div className="flex flex-row gap-16">
            {headshot ? (
              <Image image={headshot}></Image>
            ) : (
              <img
                src="https://www.sutterhealth.org/assets/img/dr-profiles/default-dr-profile.png"
                alt=""
              />
            )}
            <div className="flex flex-col gap-4 w-2/4">
              <h1 className="text-4xl font-bold">{name}</h1>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <div>
                    <Address address={address}></Address>
                  </div>
                  <div>
                    <FormatPhone phoneNumber={mainPhone}></FormatPhone>
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className="text-lg font-bold flex gap-1 flex-col">
                    {c_speciality.map((item, index) => (
                      <div key={index}>{item}</div>
                    ))}
                  </div>
                  <div className="flex gap-1 items-center">
                    {acceptingNewPatients ? (
                      <CheckIcon className="h-4 w-4 text-[#008080]" />
                    ) : (
                      <XMarkIcon className="h-4 w-4 text-red-600" />
                    )}
                    <div>Accepting New Patients</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    {c_myHealthOnline ? (
                      <CheckIcon className="h-4 w-4 text-[#008080]" />
                    ) : (
                      <XMarkIcon className="h-4 w-4 text-red-600" />
                    )}
                    <div>My Health Online</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    {c_videoVisits ? (
                      <CheckIcon className="h-4 w-4 text-[#008080]" />
                    ) : (
                      <XMarkIcon className="h-4 w-4 text-red-600" />
                    )}
                    <div>Video Visits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {c_professionalInterest && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Professional Interests
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1  gap-4">
                {c_professionalInterest.replace('"', "")}
              </div>
              {c_professionalInterest1 && (
                <div className="flex-1  gap-4">
                  {c_professionalInterest1.replace('"', "")}
                </div>
              )}
            </div>
          </div>
        )}
        {c_affiliations && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Affiliations
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 grid grid-cols-3 gap-4">
                {c_affiliations.map((item, index) => (
                  <div key={index} className="border-t">
                    {item.replaceAll('"', "")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {c_docToLoc && (
          <div className=" max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Practice Locations
            </div>
            <div className="w-4/5">
              <Carousel data={c_docToLoc} slidesToShow={3} type="facility" />
            </div>
          </div>
        )}
        {certifications && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Board Certifications
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 grid grid-cols-4 gap-4">
                {certifications.map((item, index) => (
                  <div key={index} className="border-t">
                    {item.replaceAll('"', "")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {certifications && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Credentials & Notables
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex-1 grid grid-cols-4 gap-4">
                {c_credentialsAndNotables.map((item, index) => (
                  <div key={index} className="border-t">
                    {item.replaceAll('"', "")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {languages && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Languages
            </div>

            <div className="flex-1 grid grid-cols-4 gap-4">
              {languages.map((item, index) => (
                <div key={index} className="border-t">
                  {item.replaceAll('"', "")}
                </div>
              ))}
            </div>
          </div>
        )}
        {c_additionalInformation && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Additional Information
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {c_additionalInformation}
            </div>
          </div>
        )}
        {c_personalInterests && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Personal Interests
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {c_personalInterests}
            </div>
          </div>
        )}
        {c_philosophyOfCare && (
          <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Philosophy of Care
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {c_philosophyOfCare}
            </div>
          </div>
        )}
        {c_nearByDocs && (
          <div className=" max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Physicians Nearby
            </div>
            <div className="w-4/5">
              <Carousel data={c_nearByDocs} slidesToShow={3} type="doctor" />
            </div>
          </div>
        )}
        {c_servicesdoctors && (
          <div className=" max-w-screen-2xl mx-auto w-full flex gap-6 centered-container">
            <div className="font-bold w-1/5 text-2xl text-[#008080]">
              Related Service Lines
            </div>
            <div className="w-4/5">
              <Carousel
                data={c_servicesdoctors}
                slidesToShow={4}
                type="service"
              />
            </div>
          </div>
        )}
        <div className=" max-w-screen-2xl mx-auto flex gap-6 centered-container">
          <div className="font-bold w-1/5 text-2xl text-[#008080]">
            Disclaimer
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div>
              This physician directory is provided as a convenience to you. It
              is not intended as a recommendation, referral or endorsement of
              any particular provider. Physicians are not employees or agents of
              Sutter Health or its affiliates. The information is submitted by
              each doctor and we make no guarantee or warranty as to the
              accuracy of the information. Sutter Health is not responsible for
              any loss or damage caused by your reliance on this information.
              You should verify the accuracy of the information directly with
              the physician's office.
              <div>
                All doctors on this site are affiliated with Sutter's network of
                care - members of the medical staff of Sutter-affiliated
                hospitals, affiliated medical groups, and independent practice
                associations that participate in clinical initiatives. Doctors
                do not pay a fee to be included in this directory. If a
                physician ceases to fall within one of the categories noted,
                he/she would no longer be listed on the site. Doctors meeting
                your search criteria are presented in alphabetical order by last
                name, or by geographic proximity if a zip code has been used as
                search criterion. Find out more about star ratings.
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Location;
