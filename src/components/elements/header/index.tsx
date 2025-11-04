import { getCurrentLocale } from "@/app/locales/server";
import { getNavigationMenu } from "@/lib/methods";
import HeaderContent from "./HeaderContent";

export default async function Header() {
  const locale = await getCurrentLocale();
  const navItems = await getNavigationMenu("main-navigation", locale);

  return <HeaderContent navItems={navItems} />;
}
