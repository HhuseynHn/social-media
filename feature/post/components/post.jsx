/** @format */

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/common/components";
import {
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import AddComment from "./add-comment";
import LikeList from "./like-list";

const Post = ({
  id,
  title,
  content,
  author,
  avatar,
  likes,
  comments,
  currentUser,
  onEdit,
  onDeleteConfirm,
  onLike,
  onAddComment,
}) => {
  const [showComments, setShowComments] = useState(false);
  const hasLiked = likes.includes(currentUser);

  return (
    <Card className="w-full max-w-2xl mb-4">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={avatar} alt={author} />
          <AvatarFallback>{author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{author}</p>
        </div>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => onEdit?.({ id, title, content })}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteConfirm?.(id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-col items-start">
        <div className="flex justify-between w-full mb-2">
          <Button
            variant={hasLiked ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onLike(id, currentUser)}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            {hasLiked ? "Unlike" : "Like"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Comment ({comments.length})
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        {likes.length > 0 && <LikeList likes={likes} />}
        {showComments && (
          <div className="w-full mt-2">
            {comments.map((comment, index) => (
              <div key={index} className="flex items-start space-x-2 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={comment.avatar} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{comment.author}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
            <AddComment
              onAddComment={(content) => onAddComment(id, content)}
              userAvatar={avatar}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default Post;
