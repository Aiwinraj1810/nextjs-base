"use client";

//nextjs-base\src\components\blocks\content\ImageContent.tsx
import Image from "next/image";

import { DynamicZoneProps } from "@/typings/common";
import { getStrapiMedia } from "@/lib/utils";
import Link from "next/link";

interface ImageContentProps {
  block: DynamicZoneProps;
}

const ImageContent = ({ block }: ImageContentProps) => {
  const { contentImage, title, description, ctaText, ctaUrl } = block; // ensure uppercase matches your Strapi field

  if (!contentImage?.url) return null;

  const imageUrl = getStrapiMedia(contentImage.url);

  return (
    <section className="mx-auto max-w-[80%] py-16 bg-[#EAE3DD]">
      <div className="grid grid-cols-6 gap-20">
        <div className="col-span-full md:col-span-4 space-y-24">
          <h2>{title || "Title here"}</h2>
          <p className="font-inria">
            {description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat excepturi ratione voluptatum dolores fugit cumque vitae, cum doloremque soluta illo autem asperiores dignissimos! Blanditiis fugit quo id necessitatibus cum exercitationem asperiores dolorum, ut facilis nulla itaque minima aut dignissimos sunt obcaecati eos fuga. Tempora et optio similique vitae nostrum accusamus."}
          </p>
          <div>
            <Link className="bg-[#C24E38] tracking-wider px-[5.4rem] py-8 sm:py-10  rounded-md text-[16px] text-white" href={ctaUrl || "Link here"}>{ctaText || "Text here"}</Link>
          </div>
        </div>
        <div className="hidden md:block relative col-span-full md:col-span-2 overflow-hidden p-4">
          <Image
            src={imageUrl}
            alt={contentImage.alternativeText || "Full width image"}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default ImageContent;
