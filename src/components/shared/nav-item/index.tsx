"use client";

import React from "react";
import { usePathname } from "next/navigation";

import { NavBarProps } from "@/components/helpers/interfaces/nav-bar";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavItemProps {
  item: NavBarProps;
}

export default function NavItem({ item }: NavItemProps) {
  const path = usePathname();
  const isActive = path.startsWith(`/docs/${item.category.toLowerCase()}`);

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(isActive && "font-bold bg-slate-500")}
      >
        {item.name}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          {item.items.map((component) => (
            <Link
              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
              key={component.title}
              href={component.href}
            >
              <div className="text-sm font-medium leading-none">{component.title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {component.description}
              </p>
            </Link>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}