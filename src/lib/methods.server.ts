import { CommonCollectionData, TLocale } from "@/typings/common";
import {
  RemoteConfigProps,
  RouteProps,
  SitemapPageProps,
} from "@/typings/strapi";
import {
  RemoteConfigCollection,
  RouteCollection,
  SitemapCollection,
} from "./strapi";

const previewHandler = (
  documentId: Pick<CommonCollectionData, "documentId">,
) => ({ documentId, status: "modified" });

// Routes Collection
export const GetRoutes = async (
  slugs: string[],
  locale: TLocale = "en",
): Promise<RouteProps> => {
  const data = (await RouteCollection.find({
    filters: {
      PageURL: {
        $in: slugs,
      },
    },
    locale: locale,
  })) as RouteProps;
  data?.data?.sort(
    (a, b) => slugs.indexOf(a?.PageURL) - slugs.indexOf(b?.PageURL),
  );
  return data;
};

// Global Config
export const GetRemoteConfig = async () => {
  const data = (await RemoteConfigCollection.find()) as RemoteConfigProps;

  return data;
};
// Sitemap Pages
export const GetSitemapData = async (slug: string, locale: TLocale = "en") => {
  const data = (await SitemapCollection.find({
    filters: {
      PageURL: {
        $eq: slug,
      },
    },
    populate: {
      SEO: {
        populate: "*",
      },
      ParentPage: {
        fields: ["PageURL", "PageTitle"],
        populate: {
          ParentPage: {
            fields: ["PageURL", "PageTitle"],
            populate: {
              ParentPage: {
                fields: ["PageURL", "PageTitle"],
              },
            },
          },
        },
      },
      Blocks: {
        populate: "*",
      },
    },
    locale,
  })) as SitemapPageProps;
  return data;
};

export const GetSitemapMetaData = async (
  slug: string,
  locale: TLocale = "en",
) => {
  const data = (await SitemapCollection.find({
    filters: {
      PageURL: {
        $eq: slug,
      },
    },
    fields: ["PageTitle"],
    populate: {
      SEO: {
        populate: "*",
      },
    },
    locale,
  })) as SitemapPageProps;
  return data;
};
