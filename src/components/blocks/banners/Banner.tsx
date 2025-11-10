import Breadcrumb, { BreadcrumbTrail } from "@/components/elements/Breadcrumb";
import { generateTrail } from "@/lib/utils";
import { PageBlock } from "@/typings/blocks";

const Banner = ({ block, page }: PageBlock) => {
  const parentPage = generateTrail(page?.ParentPage);
  const title = page?.PageTitle;
  const trail: BreadcrumbTrail[] = [...parentPage, { title }].filter(Boolean);
  console.log("taril : ", parentPage)

  return (
    <>
      {/* Set true for text banner */}
      {/* <PageSetter darkHeader={true} /> */}
      <div className="px-8 lg:px-24 xl:px-[9.4rem] pt-[11rem] sm:pt-[14rem] lg:pt-[18.5rem] mb-8 text-center sm:text-start">
        <Breadcrumb
          className="text-lg"
          classNames={{
            link: "after:bg-white hover:opacity-80",
          }}
          trail={trail}
        />
        <h1 className="">{block?.Title}</h1>
      </div>
    </>
  );
};

export default Banner;
