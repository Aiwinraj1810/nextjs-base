import { DynamicZoneProps } from "@/typings/common";

interface NumCountProps {
  block: DynamicZoneProps;
}

const NumCount = ({ block }: NumCountProps) => {
  const { Counter } = block;
  if (!Counter) return null;
  console.log("Counter : ", Counter);
  return (
    <section className="mx-auto flex max-w-[80%] items-center justify-between py-16">
      {Counter.map((item: any) => (
        <div key={item.id} className="space-y-10 font-swearDisplay font-light">
          <h2>{item.counter || "100"}</h2>
          <div className="w-3/4">
            <p>{item.counterText || "Lorem ipsum, dolor sit amet."}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default NumCount;
