"use client";

import { I18nProviderClient } from "@/app/locales/client";
import { RemoteConfigData } from "@/typings/strapi";
import { DirectionProvider } from "@radix-ui/react-direction";
import dayjs from "dayjs";
import "dayjs/locale/ar"; // Import more locales as and when needed
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { createContext, useContext, useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

interface AppContextProps {
  isDarkHeader: boolean;
  setIsDarkHeader: React.Dispatch<React.SetStateAction<boolean>>;
  globalConfig: RemoteConfigData;
}

const AppContext = createContext<AppContextProps>({} as AppContextProps);

export const useApp = () => useContext(AppContext);

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  globalConfig: RemoteConfigData;
}

const AppProvider = ({ children, locale, globalConfig }: ProvidersProps) => {
  const [isDarkHeader, setIsDarkHeader] = useState<boolean>(false);

  // dayJS --- Extend any dayjs plugins here
  useEffect(() => {
    dayjs.locale(locale);
    dayjs.extend(preParsePostFormat);
    dayjs.extend(relativeTime);
  }, [locale]);

  // GSAP --- Register all GSAP plugins here
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
  }, []);

  return (
    <I18nProviderClient locale={locale}>
      <DirectionProvider dir="ltr">
        <SWRConfig
          value={{
            fetcher: (r, i) => fetch(r, i).then((res) => res.json()),
          }}
        >
          <AppContext.Provider
            value={{
              isDarkHeader,
              setIsDarkHeader,
              globalConfig,
            }}
          >
            {children}
          </AppContext.Provider>
        </SWRConfig>
      </DirectionProvider>
    </I18nProviderClient>
  );
};

export default AppProvider;
