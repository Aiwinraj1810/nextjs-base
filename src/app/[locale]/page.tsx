import FullBlockRendererPages from "@/components/blocks/FullBlockRenderer";
import { GetSitemapData, GetSitemapMetaData } from "@/lib/methods.server";
import { NextJSPageProps } from "@/typings/common";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: NextJSPageProps): Promise<Metadata> {
  const { locale } = await params;

  const response = await GetSitemapMetaData("homepage", locale);
  if (!response?.data?.length) {
    return {};
  }

  const page = response?.data?.[0];
  return {
    title: page?.SEO?.MetaTitle ?? page?.PageTitle,
    description: page?.SEO?.MetaDescription ?? page?.PageTitle,
    other: page?.SEO?.StructuredData
      ? {
          "application/ld+json": JSON.stringify(page?.SEO?.StructuredData),
        }
      : {},
  };
}

export default async function HomePage({ params }: Awaited<NextJSPageProps>) {
  const { locale } = await params;
  const data = await GetSitemapData("homepage", locale);
  const page = data?.data?.[0];
  if (!page) {
    return notFound();
  }
  return (
    <div className="min-h-screen ">
      {/* {JSON.stringify(data)} */}
      <FullBlockRendererPages blocks={page?.Blocks} />
    </div>
  );
}
