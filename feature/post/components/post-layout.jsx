/** @format */

"use client";

import { useEffect, useState } from "react";
import Post from "./post";
import CreatePost from "./create-post";
import EditPostDialog from "./edit-post-dialog";
import DeleteConfirmDialog from "./delete-confirm-dialog";
import { deletePost, getPosts } from "../services/post-service";

export default function PostLayout() {
  const currentUser = "Current User"; // This would typically come from an authentication system
  const userAvatar = "/placeholder.svg?height=40&width=40"; // This would typically come from user data

  const [posts, setPosts] = useState([]);

  // [
  //   {
  //     id: 1,
  //     title: "My First Post",
  //     content:
  //       "This is the content of my first post using shadcn/ui components. It's simple yet elegant!",
  //     author: "John Doe",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     reactions: [],
  //     comments: [],
  //     image: null,
  //   },
  //   {
  //     id: 2,
  //     title: "Another Great Post",
  //     content:
  //       "Here's another post to demonstrate how the 3-dot menu works with multiple posts.",
  //     author: "Jane Smith",
  //     avatar: "/placeholder.svg?height=40&width=40",
  //     reactions: [],
  //     comments: [],
  //     image: null,
  //   },
  // ];
  const [editingPost, setEditingPost] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    getPosts()
      .then((data) => {
        if (data.success) {
          console.log("Data-", data.data);

          const transformData = data.data.map((e) => {
            return {
              ...e,
              reactions: [],
              image: null,
            };
          });
          setPosts(transformData);
        }
      })
      .catch((error) => {
        console.log("err", error);
      });
  }, []);

  const handleCreatePost = (content, image) => {
    const newPost = {
      id: Date.now(),
      title: `Post by ${currentUser}`,
      content,
      image,
      author: currentUser,
      // avatar: userAvatar,
      reactions: [],
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

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

  const handleDelete = async (postId) => {
    console.log(postId);
    // if (!postToDelete) return;
    // try {
    //   const response = await deletePost(postToDelete);
    //   if (response.success) {
    //     const updatePosts = await
    //   }
    // } catch (error) {}
    // setPosts(posts.filter((post) => post.id !== postToDelete));
    setIsDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  const handleReact = (postId, user, reactionType) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              reactions: post.reactions.some((r) => r.user === user)
                ? post.reactions.map((r) =>
                    r.user === user ? { ...r, type: reactionType } : r
                  )
                : [...post.reactions, { user, type: reactionType }],
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
                  avatar: userAvatar,
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
    <main className="flex min-h-screen flex-col items-center p-6">
      <CreatePost
        onCreatePost={handleCreatePost}
        currentUser={currentUser}
        userAvatar={userAvatar}
      />

      {posts.map((post) => (
        <Post
          key={post._id}
          {...post}
          currentUser={currentUser}
          onEdit={handleEdit}
          onDeleteConfirm={handleDeleteConfirm}
          onReact={handleReact}
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
        onConfirm={() => handleDelete()}
      />
    </main>
  );
}
