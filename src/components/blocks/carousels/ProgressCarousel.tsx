"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./lib/EmblaCarouselArrowButtons";
import { DynamicZoneProps } from "@/typings/common";

interface InterestCarouselProps {
  options?: EmblaOptionsType;
  block: DynamicZoneProps;
}

const ProgressCarousel = ({ options, block }: InterestCarouselProps) => {
  const { title, verticalCarousel } = block;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="mx-auto max-w-[75%] bg-[#e8e2db] py-16 text-gray-800">
      <h2 className="mb-6 text-center">{title || "Personal Interests"}</h2>
      <div className="grid items-center gap-12 px-6 md:grid-cols-2">
        {/* Left: Image carousel */}
        <div className="embla overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex">
            {verticalCarousel.map((item: any) => (
              <div
                className="embla__slide relative h-[40rem] w-full flex-[0_0_100%]"
                key={item.id}
              >
                <Image
                  src="/images/image.jpg"
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
                {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-gray-400/50 pt-6">
            <div className="flex gap-4">
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            </div>

            <p className="text-sm tracking-widest text-gray-700">
              {String(selectedIndex + 1).padStart(2, "0")} /{" "}
              {String(verticalCarousel.length).padStart(2, "0")}
            </p>
          </div>
        </div>

        {/* Right: Text side */}
        <div>
          <div className="space-y-6">
            {verticalCarousel.map((item: any, index: number) => (
              <div key={item.id}>
                <h3
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`cursor-pointer font-serif text-3xl transition-all md:text-4xl ${
                    index === selectedIndex
                      ? "font-semibold text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.title}
                </h3>

                {index === selectedIndex && (
                  <p className="mt-2 max-w-md text-base leading-relaxed text-gray-700 md:text-lg">
                    {item.carouselDescription}
                  </p>
                )}
              </div>
            ))}
          </div>

    
        </div>
      </div>
    </section>
  );
};

export default ProgressCarousel;
