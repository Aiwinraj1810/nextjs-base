import NewsListing from "@/components/blocks/listing/NewsListing";


export default function NewsListingRenderer(data: any, routes: any) {
  return (
    <main className="min-h-screen">
      <div className="px-12 mb-20">
        <h1 className="text-4xl font-bold mb-12">Latest News</h1>
        <NewsListing block={data} />
      </div>
    </main>
  );
}
