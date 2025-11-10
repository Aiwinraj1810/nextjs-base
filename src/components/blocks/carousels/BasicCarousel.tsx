"use client";

import React, { useEffect, useState } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";
import { DynamicZoneProps } from "@/typings/common";

interface BasicCarouselProps {
  options?: EmblaOptionsType;
  block: DynamicZoneProps;
}

const BasicCarousel: React.FC<BasicCarouselProps> = ({ options, block }) => {
  const { Title, Items } = block;

  const defaultOptions: EmblaOptionsType = {
    loop: true,
    align: "start",
    ...options,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions, [
    AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      speed: 1,
    }),
  ]);

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on("autoScroll:play", () => setIsPlaying(true))
      .on("autoScroll:stop", () => setIsPlaying(false))
      .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
  }, [emblaApi]);

  return (
    <section className="py-16">
      {Title && <h2 className="mb-10 text-center">{Title}</h2>}

      <div className="embla">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex gap-6">
            {Items?.map((item: any) => (
              <div
                className="embla__slide min-w-[70%] flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg md:min-w-[30%]"
                key={item.id}
              >
                <div className="relative h-56 w-full">
                  <Image
                    src="/images/image.jpg"
                    alt={item.Designation || "Board position"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 p-6 text-center">
                  <h5 className="= font-semibold text-gray-900">
                    {item.Designation}
                  </h5>
                  <p className=" text-gray-600">{item.Timeline}</p>
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
