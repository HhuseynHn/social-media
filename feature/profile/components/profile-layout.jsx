/** @format */

import React from "react";
import PostLayout from "../../post/components/post-layout";
import Profile from "./profile";

const ProfileLayout = () => {
  return (
    <>
      <main className="w-full">
        <section className="w-full">
          <Profile />
        </section>
        <section>
          <PostLayout />
        </section>
      </main>
    </>
  );
};

export default ProfileLayout;
