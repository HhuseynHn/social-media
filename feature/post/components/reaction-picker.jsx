/** @format */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button,
} from "@/common/components";

const reactions = [
  { emoji: "👍", name: "Like" },
  { emoji: "❤️", name: "Love" },
  { emoji: "😆", name: "Haha" },
  { emoji: "😮", name: "Wow" },
  { emoji: "😢", name: "Sad" },
  { emoji: "😠", name: "Angry" },
];

const ReactionPicker = ({ onReact, currentReaction }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm">
          {currentReaction
            ? reactions.find((r) => r.name === currentReaction).emoji
            : "👍"}
          {currentReaction || "Like"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex space-x-2">
          {reactions.map((reaction) => (
            <Button
              key={reaction.name}
              variant="ghost"
              size="sm"
              onClick={() => onReact(reaction.name)}
              className="px-2">
              {reaction.emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ReactionPicker;
