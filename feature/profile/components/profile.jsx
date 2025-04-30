/** @format */

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Card,
  CardContent,
  Button,
  Textarea,
  Label,
  Input,
} from "@/common/components";
import { Camera, Pencil, Trash2, X } from "lucide-react";
import {
  deleteUser,
  getMe,
  updateAvatar,
  updateBackground,
  updateUser,
} from "../services/profile-service";

import defaultProfile from "../images/default-profile.jpg";
import defaultBgc from "../images/default-bgc.jpg";
import { deletePost } from "@/feature/post/services/post-service";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    userName: "",
    bio: "",
    title: "",
    location: "",
    avatar: "",
    backgroundCover: "",
  });
  useEffect(() => {
    getMe().then((res) => {
      setUser({
        ...user,
        ...res.data,
      });
    });
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [newProfileImage, setNewProfileImage] = useState(null);
  const [newBackgroundImage, setNewBackgroundImage] = useState(null);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleDeleteProfile = async () => {
    const { success } = await deleteUser();
    if (success) {
      setIsDeleteDialogOpen(false);
      router.push("/register");
    }
  };

  const handleProfileImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const { success, data } = await updateAvatar(file);
      if (success) {
        setUser({
          ...user,
          avatar: data.avatar,
        });
      }
    }
  };

  const handleBackgroundImageChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const { success, data } = await updateBackground(file);
      if (success) {
        setUser({
          ...user,
          backgroundCover: data.backgroundCover,
        });
      }
    }
  };

  const handleCancelProfileImage = () => {
    setNewProfileImage(null);
  };

  const handleCancelBackgroundImage = () => {
    setNewBackgroundImage(null);
  };

  const handleSaveProfile = async () => {
    // setProfile({
    //   ...profile,
    // });

    //sanki yeni obj yarandi amma  bi, pi sildi. ve rest obj menimsetdi.
    const { backgroundCover, _id, __v, avatar, ...rest } = user;

    const { success, data } = await updateUser(rest);
    if (success) {
      setUser({
        ...user,
        ...data.data,
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="container-xl mx-auto pt-0 pb-4 px-4">
      <Card className="w-full mx-auto overflow-hidden">
        <div className="relative h-48 sm:h-64 w-full group">
          <Image
            src={user.backgroundCover.url || defaultBgc}
            alt="Profile background"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <label
              htmlFor="background-image-upload"
              className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <div className="bg-background rounded-full p-2">
                <Camera className="h-6 w-6" />
              </div>
              <input
                id="background-image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBackgroundImageChange}
              />
            </label>
            {newBackgroundImage && (
              <button
                onClick={handleCancelBackgroundImage}
                className="absolute top-2 right-2 bg-background rounded-full p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="relative px-6">
          <div className="absolute -top-16 left-6 border-4 border-background rounded-full group">
            <div className="relative w-32 h-32">
              <Image
                src={user.avatar.url || defaultProfile}
                alt="Profile picture"
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-full flex items-center justify-center">
                <label
                  htmlFor="profile-image-upload"
                  className="cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="bg-background rounded-full p-2">
                    <Camera className="h-5 w-5" />
                  </div>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                </label>
                {newProfileImage && (
                  <button
                    onClick={handleCancelProfileImage}
                    className="absolute bottom-0 right-0 bg-background rounded-full p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* --- */}

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={handleEditProfile}
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
            <Dialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete your profile?
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteProfile}>
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <CardContent className="pt-12 pb-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={user.userName}
                  onChange={(e) =>
                    setUser({ ...user, userName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={user.title}
                  onChange={(e) => setUser({ ...user, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={user.location}
                  onChange={(e) =>
                    setUser({ ...user, location: e.target.value })
                  }
                />
              </div>
              <Button onClick={handleSaveProfile} className="mt-4">
                Save Changes
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold">{user?.userName}</h1>
                <p className="text-muted-foreground">{user?.title}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-muted-foreground">{user?.bio}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Location
                  </h3>
                  <p>{user?.location}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

//
