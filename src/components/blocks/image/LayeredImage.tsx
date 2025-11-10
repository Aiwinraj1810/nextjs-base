import { DynamicZoneProps } from "@/typings/common";
import Image from "next/image";

interface LayeredImageProps {
  block: DynamicZoneProps;
}

const LayeredImage = ({ block }: LayeredImageProps) => {
  const { layeredItem } = block;

  return (
    <section className="mx-auto max-w-[75%] space-y-20">
      {layeredItem.map((item: any, index: number) => (
        <div
          key={item.id}
          className={`flex flex-col items-center justify-between gap-8 md:flex-row md:gap-2 ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} `}
        >
          <div className="relative mx-auto w-full max-w-3xl border-2  md:mx-0">
            <div className="relative h-[34rem] w-full overflow-hidden shadow-md">
              <Image
                src={item.mainImage?.url || "/images/image.jpg"}
                alt={item.mainImage?.alternativeText || "Main image"}
                fill
                className="object-cover"
              />
            </div>

            {/* Overlapping image */}
            <div
              className={`absolute ${index % 2 !== 0 ? "left-[-3rem] top-[-3rem]" : "right-[-3rem] top-[-3rem]"} h-40 w-40 overflow-hidden shadow-lg md:h-72 md:w-64`}
            >
              <Image
                src={item.layerImage?.url || "/images/image.jpg"}
                alt={item.layerImage?.alternativeText || "Layer image"}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Text section */}
          <div className="flex flex-col h-full items-center justify-center max-w-4xl">
            <p className="leading-relaxed text-gray-800">
              {item.section ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error optio libero laborum doloribus numquam inventore sint impedit porro quasi dolores."}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default LayeredImage;
