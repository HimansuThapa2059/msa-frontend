import { buttonVariants } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link, Outlet, useLocation } from "react-router";

import { AppSidebar } from "@/components/sidebar/AppSidebar";

import { Plus } from "lucide-react";

const Layout = () => {
  const pathname = useLocation().pathname;
  const path =
    pathname.charAt(1).toUpperCase() + pathname.slice(2).toLowerCase();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex   h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-2" />

          <div className="flex w-full justify-between items-center p-3 pr-8">
            <h1 className=" font-semibold text-4xl">{path}</h1>
            <Link to={"/new"} className={buttonVariants({ size: "lg" })}>
              <Plus />
              <span>Add new</span>
            </Link>
          </div>
        </header>
        <main className="h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
