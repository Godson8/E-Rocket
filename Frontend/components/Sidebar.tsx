"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "../lib/utils";
import Logo from "./Logo";
import LogoWhite from "./LogoWhite";
import axios from "axios";

const poppins = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Clients",
    href: "/dashboard/clients",
    color: "text-violet-500",
  },
  {
    label: "Registrants",
    href: "/dashboard/registrants",
    color: "text-violet-500",
  },
  {
    label: "Logout",
    color: "text-pink-700",
    href: "/image",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  // Function to handle logout
  const handleLogout = () => {
    axios
      .get("https://e-rocket-backend.onrender.com/logout")
      .then((res) => {
        router.push("/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <LogoWhite />
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <div key={route.href}>
              {route.label === "Logout" ? (
                <div
                  onClick={handleLogout}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href
                      ? "text-white bg-white/10"
                      : "text-zinc-400"
                  )}
                >
                  {route.label}
                </div>
              ) : (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href
                      ? "text-white bg-white/10"
                      : "text-zinc-400"
                  )}
                >
                  <div className="flex items-center flex-1">{route.label}</div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
