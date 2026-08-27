import { RootLayout } from "@/modules/root/ui/layouts/root-layout";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(root)")({
  component: () => (
    <RootLayout>
      <Outlet />
    </RootLayout>
  ),
});
