/** @format */

import PostLayout from "@/feature/post/components/post-layout";
import StoriesCarousel from "@/feature/storie/stories-corusel";
import React from "react";

const HomePage = () => {
  console.log("men render oluraam in home page");
  return (
    <>
      <main>
        <section className="w-9/12 mx-auto flex justify-center flex-col ">
          <StoriesCarousel />
          <PostLayout />
        </section>
      </main>
    </>
  );
};

export default HomePage;
