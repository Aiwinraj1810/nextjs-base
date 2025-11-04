import { i18n } from "@/app/locales/i18n.config";
import { BreadcrumbTrail } from "@/components/elements/Breadcrumb";
import { ImageFragment, NestedPageAttributes, TLocale } from "@/typings/strapi";
import { ClassValue, clsx } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";
const qs = require("qs");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStrapiMedia = (
  imageData?:
    | ImageFragment
    | ImageFragment["data"]["attributes"]
    | string
    | null,
  format?: keyof ImageFragment["data"]["attributes"]["formats"],
) => {
  if (typeof imageData === "string") {
    return imageData?.startsWith("/")
      ? `${
          process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:1337"
        }${imageData}`
      : imageData;
  }
  // @ts-ignore
  const media = imageData?.data?.attributes || imageData;
  if (!media) {
    return "/placeholder.png";
  }
  // if()
  const imageUrl = media?.url?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:1337"}${
        media?.formats?.[format!]?.url
          ? media?.formats[format!]?.url
          : media.url
      }`
    : media.url;
  return imageUrl;
};

export const queryToString = (query: { [key: string]: any }) => {
  return qs.stringify(query, {
    encodeValuesOnly: true,
  });
};

export const attachLocaleSuffix = (link: string = "", locale: TLocale) => {
  const suffix = locale !== i18n.defaultLocale ? `-${locale}` : "";
  return `${link}${suffix}`;
};

export const removeLocaleSuffix = (link?: string) => {
  if (typeof link !== "string") return link;

  const regex = new RegExp(`-(?:${i18n.locales.join("|")})$`, "i");
  const match = link?.match(regex);

  if (match) {
    const cleanedLink = link?.replace(match[0], "");
    return cleanedLink;
  }

  return link;
};

export const getSeoMedia = (
  imageData?: ImageFragment | ImageFragment["data"]["attributes"] | string,
  format?: keyof ImageFragment["data"]["attributes"]["formats"],
) => {
  if (typeof imageData === "string") {
    return imageData?.startsWith("/")
      ? `${
          process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:1342"
        }${imageData}`
      : imageData;
  }
  // @ts-ignore
  const media = imageData?.data?.attributes || imageData;

  if (!media) {
    return "/logo_original.png";
  }
  // if()
  const imageUrl = media?.url?.startsWith("/")
    ? `${process.env.NEXT_PUBLIC_MEDIA_URL || "http://localhost:1342"}${
        media?.formats?.[format!]?.url
          ? media?.formats[format!]?.url
          : media.url
      }`
    : media.url;

  return imageUrl;
};

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const generateTrail = (
  currentPage?: NestedPageAttributes,
): BreadcrumbTrail[] => {
  if (!currentPage?.data) return [];

  const {
    data: { attributes },
  } = currentPage;
  const currentTrail = {
    title: attributes?.PageTitle,
    link: removeLocaleSuffix(attributes?.PageUid),
    enabled: !attributes?.Disabled,
  };

  return [...generateTrail(attributes?.ParentPage), currentTrail];
};

export const generateTimes = () => {
  const times = [];
  const startTime = dayjs().startOf("day"); // Start from 12:00 AM (midnight)
  const endTime = startTime.clone().endOf("day"); // End at 11:30 PM

  for (
    let currentTime = startTime;
    currentTime.isBefore(endTime);
    currentTime = currentTime.add(30, "minute")
  ) {
    times.push({
      label: currentTime.format("hh:mm A"), // 12-hour format with AM/PM
      value: currentTime.format("HH:mm"), // 24-hour format
    });
  }

  return times;
};
