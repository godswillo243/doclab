import { Button } from "@/components/ui/button";
import { icons } from "@/constants/icons";
import { cn } from "@/lib/utils";

export const RootNavbarSearchbar = () => {
  return (
    <div
      className={cn(
        " flex-1 flex items-center justify-center gap-2 bg-muted rounded-full px-4 py-1 ",
        "max-w-lg",
      )}
    >
      <input
        placeholder="Search..."
        className={cn("w-full p-2 outline-0 ring-0")}
      />
      <Button variant={"ghost"} className="rounded-full" size={"icon-lg"}>
        <img src={icons.search} className="size-6" />{" "}
      </Button>
    </div>
  );
};
