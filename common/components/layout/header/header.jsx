/** @format */

import Image from "next/image";
import React from "react";
import Bell from "../../icons/bell";
import Message from "../../icons/message";
import LanguageSwitch from "../../language-switch";
import Account from "../../profile-account";
import SearchBar from "../../search-bar";
import { ModeToggle } from "../../theme/mode-togle";
export const Header = () => {
  return (
    <>
      <header className="bg-white px-10 py-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-x-4 items-center">
            <div className="text-blue-700 relative w-11 h-11">
              <Image
                src={"/image/logo/facebook-color.svg"}
                layout="fill"
                alt="facebook logo"
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
