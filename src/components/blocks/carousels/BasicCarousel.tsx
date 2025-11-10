"use client";

import React, { useEffect } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { DynamicZoneProps } from "@/typings/common";

interface BasicCarouselProps {
  options?: EmblaOptionsType;
  block: DynamicZoneProps;
}

const BasicCarousel: React.FC<BasicCarouselProps> = ({ options, block }) => {
  const { Title, Items } = block;

  // Default options (no auto-scroll)
  const defaultOptions: EmblaOptionsType = {
    loop: true,
    align: "start",
    dragFree: false,
    containScroll: "trimSnaps",
    ...options,
  };

  const [emblaRef] = useEmblaCarousel(defaultOptions);

  useEffect(() => {
    // Nothing needed since auto scroll is removed
  }, []);

  return (
    <section className="py-16 pl-6 md:pl-10">
      {Title && (
        <h2 className="font-swearDisplay mb-10 text-center">
          {Title}
        </h2>
      )}

      <div className="embla">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6 md:gap-10 lg:gap-20">
            {Items?.map((item: any) => (
              <div
                key={item.id}
                className="embla__slide w-[100%] flex-shrink-0 overflow-hidden sm:w-[70%] md:w-[40%] lg:w-[25%]"
              >
                <div className="relative h-96 w-full">
                  <Image
                    src="/images/image.jpg"
                    alt={item.Designation || "Board position"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-6 text-start">
                  <h4 className="font-medium text-gray-900">
                    {item.Designation}
                  </h4>
                  <p className="font-thin text-gray-600">{item.Timeline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BasicCarousel;
