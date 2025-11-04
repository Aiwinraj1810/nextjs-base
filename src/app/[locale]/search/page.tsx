"use client";

import { useI18n } from "@/app/locales/client";
import PageSetter from "@/components/blocks/PageSetter";
import Breadcrumb, { BreadcrumbTrail } from "@/components/elements/Breadcrumb";
import News from "@/components/elements/cards/News";
import SearchPageInput from "@/components/elements/SearchPageInput";
import { Button } from "@/components/ui/button";
import { SearchTabs, Tab } from "@/components/ui/search-tab";
import { useFilterState } from "@/hooks/useFilterState";
import { queryToString } from "@/lib/utils";
import type { SearchData, SearchProps } from "@/typings/search";
import { useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import useSWR from "swr";

export default function SearchPage() {
  const t = useI18n();

  const STRAPI_MODELS = {
    ARTICLES: {
      model: "api::article.article",
      label: "Articles",
    },
  };

  const resultsRef = useRef<null | HTMLDivElement>(null);
  const { state, updateState } = useFilterState({
    model: "all",
    // model: "api::yos-activation.yos-activation",
    keyword: "",
  });

  const query = queryToString(state);

  const { data } = useSWR<SearchProps>(query ? `/api/search?${query}` : null, {
    onSuccess: () => {
      // updateState({
      //   model: "all",
      // });
    },
  });

  const returnSection = ([key, value]: [key: string, value: SearchData]) => {
    if (value?.meta?.totalCount < 1) return null;

    if (state?.model !== key && state?.model !== "all") return null;

    const showAll = state?.model === "all";
    let content;

    switch (key) {
      case STRAPI_MODELS.ARTICLES.model:
        content = (
          <>
            {value?.data?.map((article, index) => (
              <SwiperSlide className="!h-auto" key={`article-slider-${index}`}>
                <News data={article?.attributes} />
              </SwiperSlide>
            ))}
          </>
        );
        break;

      default:
        return null;
    }

    const modelLabel = Object.values(STRAPI_MODELS).find(
      (model) => model.model === key,
    )?.label;

    return (
      <div className="mb-24">
        <SearchItemHeader
          onClick={() => {
            updateState({
              model: key,
            });

            if (!resultsRef.current) return;
            const offset = resultsRef.current.getBoundingClientRect();

            window.scroll({
              top: offset.top + window.scrollY - 200,
              behavior: "smooth",
            });
          }}
          title={modelLabel}
          hideButton={!showAll}
          hideTitle={!showAll}
        />
        {showAll ? (
          <Swiper
            slidesPerView={1.1}
            spaceBetween="20px"
            watchOverflow
            slidesOffsetAfter={20}
            breakpoints={{
              1300: {
                slidesPerView: 3.3,
                spaceBetween: "20px",
              },
              1000: {
                slidesPerView: 2.5,
                spaceBetween: "20px",
              },
              500: {
                slidesPerView: 1.7,
                spaceBetween: "20px",
              },
            }}
            className="cursor-grab !ps-8"
          >
            {content}
          </Swiper>
        ) : (
          <div className="site-container grid gap-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {content}
          </div>
        )}
      </div>
    );
  };

  const totalResults = Object.entries(data?.data?.attributes ?? {}).reduce(
    (sum, [, value]) => sum + value?.meta?.totalCount,
    0,
  );

  const trail: BreadcrumbTrail[] = [{ title: "Search" }];

  return (
    <>
      <PageSetter darkHeader={true} />
      <section className="site-container bg-beige-dark mb-12 pb-12 pt-56 sm:pt-72 lg:mb-36">
        <Breadcrumb
          className="mb-8"
          classNames={{
            link: "after:bg-white hover:opacity-80",
          }}
          trail={trail}
        />
        <h1 className="uppercase">{"Search"}</h1>
      </section>
      <SearchPageInput
        className="mx-8 lg:mx-auto lg:w-2/3"
        updateState={updateState}
        label={"Search"}
      />
      <p className="mb-12 mt-6 text-center" ref={resultsRef}>
        {totalResults} {totalResults === 1 ? "result" : "results"}
      </p>
      <SearchTabs
        className="mb-16 flex-wrap"
        value={state?.model}
        onValueChange={(value) =>
          updateState({
            model: value,
          })
        }
      >
        <Swiper
          slidesPerView="auto"
          spaceBetween="20px"
          watchOverflow
          slidesOffsetAfter={20}
          className="!ps-8"
        >
          <SwiperSlide className="!w-auto">
            <Tab value="all">{"All"} </Tab>
          </SwiperSlide>
          {Object.entries(STRAPI_MODELS)?.map(([key, value], index) => (
            <SwiperSlide className="!w-auto" key={`result-${index}`}>
              <Tab key={value.model} value={value.model}>
                {value.label}
                {/* <span className="h-[2.1rem] rounded-full bg-white px-[0.7rem] text-other-t1-r12">
              {value?.meta?.totalCount}
            </span> */}
              </Tab>
            </SwiperSlide>
          ))}
        </Swiper>
      </SearchTabs>

      <div className="mb-40">
        {Object.entries(data?.data?.attributes ?? {})?.map(returnSection)}
      </div>
    </>
  );
}

const SearchItemHeader = ({
  title,
  onClick,
  hideButton,
  hideTitle,
}: {
  title?: string;
  onClick?: () => void;
  hideButton?: boolean;
  hideTitle?: boolean;
}) => {
  return (
    <div className="site-container mb-8 flex flex-col justify-between gap-8 sm:flex-row sm:items-center">
      {hideTitle ? null : <span className="h3 uppercase">{title}</span>}
      {hideButton ? null : (
        <Button onClick={onClick} className="">
          {"SeeAll"}
        </Button>
      )}
    </div>
  );
};
