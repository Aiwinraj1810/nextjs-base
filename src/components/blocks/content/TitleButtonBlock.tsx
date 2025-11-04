import FadeUp from "@/components/animations/FadeUp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DynamicZoneProps, TitleButtons } from "@/typings/common";

const TitleButtonBlock = ({ block }: { block: DynamicZoneProps }) => {

  const {SectionDetails, TitleButtonList} = block || {};

  return (
    <section id={SectionDetails?.BlockID} 
      className={cn("common-container  pb-72 max-xl:pb-40 max-sm:pt-0 !pt-0", SectionDetails?.NoBottomMargin && "!pb-0")}> 
        <FadeUp className="flex justify-center items-center xl:gap-64 sm:gap-40 max-sm:justify-between">
           {TitleButtonList && TitleButtonList.length > 0 && TitleButtonList?.map((item : TitleButtons, i: number) => (
            <div key={i} className="flex flex-col justify-center items-center gap-8 max-sm:gap-3">
                <h2 className="sm:h1 ">{item?.Title}</h2>
                
                {item?.LinkUrl && item?.LinkTitle ? (
                   <Button className="bg-black" title={item?.LinkTitle} href={item?.LinkUrl} />
                ) : null}
            </div>
        ))}
        </FadeUp>
    </section>
  )
}

export default TitleButtonBlock;