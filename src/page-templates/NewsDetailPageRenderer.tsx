import NewsBanner from "@/components/blocks/banners/NewsBanner";
import RelatedNews from "@/components/blocks/listing/RelatedNews";

export default function NewsDetailPageRenderer(data: any, routes: any) {
  const article = data?.data?.[0]?.attributes;

  return (
    <article className="min-h-screen">
      {/* Banner */}
      {article && <NewsBanner data={article} />}

      {/* Article content */}
      <div className="prose mx-auto max-w-4xl px-12 py-16">
        <div
          dangerouslySetInnerHTML={{
            __html: article?.Content || "",
          }}
        />
      </div>

      {/* Related News */}
      {article?.related_articles?.data?.length > 0 && (
        <RelatedNews data={article.related_articles} />
      )}
    </article>
  );
}
