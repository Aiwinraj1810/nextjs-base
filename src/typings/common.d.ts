// NEXTJS
export type TLocale = "en" | "ar";

export interface PagePrams {
  locale: TLocale;
  pageSlug: string[];
  slug: string;
}

export interface NextJSPageProps {
  params: Promise<PagePrams>;
}

// Strapi

export interface APIResponse<T> {
  data: T;
  meta?: {
    pagination?: Pagination;
  };
}

export interface CommonCollectionData {
  id: number;
  PageTitle: string;
  PageURL: string;
  SEO: SEOData;
  documentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface SEOData {
  MetaTitle: string;
  MetaDescription: string;
  MetaRobots: string;
  StructuredData: JSON;
}

export interface DynamicZoneProps {
  __component: string;
  [key: string]: any;
}

export interface TitleButtons {
  Title?:string;
  LinkTitle?: string;
  LinkUrl?:string;
  OpenInNewTab?:boolean;
}