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
    <section className="tw:w-full tw:my-8">
      <Image
        src={imageUrl}
        alt={image.alternativeText || "Full width image"}
        width={image.width || 1920}
        height={image.height || 1080}
        className="tw:w-full tw:h-auto tw:object-cover tw:rounded-2xl"
        priority
      />
      {image.caption && (
        <p className="tw:text-center tw:mt-2 tw:text-gray-500 tw:text-sm">
          {image.caption}
        </p>
      )}
    </section>
  );
};

export default FullWidthImage;
