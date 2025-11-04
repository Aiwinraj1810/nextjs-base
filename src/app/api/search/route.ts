import { getCurrentLocale } from "@/app/locales/server";
import { getSearchResults } from "@/lib/methods";
import { SearchProps } from "@/typings/search";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const { keyword, model, ...rest }: Record<string, any> = Object.fromEntries(
    searchParams.entries()
  );

  const locale = await getCurrentLocale();
  const data: SearchProps = await getSearchResults(
    {
      model: model === "all" ? undefined : model,
      search_keyword: keyword,
    },
    locale
  );

  return NextResponse.json({ data: data?.data });
}
