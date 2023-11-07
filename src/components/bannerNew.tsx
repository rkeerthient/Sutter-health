import * as React from "react";

type BannerNew = {
  text?: string;
  children?: React.ReactNode;
};

const BannerNew = (props: BannerNew) => {
  const { text, children } = props;

  return (
    <>
      <div className="relative bg-indigo-500">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover"
            src="https://www.sutterhealth.org/images/homepage/father-daughter-oe-banner-1920x475.jpg"
            alt=""
          />
          <div
            className="absolute inset-0 bg-gray-200  mix-blend-multiply"
            aria-hidden="true"
          />
        </div>
        <div
          style={{ textShadow: "0 2px 4px rgba(3,3,3,.42)" }}
          className="section relative mx-auto max-w-7xl  py-24 px-4 sm:py-32 sm:px-6 lg:px-8"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Shutter Health Directory
          </h1>
          <p className="mt-6 max-w-3xl text-xl text-indigo-100">
            Dive into a realm of healthcare solutions, encompassing a spectrum
            of services from personalized wellness plans to advanced medical
            insights. Devoted to your health and well-being, we offer secure and
            intuitive access to our healthcare offerings. Uncover the journey to
            a healthier future right here.
          </p>
        </div>
      </div>
    </>
  );
};

export default BannerNew;
