/** @format */

"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Button,
  Textarea,
} from "@/common/components";
import { Facebook, Twitter, Linkedin } from "lucide-react";

const ShareDialog = ({ isOpen, onClose, postContent }) => {
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = (platform) => {
    console.log(
      `Sharing to ${platform}: ${shareMessage}\n\nOriginal post: ${postContent}`
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Add a message (optional)"
            value={shareMessage}
            onChange={(e) => setShareMessage(e.target.value)}
          />
          <div className="flex justify-around">
            <Button onClick={() => handleShare("Facebook")} variant="outline">
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button onClick={() => handleShare("Twitter")} variant="outline">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </Button>
            <Button onClick={() => handleShare("LinkedIn")} variant="outline">
              <Linkedin className="mr-2 h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareDialog;
