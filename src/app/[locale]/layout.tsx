import AppProvider from "@/components/AppProvider";
import CookiePolicy from "@/components/elements/CookiePolicy";
import { GetRemoteConfig, GetHeaderBlock } from "@/lib/methods.server";
import { inria, swearDisplay } from "@/styles/fonts";
import { PagePrams } from "@/typings/common";
import { GoogleTagManager } from "@next/third-parties/google";
import { Metadata, Viewport } from "next";
import { setStaticParamsLocale } from "next-international/server";
import NextTopLoader from "nextjs-toploader";
import React from "react";
import { getStaticParams } from "../locales/server";
import Header from "@/components/elements/header";
import Footer from "@/components/elements/Footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_FRONTEND_URL ?? "http://localhost:3000/",
  ),
  title: {
    template: "%s | Company Name",
    default: "Company Name",
  },
  description: "",
  authors: [
    {
      name: "TenTwenty | Webdesign, Webshops & E-marketing | Dubai",
    },
  ],
  openGraph: {
    siteName: "Company Name",
    title: "Company Name",
    description: "",
    images: [
      {
        url: "/logo.png",
        width: 910,
        height: 272,
      },
    ],
  },
  icons: {
    shortcut: "/favicon.ico",
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
} as const;

export async function generateStaticParams() {
  return getStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: {
  params: Promise<PagePrams>;
  children: React.ReactNode;
}) {
  const { locale } = await params;
  const globalConfig = await GetRemoteConfig();
  console.log(globalConfig, "globalConfig");
  setStaticParamsLocale(locale);

  return (
    <html lang={locale}>
      {!Boolean(process.env.IS_UAT) && globalConfig?.data?.GTMCode ? (
        <GoogleTagManager gtmId={globalConfig?.data?.GTMCode} />
      ) : null}
      <body className={`${swearDisplay.variable} ${inria.variable} ${swearDisplay.className}`}>
        <NextTopLoader showSpinner={false} color="#C36520" />
        <AppProvider locale={locale} globalConfig={globalConfig?.data}>
          <Header />
          <CookiePolicy />
          {children}
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
