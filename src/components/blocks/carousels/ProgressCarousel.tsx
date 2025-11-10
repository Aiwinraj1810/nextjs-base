"use client";

import React, { useCallback, useEffect, useState, useRef } from "react";
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

  const AUTOPLAY_INTERVAL = 15000; 
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    ...options,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [progress, setProgress] = useState(0); // 0–100
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number>(0);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
  }, []);

  // 🕒 Progress Timer Logic
  const startProgress = useCallback(() => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    let startTime = Date.now();
    lastTimeRef.current = startTime;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const percentage = Math.min((elapsed / AUTOPLAY_INTERVAL) * 100, 100);
      setProgress(percentage);

      // When time is up → go to next slide
      if (percentage >= 100) {
        emblaApi?.scrollNext();
        startProgress(); // restart timer for next slide
      }
    }, 50); // update 20 times per second
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    startProgress();
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [emblaApi, onSelect, startProgress]);

  return (
    <section className="mx-auto max-w-[75%] bg-[#e8e2db] py-16">
      <h2 className="mb-12 text-center">{title || "Personal Interests"}</h2>

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

          {/* Navigation + Progress */}
          <div className="mt-10 flex items-center justify-between  border-gray-400/50 pt-6">
            {/* Prev/Next buttons */}
            <div className="flex gap-4">
              <PrevButton
                onClick={() => {
                  onPrevButtonClick();
                  setProgress(0);
                  startProgress();
                }}
                disabled={prevBtnDisabled}
              />
              <NextButton
                onClick={() => {
                  onNextButtonClick();
                  setProgress(0);
                  startProgress();
                }}
                disabled={nextBtnDisabled}
              />
            </div>

            {/* Progress bar + counter */}
            <div className="flex flex-col items-end justify-between w-full gap-10 px-6 font-inria">
              <p className="text-4 tracking-widest text-gray-700 w-fit">
                {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                {String(verticalCarousel.length).padStart(2, "0")}
              </p>
              {/* Progress Bar */}
              <div className="w-full h-[2px] bg-gray-300 mb-2 overflow-hidden rounded-full">
                <div
                  className="h-[2px] bg-gray-800 transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Text side */}
        <div>
          <div className="space-y-6">
            {verticalCarousel.map((item: any, index: number) => (
              <div key={item.id}>
                <h3
                  onClick={() => {
                    emblaApi?.scrollTo(index);
                    setProgress(0);
                    startProgress();
                  }}
                  className={`cursor-pointer font-swearDisplay tracking-wide  transition-all  ${
                    index === selectedIndex
                      ? " text-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {item.title}
                </h3>

                {index === selectedIndex && (
                  <p className="mt-2 max-w-md  leading-relaxed text-gray-700">
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
