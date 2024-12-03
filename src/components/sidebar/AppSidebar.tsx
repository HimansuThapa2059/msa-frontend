import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Cat, ChartPie, Clapperboard, Film, LayoutGrid } from "lucide-react";
import { Link, useLocation } from "react-router";
import { SidebarUser } from "./SidebarUser";

export function AppSidebar() {
  const location = useLocation();

  const items = [
    {
      title: "All",
      url: "/all",
      icon: LayoutGrid,
    },
    {
      title: "Movie",
      url: "/movie",
      icon: Film,
    },
    {
      title: "Series",
      url: "/series",
      icon: Clapperboard,
    },
    {
      title: "Anime",
      url: "/anime",
      icon: Cat,
    },
    {
      title: "others",
      url: "/others",
      icon: ChartPie,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          to="#"
          className="flex gap-2 items-center p-1  hover:bg-gray-100 rounded-lg"
        >
          <img src="/logo.png" alt="logo" className="w-10 h-10" />
          <p className="font-bold text-2xl">
            MSA<span className="text-xl">s</span>
          </p>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="pl-2">
            <SidebarMenu>
              {items.map((item) => {
                const isActive = location.pathname === item.url;

                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={`rounded-lg ${
                      isActive ? "bg-slate-300/60 hover:bg-slate-300/60" : ""
                    }`}
                  >
                    <SidebarMenuButton
                      asChild
                      className={`${isActive ? "hover:bg-transparent" : ""}`}
                    >
                      <Link to={item.url}>
                        <item.icon className="h-6 w-6 scale-105" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
}
