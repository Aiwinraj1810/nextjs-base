import { getArticleSlugs, getSitemapSlugs } from "@/lib/methods";
import { generateTrail, removeLocaleSuffix } from "@/lib/utils";
import { getBaseUrl } from "@/utils/helpers";
import dayjs from "dayjs";
import { getServerSideSitemap, type ISitemapField } from "next-sitemap";

export const revalidate = 0;

export async function GET() {
  const sitemaplist = await getSitemapSlugs("en");
  const sitemaplistAR = await getSitemapSlugs("ar");

  const articles = await getArticleSlugs("en");
  const articlesAR = await getArticleSlugs("ar");

  // SITEMAP
  const sitemapUrlEN = sitemaplist?.data?.map((item): ISitemapField => {
    const page = item?.attributes;

    const trail = generateTrail(item?.attributes?.ParentPage);
    const parentPage = trail?.map((e) => e?.link).join("/");
    const URL = `${parentPage ? `/${parentPage}` : ""}/${page?.PageUid}`;

    const alternateRefs: ISitemapField["alternateRefs"] = [];

    if (page.localizations?.data && page.localizations?.data?.length > 0) {
      alternateRefs.push({
        hreflang: "ar",
        href: `${getBaseUrl()}/ar${URL}`,
      });
      alternateRefs.push({
        hreflang: "en",
        href: `${getBaseUrl()}${URL}`,
      });
    }

    return {
      loc: `${getBaseUrl()}${URL}`,
      lastmod: `${page?.updatedAt}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs,
    };
  });

  const sitemapUrlAR = sitemaplistAR?.data?.map((item): ISitemapField => {
    const page = item?.attributes;
    const trail = generateTrail(item?.attributes?.ParentPage);
    const parentPage = trail?.map((e) => e?.link).join("/");
    const URL = `${parentPage ? `/${parentPage}` : ""}/${removeLocaleSuffix(
      page?.PageUid,
    )}`;

    const alternateRefs: ISitemapField["alternateRefs"] = [];

    if (page.localizations?.data && page.localizations?.data?.length > 0) {
      alternateRefs.push({
        hreflang: "en",
        href: `${getBaseUrl()}${URL}`,
      });
      alternateRefs.push({
        hreflang: "ar",
        href: `${getBaseUrl()}/ar${URL}`,
      });
    }

    return {
      loc: `${getBaseUrl()}/ar${URL}`,
      lastmod: `${page?.updatedAt}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs,
    };
  });

  // ARTICLES
  const articleUrlEN = articles?.data?.map((item): ISitemapField => {
    const article = item?.attributes;
    const URL = `/news-and-media/${removeLocaleSuffix(article?.PageUid)}`;

    const alternateRefs: ISitemapField["alternateRefs"] = [];

    if (
      article.localizations?.data &&
      article.localizations?.data?.length > 0
    ) {
      alternateRefs.push({
        hreflang: "ar",
        href: `${getBaseUrl()}/ar${URL}`,
      });
      alternateRefs.push({
        hreflang: "en",
        href: `${getBaseUrl()}${URL}`,
      });
    }

    return {
      loc: `${getBaseUrl()}${URL}`,
      lastmod: `${article?.updatedAt}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs: alternateRefs.length ? alternateRefs : undefined,
    };
  });

  const articleUrlAR = articlesAR?.data?.map((item): ISitemapField => {
    const article = item?.attributes;
    const URL = `/news-and-media/${removeLocaleSuffix(article?.PageUid)}`;

    const alternateRefs: ISitemapField["alternateRefs"] = [];

    if (
      article.localizations?.data &&
      article.localizations?.data?.length > 0
    ) {
      alternateRefs.push({
        hreflang: "en",
        href: `${getBaseUrl()}${URL}`,
      });
      alternateRefs.push({
        hreflang: "ar",
        href: `${getBaseUrl()}/ar${URL}`,
      });
    }

    return {
      loc: `${getBaseUrl()}/ar${URL}`,
      lastmod: `${article?.updatedAt}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs: alternateRefs.length ? alternateRefs : undefined,
    };
  });

  const SITEMAP_DATA: ISitemapField[] = [
    {
      loc: `${getBaseUrl()}/`,
      lastmod: `${dayjs(new Date(), "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
      )}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs: [
        {
          hreflang: "ar",
          href: `${getBaseUrl()}/ar`,
        },
        {
          hreflang: "en",
          href: `${getBaseUrl()}/`,
        },
      ],
    },
    ...sitemapUrlEN,
    ...articleUrlEN,
    {
      loc: `${getBaseUrl()}/ar`,
      lastmod: `${dayjs(new Date(), "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ").format(
        "YYYY-MM-DDTHH:mm:ss.SSS[Z]",
      )}`,
      changefreq: "weekly",
      priority: 1,
      alternateRefs: [
        {
          hreflang: "en",
          href: `${getBaseUrl()}`,
        },
        {
          hreflang: "ar",
          href: `${getBaseUrl()}/ar`,
        },
      ],
    },
    ...sitemapUrlAR,
    ...articleUrlAR,
  ];

  return getServerSideSitemap(SITEMAP_DATA);
}
