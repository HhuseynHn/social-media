/** @format */
"use client";

import React, { useState } from "react";
import DeleteConfirmDialog from "../post/components/delete-confirm-dialog";

const Profile = () => {
  const [postDeleteOpen, setPostDeleteOpen] = useState(false);
  const handleDeleteConfirm = () => {
    setPostDeleteOpen(!postDeleteOpen);
  };

  const closeDeleteDialog = () => {
    setPostDeleteOpen(false);
  };
  const deleteProfile = () => {
    setPostDeleteOpen(false);
  };

  return (
    <>
      <div>
        <div>image</div>

        <div>
          <h2>Baktar Esedov</h2>
          <p>Node js Developer</p>
        </div>
        <div>
          <button>Edit my profile</button>
          <br />
          <button onClick={() => handleDeleteConfirm()}>
            Delete my profile
          </button>
          {postDeleteOpen && (
            <DeleteConfirmDialog
              isOpen={postDeleteOpen}
              onClose={closeDeleteDialog}
              onConfirm={deleteProfile}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
