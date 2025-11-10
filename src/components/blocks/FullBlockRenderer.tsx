import { DynamicZoneProps } from "@/typings/common";
import dynamic from "next/dynamic";
import FullWidthImage from "./image/FullWidthImage";
import TitleButtonBlock from "./content/TitleButtonBlock";
import HeaderBlock from "./layout/HeaderBlock";
import Banner from "./banners/Banner";
import ImageContent from "./content/ImageContent";
import NumCount from "./counter/NumCount";
import LayeredImage from "./image/LayeredImage";
import BasicCarousel from "./carousels/BasicCarousel";

const ContentBlock = dynamic(
  () => import("@/components/blocks/content/Content"),
);

interface FullBlockRendererPagesProps {
  blocks?: DynamicZoneProps[];
}

const FullBlockRendererPages = async ({
  blocks,
}: FullBlockRendererPagesProps) => {
  const getComponent = (block: DynamicZoneProps, index: number) => {
    switch (block.__component) {
      case "blocks.about-banner":
        return <Banner block={block} key={`block-${index}`} />;
      case "blocks.two-column-content-block":
        return <ContentBlock block={block} key={`block-${index}`} />;
      case "blocks.full-width-image":
        return <FullWidthImage block={block} key={`block-${index}`} />;
      case "elements.link":
        return <TitleButtonBlock block={block} key={`block-${index}`} />;
      case "global.text-image":
        return <ImageContent block={block} key={`block-${index}`} />;
      case "blocks.counter-main":
        return <NumCount block={block} key={`block-${index}`} />;
      case "blocks.layered-parent":
        return <LayeredImage block={block} key={`block-${index}`} />;
      case "blocks.basic-carousel":
        return <BasicCarousel  block={block} key={`block-${index}`} />;
      default:
        return <></>;
    }
  };

  if (!blocks?.length) return null;
  return (
    <>
      {blocks?.map((block, i) => <div key={i}>{getComponent(block, i)}</div>)}
    </>
  );
};

export default FullBlockRendererPages;
