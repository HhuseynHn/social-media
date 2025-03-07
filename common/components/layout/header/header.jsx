/** @format */
"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import Bell from "../../icons/bell";
import Message from "../../icons/message";
import LanguageSwitch from "../../language-switch";
import Account from "../../profile-account";
import SearchBar from "../../search-bar";
import { ModeToggle } from "../../theme/mode-togle";
export const Header = () => {
  const { theme } = useTheme();
  return (
    <>
      <header className="bg-white px-10 py-8 dark:bg-zinc-950 dark:text-white shadow border mb-6 ">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <div className="relative w-11 h-11">
              <Image
                className="dark:bg-white border rounded-full"
                src={
                  theme === "dark"
                    ? "/image/logo/fcbke-drkmd.png"
                    : "/image/logo/facebook-color.svg"
                }
                layout="fill"
                alt="Facebook logo"
              />
            </div>
            <div>
              <SearchBar />
            </div>
          </div>
          <nav>
            <ul className="flex items-center gap-x-7">
              <li>
                <LanguageSwitch />
              </li>
              <li>
                <ModeToggle />
              </li>
              <li></li>
              <li>
                <Message />
              </li>
              <li>
                <Bell />
              </li>
              <li>
                <Account />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};
