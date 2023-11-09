import * as React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Image } from "@yext/react-components";
import Address from "./Address";
import StaticMap from "./static-map";

const Carousel = (props: any) => {
  const { data, type } = props;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: props.slidesToShow,
    slidesToScroll: 1,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {data &&
        data.map((item: any, index: any) => {
          return type === "doctor" ? (
            <div key={index} className="p-4 font-normal border">
              {item.headshot ? (
                <div className="w-20 h-20 overflow-hidden rounded-full    ">
                  <Image
                    image={item.headshot}
                    className="  max-w-full h-auto align-middle flex-shrink-0 rounded-full"
                  ></Image>
                </div>
              ) : (
                <div className="w-20 h-20 overflow-hidden rounded-full    ">
                  <img
                    src="https://www.sutterhealth.org/assets/img/dr-profiles/default-dr-profile.png"
                    alt=""
                    className=" max-w-full h-auto align-middle flex-shrink-0 rounded-full"
                  />
                </div>
              )}
              <a
                key={index}
                href={`/${item.slug}`}
                className="text-[#008080] my-2 font-bold text-lg"
              >
                {item.name}
              </a>
              <div className="">{item.c_speciality}</div>
            </div>
          ) : type === "facility" ? (
            <div
              key={index}
              className="p-4 flex-col flex justify-between leading-6 font-normal"
            >
              <StaticMap
                latitude={item.yextDisplayCoordinate.latitude}
                longitude={item.yextDisplayCoordinate.longitude}
              ></StaticMap>
              <a
                key={index}
                href={`/${item.slug}`}
                className="text-[#008080] my-2 font-bold"
              >
                {item.name}
              </a>
              <div>
                <Address address={item.address} />
              </div>
            </div>
          ) : (
            <div
              key={index}
              className="p-4 flex-col flex justify-between leading-6 font-normal"
            >
              {item.c_imageUrl ? (
                <img src={item.c_imageUrl}></img>
              ) : (
                <img
                  className="object-fit object-center max-w-[584px] w-full border"
                  src="https://dummyimage.com/640x360/fff/aaa"
                  alt=""
                />
              )}
              <div className=" mt-4 text-[#008080] font-bold text-xs">
                <a
                  key={index}
                  href={`/${item.slug}`}
                  className="text-[#008080] my-2 font-bold"
                >
                  {item.name}
                </a>
              </div>
            </div>
          );
        })}
    </Slider>
  );
};

export default Carousel;
