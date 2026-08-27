import { HomePage } from "@/modules/root/ui/pages/home";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(root)/home")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Doclab | Home",
      },
      {
        name: "Doclab | Home",
        content: "Welcome to My App, a platform for...",
      },
    ],
  }),
});
