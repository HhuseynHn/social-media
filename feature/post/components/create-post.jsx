/** @format */

"use client";

import { useState, useRef } from "react";
import {
  Button,
  Textarea,
  Card,
  CardContent,
  CardFooter,
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/common/components";
import { Image, X } from "lucide-react";

const CreatePost = ({ onCreatePost, currentUser, userAvatar }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim() || image) {
      onCreatePost(content, image);
      setContent("");
      setImage(null);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mb-6">
      <form onSubmit={handleSubmit}>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{currentUser[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-4">
              <Textarea
                placeholder={`What's on your mind, ${currentUser}?`}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full"
              />
              {image && (
                <div className="relative">
                  <img
                    src={image || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-full max-h-80 rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => setImage(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current.click()}>
            <Image className="mr-2 h-4 w-4" />
            Add Image
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button type="submit">Create Post</Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatePost;
