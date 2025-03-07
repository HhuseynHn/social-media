/** @format */

"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/common/components";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const stories = [
  {
    id: 1,
    username: "sarah_j",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: false,
  },
  {
    id: 2,
    username: "mike_design",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: false,
  },
  {
    id: 3,
    username: "travel_lisa",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: true,
  },
  {
    id: 4,
    username: "photo_chris",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: false,
  },
  {
    id: 5,
    username: "alex_dev",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: true,
  },
  {
    id: 6,
    username: "fitness_jen",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: false,
  },
  {
    id: 7,
    username: "food_mark",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: false,
  },
  {
    id: 8,
    username: "art_emma",
    avatar: "/placeholder.svg?height=40&width=40",
    image: "/placeholder.svg?height=800&width=450",
    viewed: true,
  },
];

export default function StoriesCarousel() {
  const [activeStory, setActiveStory] = useState(null);
  const [viewedStories, setViewedStories] = useState(
    stories.filter((story) => story.viewed).map((story) => story.id)
  );

  const handleStoryClick = (storyId) => {
    setActiveStory(storyId);
    if (!viewedStories.includes(storyId)) {
      setViewedStories([...viewedStories, storyId]);
    }
  };

  const handleCloseStory = () => {
    setActiveStory(null);
  };

  const handleNextStory = () => {
    if (activeStory === null) return;

    const currentIndex = stories.findIndex((story) => story.id === activeStory);
    if (currentIndex < stories.length - 1) {
      const nextStoryId = stories[currentIndex + 1].id;
      setActiveStory(nextStoryId);
      if (!viewedStories.includes(nextStoryId)) {
        setViewedStories([...viewedStories, nextStoryId]);
      }
    } else {
      setActiveStory(null);
    }
  };

  const handlePrevStory = () => {
    if (activeStory === null) return;

    const currentIndex = stories.findIndex((story) => story.id === activeStory);
    if (currentIndex > 0) {
      const prevStoryId = stories[currentIndex - 1].id;
      setActiveStory(prevStoryId);
    }
  };

  const activeStoryData = stories.find((story) => story.id === activeStory);

  return (
    <div className="w-full max-w-[670px] mx-auto px-6 py-6 shadow rounded-xl bg-card text-card-foreground border">
      <h2 className="text-xl font-bold mb-4">Stories</h2>

      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {stories.map((story) => (
            <CarouselItem key={story.id} className="pl-2 md:pl-4 basis-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => handleStoryClick(story.id)}>
                    <div
                      className={`rounded-full p-[2px] ${
                        viewedStories.includes(story.id)
                          ? "bg-gray-300"
                          : "bg-gradient-to-tr from-yellow-400 to-fuchsia-600"
                      }`}>
                      <Avatar className="h-16 w-16 border-2 border-white">
                        <AvatarImage src={story.avatar} alt={story.username} />
                        <AvatarFallback>
                          {story.username.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300"></div>
                    <span className="text-xs truncate max-w-[70px] mt-1 block text-center">
                      {story.username}
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md p-0 border-none bg-transparent">
                  <div className="relative w-full max-h-[80vh] bg-black rounded-lg overflow-hidden">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 text-white bg-black/30 hover:bg-black/50 rounded-full"
                      onClick={handleCloseStory}>
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>

                    <div className="flex items-center p-3 bg-black/30 absolute top-0 left-0 right-0 z-10">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={activeStoryData?.avatar}
                          alt={activeStoryData?.username}
                        />
                        <AvatarFallback>
                          {activeStoryData?.username
                            .substring(0, 2)
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white font-medium">
                        {activeStoryData?.username}
                      </span>
                    </div>

                    <Image
                      src={activeStoryData?.image || ""}
                      alt="Story"
                      width={450}
                      height={800}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />

                    <Button
                      variant="ghost"
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-1/4 bg-transparent hover:bg-black/10"
                      onClick={handlePrevStory}>
                      <ChevronLeft className="h-8 w-8 text-white/70" />
                      <span className="sr-only">Previous story</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="absolute right-0 top-1/2 -translate-y-1/2 h-full w-1/4 bg-transparent hover:bg-black/10"
                      onClick={handleNextStory}>
                      <ChevronRight className="h-8 w-8 text-white/70" />
                      <span className="sr-only">Next story</span>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-4">
          <CarouselPrevious className="static transform-none" />
          <CarouselNext className="static transform-none" />
        </div>
      </Carousel>
    </div>
  );
}
