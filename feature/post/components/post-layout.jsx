/** @format */

"use client";

import { useState } from "react";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import EditPostDialog from "./edit-post-dialog";
import Post from "./post";

export default function PostLayout() {
  const currentUser = "Current User"; // This would typically come from an authentication system

  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      content:
        "This is the content of my first post using shadcn/ui components. It's simple yet elegant!",
      author: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: [],
      comments: [],
    },
    {
      id: 2,
      title: "Another Great Post",
      content:
        "Here's another post to demonstrate how the 3-dot menu works with multiple posts.",
      author: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      likes: [],
      comments: [],
    },
  ]);

  const [editingPost, setEditingPost] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  const handleEdit = (post) => {
    setEditingPost(post);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = (updatedPost) => {
    setPosts(
      posts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
    );
    setIsEditDialogOpen(false);
    setEditingPost(null);
  };

  const handleDeleteConfirm = (postId) => {
    setPostToDelete(postId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setPosts(posts.filter((post) => post.id !== postToDelete));
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleLike = (postId, user) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              likes: post.likes.includes(user)
                ? post.likes.filter((likeUser) => likeUser !== user)
                : [...post.likes, user],
            }
          : post
      )
    );
  };

  const handleAddComment = (postId, content) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  author: currentUser,
                  avatar: "/placeholder.svg?height=32&width=32",
                  content,
                },
              ],
            }
          : post
      )
    );
  };

  const closeEditDialog = () => {
    setIsEditDialogOpen(false);
    setEditingPost(null);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-6">My Posts</h1>

      {posts.map((post) => (
        <Post
          key={post.id}
          {...post}
          currentUser={currentUser}
          onEdit={handleEdit}
          onDeleteConfirm={handleDeleteConfirm}
          onLike={handleLike}
          onAddComment={handleAddComment}
        />
      ))}

      {editingPost && (
        <EditPostDialog
          post={editingPost}
          isOpen={isEditDialogOpen}
          onClose={closeEditDialog}
          onSave={handleSaveEdit}
        />
      )}

      <DeleteConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
      />
    </main>
  );
}
