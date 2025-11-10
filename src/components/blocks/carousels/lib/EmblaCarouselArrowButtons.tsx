"use client";
import React, { useCallback, useEffect, useState } from "react";
import { EmblaCarouselType } from "embla-carousel";

export const PrevButton = ({ onClick, disabled }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
  >
    ←
  </button>
);

export const NextButton = ({ onClick, disabled }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:bg-gray-200 transition disabled:opacity-40"
  >
    →
  </button>
);

export const usePrevNextButtons = (emblaApi?: EmblaCarouselType | null) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const onNextButtonClick = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick };
};
