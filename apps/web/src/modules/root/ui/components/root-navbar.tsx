import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { RootNavbarSearchbar } from "./root-navbar-searchbar";

export const RootNavbar = () => {
  return (
    <div className="w-full py-2 px-4 flex items-center justify-between gap-4 bg-background border-b">
      <span className="font-bold text-2xl">
        <Link to="/home">Doclab</Link>
      </span>
      <RootNavbarSearchbar />
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
};
