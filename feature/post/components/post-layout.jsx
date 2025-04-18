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
  const userAvatar = "ccc"; // This would typically come from user data
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  useEffect(() => {
    console.log("men render oluraam in post useffect");
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
        console.log("postLayout useEffect getPosts error", error);
      });
  }, []);

  const handleCreatePost = (content, image) => {
    console.log("data", posts);
    const newPost = {
      _id: Date.now(),
      title: `Post by ${currentUser}`,
      content,
      image,
      // author: currentUser,
      user: { userName: currentUser, avatar: userAvatar },
      // timeStamp,
      reactions: [],
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };
  console.log("postCreate", posts);
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

  const handleDelete = async () => {
    console.log("post to delete", postToDelete);

    if (!postToDelete) return;
    console.log("line -2");
    try {
      const response = await deletePost(postToDelete);
      console.log("response --", response);
      if (response.success) {
        setPosts(posts.filter((post) => post._id !== postToDelete));
        setIsDeleteDialogOpen(false);
        setPostToDelete(null);
      }
    } catch (error) {
      console.log("post-layout handle delet error", error);
    }
  };

  const handleReact = (postId, user, reactionType) => {
    setPosts(
      posts.map((post) =>
        post._id === postId
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
        post._id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: Date.now(),
                  // author: currentUser,
                  user: currentUser,
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
        currentUser={currentUser}
        userAvatar={userAvatar}
        setPosts={setPosts}
        posts={posts}
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
          setPostToDelete={setPostToDelete}
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
