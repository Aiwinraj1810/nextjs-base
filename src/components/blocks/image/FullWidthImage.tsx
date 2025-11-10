"use client";

import Image from "next/image";

import { DynamicZoneProps } from "@/typings/common";
import { getStrapiMedia } from "@/lib/utils";

interface FullWidthImageProps {
  block: DynamicZoneProps;
}

const FullWidthImage = ({ block }: FullWidthImageProps) => {
  const image = block.Image; // ensure uppercase matches your Strapi field

  if (!image?.url) return null;

  const imageUrl = getStrapiMedia(image.url);

  return (
    <section className="w-full my-8 mx-auto">
      <div className="relative h-[65rem] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={image.alternativeText || "Full width image"}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {image.caption && (
        <p className="tw:text-center tw:mt-2 tw:text-gray-500 tw:text-sm">
          {image.caption}
        </p>
      )}
    </section>
  );
};

export default FullWidthImage;
