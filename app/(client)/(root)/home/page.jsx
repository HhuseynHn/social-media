/** @format */

import PostLayout from "@/feature/post/components/post-layout";
import React from "react";

const HomePage = () => {
  return (
    <>
      <main>
        <section className="w-9/12 mx-auto flex justify-center">
          <PostLayout />
        </section>
      </main>
    </>
  );
};

export default HomePage;
