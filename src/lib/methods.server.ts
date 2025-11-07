// nextjs-base\src\lib\methods.server.ts

import { CommonCollectionData, TLocale } from "@/typings/common";
import {
  RemoteConfigProps,
  RouteProps,
  SitemapPageProps,
} from "@/typings/strapi";
import {
  NewsCategoryCollection,
  NewsCollection,
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

export const GetNewsList = async (
  locale: TLocale = "en",
  queryParams: {
    page?: number;
    pageSize?: number;
    sort?: string;
    category?: string;
    search?: string;
  } = {},
) => {
  const {
    page = 1,
    pageSize = 9,
    sort = "createdAt:desc",
    category,
    search,
  } = queryParams;

  const filters: any = {};

  if (category) {
    filters.Category = {
      Key: { $eq: category },
    };
  }

  if (search) {
    filters.PageTitle = {
      $containsi: search,
    };
  }

  try {
    const data = await NewsCollection.find({
      locale,
      // populate: {
      //   Image: { populate: "*" },
      //   Category: { populate: "*" },
      //   SEO: { populate: "*" },
      // },
      // filters,
      pagination: {
        page,
        pageSize,
      },
      // sort: [sort],
    });
    return data;
  } catch (err: any) {
    console.error("GetNewsList failed:", err?.response?.data || err);
    throw err;
  }
};

/**
 * Fetch all News Categories
 */
export const GetNewsCategories = async (locale: TLocale = "en") => {
  const data = await NewsCategoryCollection.find({
    locale,
    // fields: ["Title", "Key"],
    // sort: ["Title:asc"],
  });
  return data;
};

export const getNewsDetail = async (slug: string, locale: TLocale = "en") => {
  const data = await NewsCollection.find({
    filters: {
      PageURL: { $eq: slug },
    },
    populate: {
      Image: { populate: "*" },
      SEO: { populate: "*" },
      Category: { populate: "*" },
      related_articles: { populate: "*" },
    },
    locale,
  });

  return data;
};
