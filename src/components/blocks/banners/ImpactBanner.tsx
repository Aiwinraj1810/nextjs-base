"use client";

import { getStrapiMedia } from "@/lib/utils";
import { DynamicZoneProps } from "@/typings/common";

interface ImpactBannerProps {
  block: DynamicZoneProps;
}

const ImpactBanner = ({ block }: ImpactBannerProps) => {
  const { heading, title, description, backgroundImage } = block;

  // Fallback for local development / missing Strapi image

  const bgUrl = getStrapiMedia(backgroundImage.url);

  return (
    <section
      className="relative flex h-full items-center justify-center bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className="grid grid-cols-2 gap-4 py-24">
        {/* Overlay content */}
        <div className="mx-auto max-w-4xl space-y-6 px-6 py-16 text-center bg-[#EAE3DD]">
          {heading && (
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-200 md:text-base">
              {heading}
            </h4>
          )}
          {title && (
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm leading-relaxed text-gray-100 md:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactBanner;
