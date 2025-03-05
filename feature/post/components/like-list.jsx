/** @format */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
  ScrollArea,
} from "@/common/components";

const LikeList = ({ likes }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="link" className="h-auto p-0">
          {likes.length} {likes.length === 1 ? "person" : "people"} liked this
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {likes.map((user, index) => (
              <div key={index} className="text-sm">
                {user}
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default LikeList;
