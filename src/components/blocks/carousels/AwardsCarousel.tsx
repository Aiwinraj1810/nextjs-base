"use client";

import React, { useMemo, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { DynamicZoneProps } from "@/typings/common";
import Image from "next/image";

interface AwardsCarouselProps {
  block: DynamicZoneProps;
  options?: EmblaOptionsType;
}

const AwardsCarousel = ({ block, options }: AwardsCarouselProps) => {
  const { title, awardsList } = block;

  const years = useMemo(
    () =>
      Array.from(new Set(awardsList.map((award: any) => award.year))).sort(
        (a: any, b: any) => b - a
      ),
    [awardsList]
  );

  const [activeYear, setActiveYear] = useState<"All" | number>("All");

  const filteredAwards =
    activeYear === "All"
      ? awardsList
      : awardsList.filter((award: any) => award.year === activeYear);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    ...options,
  });

  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [filteredAwards, emblaApi]);

  return (
    <section className=" bg-[#C24E38] py-16 text-white">
      <div className="mx-auto max-w-[90%]">
        {/* Title */}
        {title && (
          <h2 className="font-swearDisplay mb-10 text-center  text-white">
            {title}
          </h2>
        )}

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveYear("All")}
            className={`rounded-md text-4 border px-8 py-3 font-light transition-all duration-300 ${
              activeYear === "All"
                ? "bg-white text-black"
                : "border-white text-white hover:bg-gray-200 hover:text-black"
            }`}
          >
            All
          </button>
          {years.map((year: any) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`rounded-md text-4 border px-8 py-3 font-light transition-all duration-300 ${
                activeYear === year
                  ? "bg-white text-black"
                  : "border-white text-white hover:bg-gray-200 hover:text-black"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="embla">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-8">
              {filteredAwards.map((award: any) => (
                <div
                  key={award.id}
                  className="embla__slide flex-[0_0_80%] rounded-xl   sm:flex-[0_0_60%] md:flex-[0_0_40%] lg:flex-[0_0_25%]"
                >
                  <div className="flex flex-col h-full">
                    {/* Image */}
                    <div className="relative h-96 w-full mb-6 overflow-hidden bg-white/10">
                      <Image
                        src={award.image?.url || "/images/image.jpg"}
                        alt={award.title || "Award Image"}
                        fill
                        className="object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Dot + Year */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="h-2 w-2 rounded-full bg-white"></span>
                      <span className="text-[1.5rem] text-white/80 font-inria">{award.year}</span>
                    </div>

                    {/* Award Title */}
                    <h4 className="font-medium  text-white">
                      {award.title}
                    </h4>

                    {/* Optional Description */}
                    {award.description && (
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {award.description}
                      </p>
                    )}

                    {/* Optional Link */}
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 text-sm text-white underline underline-offset-2 hover:text-gray-200"
                      >
                        Learn more →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredAwards.length === 0 && (
          <p className="mt-12 text-center text-gray-200">
            No awards found for this year.
          </p>
        )}
      </div>
    </section>
  );
};

export default AwardsCarousel;
