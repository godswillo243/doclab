import { cn } from "@/lib/utils";
import { RootSidebarNewDropdown } from "./root-sidebar-new-dropdown";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { icons } from "@/constants/icons";
import { Separator } from "@/components/ui/separator";

interface SidebarNavListItemProps {
  icon: string;
  label: string;
  href: string;
}

const SidebarNavListItem = ({ href, icon, label }: SidebarNavListItemProps) => {
  const { pathname } = useLocation();
  const isActive = pathname === href;
  return (
    <Link to={href} className="w-full">
      <Button
        variant={"ghost"}
        className={cn(
          isActive && "bg-accent text-accent-foreground",
          "p-2 h-auto w-full justify-start",
        )}
      >
        <img src={icon} className="size-6" />
        {label}
      </Button>
    </Link>
  );
};

export const RootSidebar = () => {
  return (
    <aside
      className={cn(
        "min-w-48 flex flex-col items-start gap-4 border-r h-full p-4",
      )}
    >
      <RootSidebarNewDropdown />
      <div className="w-full flex flex-col gap-2">
        <SidebarNavListItem href="/home" icon={icons.home} label="Home" />
        <SidebarNavListItem
          href="/my-folders"
          icon={icons.folder}
          label="My Folders"
        />
        <SidebarNavListItem
          href="/shared-with-me"
          icon={icons.share}
          label="Shared with me"
        />
        <SidebarNavListItem href="/recent" icon={icons.recent} label="Recent" />
        <Separator />
        <SidebarNavListItem href="/trash" icon={icons.trash} label="Trash" />
      </div>
    </aside>
  );
};
