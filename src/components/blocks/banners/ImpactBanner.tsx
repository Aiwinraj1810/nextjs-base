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
      className="relative flex h-full min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat text-white"
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Overlay content */}
        <div className="col-span-full md:col-span-1 mx-auto max-w-4xl space-y-6 bg-[#EAE3DD] p-24">
          {heading && (
            <div className="flex items-center gap-2">
              <div className="h-[0.7rem] w-[0.7rem] bg-grenadier"></div>

              <p className="text-4 uppercase tracking-widest  text-[#333]">
                {heading}
              </p>
            </div>
          )}
          {title && (
            <h3 className="font-swearDisplay text-[#333]">
              {title}
            </h3>
          )}
          {description && (
            <p className="leading-[2.6rem] sm:leading-[1.5] sm:text-2 text-pretty">
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImpactBanner;
