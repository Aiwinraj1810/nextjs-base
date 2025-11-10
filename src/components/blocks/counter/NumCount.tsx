import { DynamicZoneProps } from "@/typings/common";

interface NumCountProps {
  block: DynamicZoneProps;
}

const NumCount = ({ block }: NumCountProps) => {
  const { Counter } = block;
  if (!Counter) return null;
  console.log("Counter : ", Counter);
  return (
    <section className="mx-auto flex max-w-[80%] items-center justify-between">
      {Counter.map((item: any) => (
        <div key={item.id} className="space-y-10">
          <h2>{item.counter || "100"}</h2>
          <p>{item.counterText || "Lorem ipsum, dolor sit amet."}</p>
        </div>
      ))}
    </section>
  );
};

export default NumCount;
