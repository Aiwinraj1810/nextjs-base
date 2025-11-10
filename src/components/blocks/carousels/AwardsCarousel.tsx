"use client";

import React, { useMemo, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType } from "embla-carousel";
import { DynamicZoneProps } from "@/typings/common";

interface AwardsCarouselProps {
  block: DynamicZoneProps;
  options?: EmblaOptionsType;
}

const AwardsCarousel = ({ block, options }: AwardsCarouselProps) => {
  const { title, awardsList } = block;

  // Extract unique years
  const years = useMemo(
    () =>
      Array.from(new Set(awardsList.map((award: any) => award.year))).sort(
        (a, b) => b - a,
      ),
    [awardsList],
  );

  const [activeYear, setActiveYear] = useState<"All" | number>("All");

  // Filter awards based on selected tab
  const filteredAwards =
    activeYear === "All"
      ? awardsList
      : awardsList.filter((award: any) => award.year === activeYear);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    dragFree: true,
    containScroll: "trimSnaps",
    ...options,
  });

  // Re-init Embla when filteredAwards change
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [filteredAwards, emblaApi]);

  return (
    <section className="bg-[#f6f2ed] py-16 text-gray-800">
      <div className="mx-auto max-w-[75%] px-6">
        {/* Title */}
        {title && (
          <h2 className="mb-10 text-center font-serif font-semibold">
            {title}
          </h2>
        )}

        {/* Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveYear("All")}
            className={`rounded-full border px-5 py-2 transition-all duration-300 ${
              activeYear === "All"
                ? "border-gray-900 bg-gray-900 text-white"
                : "border-gray-400 hover:bg-gray-200"
            }`}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setActiveYear(year)}
              className={`rounded-full border px-5 py-2 transition-all duration-300 ${
                activeYear === year
                  ? "border-gray-900 bg-gray-900 text-white"
                  : "border-gray-400 hover:bg-gray-200"
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="embla">
          <div className="embla__viewport overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex gap-6">
              {filteredAwards.map((award: any) => (
                <div
                  key={award.id}
                  className="embla__slide flex-[0_0_80%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%]"
                >
                  <div className="flex h-full flex-col justify-between rounded-xl bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
                    <div>
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                        {award.title}
                      </h3>
                      {award.year && (
                        <p className="mb-4 text-sm text-gray-600">
                          {award.year}
                        </p>
                      )}
                      {award.description && (
                        <p className="mb-4 text-sm leading-relaxed text-gray-700">
                          {award.description}
                        </p>
                      )}
                    </div>
                    {award.link && (
                      <a
                        href={award.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-sm text-blue-600 hover:underline"
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
          <p className="mt-12 text-center text-gray-600">
            No awards found for this year.
          </p>
        )}
      </div>
    </section>
  );
};

export default AwardsCarousel;
