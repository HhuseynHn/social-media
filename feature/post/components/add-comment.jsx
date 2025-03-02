/** @format */

"use client";

import { useState } from "react";
import { Button } from "@/common/components";
import { Textarea } from "@/common/components";
import { Avatar, AvatarFallback, AvatarImage } from "@/common/components";

const AddComment = ({ onAddComment, userAvatar }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-start space-x-2 mt-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={userAvatar} />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
        className="flex-grow"
      />
      <Button type="submit" size="sm">
        Post
      </Button>
    </form>
  );
};

export default AddComment;
