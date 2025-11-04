import { APIResponse, CommonCollectionData, TLocale } from "@/typings/common";
import { GetSitemapMetaData } from "./methods.server";

export default async (
  PageType: string = "default",
  locale: TLocale,
  slug: string,
): Promise<APIResponse<CommonCollectionData[]>> => {
  switch (PageType) {
    case "news-listing":
    case "default":
      const response = await GetSitemapMetaData(slug, locale);
      return response as APIResponse<CommonCollectionData[]>;
    case "news-detail":
      return {} as APIResponse<CommonCollectionData[]>;
    default:
      return {} as APIResponse<CommonCollectionData[]>;
  }
};
