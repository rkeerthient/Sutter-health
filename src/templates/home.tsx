import "../index.css";
import {
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateRenderProps,
  TemplateConfig,
} from "@yext/pages";

import { Image } from "@yext/sites-components";
import { Button } from "@yext/sites-react-components";
import * as React from "react";
import PageLayout from "../components/page-layout";
import PhotoHero from "../components/PhotoHero";
import DoctorFilterSearch from "../components/DoctorFilterSearch";
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-home",
    fields: [
      "id",
      "uid",
      "meta",
      "slug",
      "c_homeToServices.name",
      "c_homeToServices.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityIds: ["home"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = () => {
  return "index.html";
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Home = ({ document }: TemplateRenderProps) => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <PhotoHero
          image={
            "https://dynl.mktgcdn.com/p/wdRXBYkrYiL7ZkuJZZb7T_lrwTdEJvOlb0w9ZPFnXws/1920x1280"
          }
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-white text-center text-[84px] font-extrabold leading-[108px]">
              Find Care at Sutter Health{" "}
            </h1>
            <p className="text-white text-xl font-normal mb-6">
              Your Health, Your Way – Discover Top Doctors Now
            </p>
            <DoctorFilterSearch navigateOnSearch />
          </div>
        </PhotoHero>
        <div className="centered-container mt-6 space-y-8">
          <div>
            <div className="grid grid-cols-2 w-full gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2283&q=80"
                className="object-cover w-100% lg:aspect-video my-auto"
              />
              <div className="flex gap-2 justify-center flex-col">
                <div className="self-stretch text-zinc-900 text-2xl font-medium leading-[56px]">
                  Get the Right Care for You
                </div>
                <p className="self-stretch text-neutral-500 font-normal  ">
                  Get the Right Care for You is your personalized healthcare
                  companion, simplifying the complex world of medical choices.
                  This user-friendly platform utilizes advanced algorithms to
                  analyze your health profile and preferences, offering tailored
                  recommendations for doctors, specialists, and alternative
                  therapies. It's more than a directory; it's a transparent
                  guide, providing insights into care quality and patient
                  reviews. Connecting you with the most suitable healthcare
                  options, this platform empowers you to make informed decisions
                  about your well-being, ensuring a proactive and personalized
                  approach to your health journey. Take control and connect with
                  the right care effortlessly with "Get the Right Care for You.
                  healthcare provider.
                </p>
                <Button color="primary" href="/guided-doctor-finder">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex-col justify-center items-start gap-2 inline-flex">
                <div className="self-stretch text-zinc-900 text-2xl font-medium leading-[56px]">
                  800+ Locations Nationwide
                </div>
                <div className="self-stretch text-neutral-500   font-normal  ">
                  Get the Right Care for You is your nationwide healthcare
                  companion, spanning over 800 locations. This user-friendly
                  platform simplifies healthcare decisions, utilizing advanced
                  algorithms to analyze your health profile and preferences.
                  Whether you're in search of a primary care physician,
                  specialists, or alternative therapies, the platform provides
                  tailored recommendations. It goes beyond a directory, offering
                  transparency with insights into care quality and patient
                  reviews. Connecting you with the most suitable healthcare
                  options across the nation, this platform empowers you to make
                  informed decisions about your well-being. Take control of your
                  health journey effortlessly with "Get the Right Care for You"
                  in over 800 locations nationwide.
                </div>
                {/* <Button color="primary" href={c_locationHero.cta.link}> */}
                <Button color="primary">Find a location</Button>
              </div>
              <div className="p-10 flex-col justify-center items-center gap-2.5 inline-flex">
                <img
                  src="https://dynl.mktgcdn.com/p/lN3v4vBPbm2m_WybKM5OlFkPdPuvUdNW28QBsRnt_sQ/1920x1279"
                  className="self-start"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 w-full gap-6">
              <img
                src="https://dynl.mktgcdn.com/p/X2DSaLzyXeYBuzSkTfLR73e9zwWOLhYThVmsUhmxCjc/1920x1279"
                className="object-cover w-100% lg:aspect-video my-auto"
              />
              <div className="flex gap-2 justify-center flex-col">
                <div className="self-stretch text-zinc-900 text-2xl font-medium leading-[56px]">
                  Dedicated Healthcare When You Need It
                </div>
                <p className="self-stretch text-neutral-500  font-normal  ">
                  Dedicated Healthcare When You Need It is your reliable
                  companion for personalized health solutions. This platform,
                  available whenever and wherever you need it, streamlines
                  healthcare decisions with advanced algorithms analyzing your
                  health profile and preferences. Whether you seek a primary
                  care physician, specialists, or alternative therapies, the
                  platform offers tailored recommendations. Beyond a directory,
                  it provides transparency with insights into care quality and
                  patient reviews. Offering dedicated healthcare options
                  precisely when you need them, this platform empowers you to
                  make informed decisions about your well-being. Take charge of
                  your health journey effortlessly with "Dedicated Healthcare
                  When You Need It."
                </p>
                <Button color="primary" href="/guided-doctor-finder">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="self-stretch  text-zinc-900 text-4xl font-medium leading-[56px] flex justify-center">
              All Treatments and Services
            </div>
            <div className="grid grid-cols-4 gap-4">
              {document.c_homeToServices.map((item, index) => (
                <a
                  key={index}
                  className="bg-white h-[80px] border px-6  text-xl items-center flex justify-start shadow-md hover:border-[#008080]"
                  href={`/${item.slug}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
