/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "..";
import { getMe } from "@/feature/profile/services/profile-service";
import Image from "next/image";

const Account = () => {
  const [userName, setUserName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getMe().then((res) => {
      setUserName(res.data.userName);
      setAvatar(res.data.avatar?.url);
    });
  }, []);
  return (
    <>
      <div className="cursor-pointer hover:text-slate-400">
        <Avatar>
          {avatar ? (
            <Image width={100} height={100} src={avatar} alt={userName} />
          ) : (
            <AvatarFallback>{userName[0]}</AvatarFallback>
          )}
        </Avatar>
      </div>
    </>
  );
};

export default Account;
