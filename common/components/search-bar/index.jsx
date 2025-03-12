/** @format */

import React from "react";
import { Button, Input, Avatar, AvatarFallback, AvatarImage } from "..";
import { IoIosSearch } from "react-icons/io";
import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const mockProfiles = [
    {
      id: 1,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "Alex Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: 7, name: "Sam Wilson", image: "/placeholder.svg?height=40&width=40" },
    {
      id: 8,
      name: "Taylor Smith",
      image: "/placeholder.svg?height=40&width=40",
    },
    { id: 9, name: "Jordan Lee", image: "/placeholder.svg?height=40&width=40" },
    {
      id: 10,
      name: "Casey Brown",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 11,
      name: "Riley Davis",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 12,
      name: "Morgan White",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 13,
      name: "Jamie Green",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 14,
      name: "Quinn Taylor",
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 15,
      name: "Avery Martinez",
      image: "/placeholder.svg?height=40&width=40",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isScrollable, setIsScrollable] = useState(false);
  const resultsRef = useRef(null);
  const searchContainerRef = useRef(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);

    setTimeout(() => {
      const results = mockProfiles.filter((profile) =>
        profile.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  useEffect(() => {
    if (resultsRef.current) {
      const isOverflowing = resultsRef.current.scrollHeight > 300;
      setIsScrollable(isOverflowing);
    }
  }, [searchResults]);

  return (
    <>
      {/* <div className="w-72 relative">
        <Input
          className="rounded-2xl h-8 placeholder:text-[12px]"
          placeholder="Search"
        />

        <Button className="bg-transparent absolute top-[2px] shadow-none hover:bg-inherit dark:text-black active:scale-150  pr-[12px] border-0 outline-0 text-current right-0 rounded-2xl py-0 h-[28px]">
          <IoIosSearch />
        </Button>
      </div> */}
      {/* ---------------------------- */}

      <div className="w-full max-w-md mx-auto">
        {/* <div className="flex w-full items-center space-x-2 mb-4"> */}
        <div className="w-72 relative">
          <Input
            className="rounded-2xl h-8 placeholder:text-[12px]"
            type="text"
            placeholder="Search profiles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            // className="flex-1"
          />
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="bg-transparent absolute top-[2px] shadow-none hover:bg-inherit dark:text-black active:scale-150  pr-[12px] border-0 outline-0 text-current right-0 rounded-2xl py-0 h-[28px]">
            {isSearching ? (
              <div className="!size-3 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            ) : (
              <Search className=" text-gray-700 !size-3.5" />
            )}
          </Button>
        </div>

        {searchResults.length > 0 ? (
          <div className="space-y-2 absolute z-50 w-72 ">
            <div className="border rounded-lg overflow-hidden">
              <div
                ref={resultsRef}
                className={`${
                  isScrollable ? "max-h-[300px] overflow-y-auto" : ""
                }`}>
                {searchResults.map((profile) => (
                  <div
                    key={profile.id}
                    className="flex  items-center p-0.5 hover:bg-muted transition-colors border-b last:border-b-0">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={profile.image} alt={profile.name} />
                      <AvatarFallback>
                        {profile.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{profile.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2">
                Search Results ({searchResults.length})
              </h3>
            </div>
          </div>
        ) : searchQuery && !isSearching ? (
          <div className="text-center p-4 text-muted-foreground absolute">
            No profiles found matching "{searchQuery}"
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SearchBar;
