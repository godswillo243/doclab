import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { icons } from "@/constants/icons";

export const RootSidebarNewDropdown = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"secondary"} size={"lg"} className="">
            <img src={icons.plus} className="size-6" /> New
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit p-2">
          <DropdownMenuItem className="w-fit">
            <img src={icons.addFile} className="size-6" /> Create document
          </DropdownMenuItem>
          <DropdownMenuItem>
            <img src={icons.uploadFile} className="size-6" />
            Upload document
          </DropdownMenuItem>
          <DropdownMenuItem className="w-fit">
            <img src={icons.addFolder} className="size-6" /> New folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
