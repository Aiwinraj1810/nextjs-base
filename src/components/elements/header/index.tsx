//nextjs-base\src\components\elements\header\index.tsx

import { getCurrentLocale } from "@/app/locales/server";
import { getNavigationMenu } from "@/lib/methods.server";
import HeaderContent from "./HeaderContent";

export default async function Header() {
  const locale = await getCurrentLocale();
  const navItems = await getNavigationMenu("main-navigation", locale);

  return <HeaderContent navItems={navItems} />;
}
