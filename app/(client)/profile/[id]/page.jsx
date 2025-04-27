/** @format */

import { Header } from "@/common/components";
import ProfileLayout from "@/feature/profile/components/profile-layout";
import React from "react";

const ProfilePage = () => {
  return (
    <>
      <Header className="py-1 mb-1" />
      <ProfileLayout />
    </>
  );
};

export default ProfilePage;
