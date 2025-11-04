import { getStrapiMedia } from "@/lib/utils";
import { PageBlock } from "@/typings/blocks";
// import { NewsAttributes, NewsData, NewsProps } from "@/typings/news";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";

const NewsBanner = ({ data }: any) => {
  return (
    <div className="px-12 text-center mb-40">
      <h1>{data?.PageTitle}</h1>
      <div className="flex items-center justify-center gap-10 mb-12">
        <p>{dayjs(data.PublishedDate).format("DD-MM-YYYY")}</p>
        <p>{data?.articleCategory?.data?.attributes?.Title}</p>
      </div>
      <div className="relative h-[70vh]">
        <Image
          className="object-cover"
          src={getStrapiMedia(data?.Image)}
          alt={data?.Title || "news-image"}
          fill
        />
      </div>
    </div>
  );
};

export default NewsBanner;
