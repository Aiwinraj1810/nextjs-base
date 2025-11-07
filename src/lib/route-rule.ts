import {
  GetSitemapData,
  GetNewsList,
  getNewsDetail,
  GetNewsCategories,
} from "@/lib/methods.server";
import { CommonPageRenderer } from "@/page-templates/CommonPageRenderer";
import NewsListingRenderer from "@/page-templates/NewsListingRenderer";
import NewsDetailPageRenderer from "@/page-templates/NewsDetailPageRenderer";
import { TLocale } from "@/typings/common";
import { RouteProps, SitemapPageData } from "@/typings/strapi";

const UNIQUE_LAYOUTS = ["news-detail"];

type Rule = {
  id: string;
  match: (types: string[], last: string) => boolean;
  dataQuery: (slug: string, locale: TLocale) => Promise<any>;
  render: (
    data: any,
    routes: RouteProps,
    slug: string,
    locale: string,
  ) => React.ReactElement | Promise<React.ReactElement>;
};

export const RULES: Rule[] = [
  {
    // 📰 News Listing Page
    id: "news-listing",
    match: (types, last) => last === "news-listing",
    dataQuery: async (_slug, locale) => {
      const [articlesRes, categoriesRes] = await Promise.all([
        GetNewsList(locale),
        GetNewsCategories(locale),
      ]);
      return {
        articles: (articlesRes as any)?.data?.data ?? [],
        categories: (categoriesRes as any)?.data?.data ?? [],
        pagination: (articlesRes as any)?.data?.meta?.pagination,
      };
    },
    render: (data, routes) => NewsListingRenderer(data, routes),
  },
  {
    id: "news-detail",
    match: (types, last) => last === "news-detail",
    dataQuery: getNewsDetail,
    render: (data, routes) => NewsDetailPageRenderer(data, routes),
  },
  {
    // 🌐 Default pages (catch-all)
    id: "sitemap",
    match: (types, last) =>
      last === "default" ||
      (types.length === 1 && !UNIQUE_LAYOUTS.includes(last)),
    dataQuery: GetSitemapData,
    render: (data, routes) => CommonPageRenderer(data, routes),
  },
];


export function pickRule(types: string[], last: string) {
  const rule = RULES.find((r) => r.match(types, last)) ?? null;
  console.log("Picked rule:", rule, { types, last });
  return rule;
}

export const getRouteURL = (slug: string, ParentPage: SitemapPageData) => {
  return ParentPage ? `/${ParentPage?.PageURL}/${slug}` : `/${slug}`;
};
