import React, { useEffect } from "react";
import { Avatar } from "@mui/material";
import defaultProfilePhoto from "../../assets/images/default_profile_img.png";
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useProfilePhoto } from "./profilePhotoContext";

const ProfilePhotoDisplay = ({ size }) => {
  const { profilePhotoURL, updateProfilePhotoURL } = useProfilePhoto(); // Get both URL and update function from context

  useEffect(() => {
    const sessionPhoto = sessionStorage.getItem("profilePhotoURL");
    if (sessionPhoto) {
      updateProfilePhotoURL(sessionPhoto); // Use the context function to update state, don't reassign the variable directly
    } else {
      // If not in session storage, fetch from Firebase
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const db = getDatabase();
        const userProfileRef = dbRef(db, `users/${user.uid}/profilePhoto`);

        onValue(userProfileRef, (snapshot) => {
          if (snapshot.exists()) {
            const photoURL = snapshot.val();
            sessionStorage.setItem("profilePhotoURL", photoURL); // Save in sessionStorage
            updateProfilePhotoURL(photoURL); // Update context state
          } else {
            updateProfilePhotoURL(""); // If no profile photo exists, reset to default
          }
        });
      }
    }
  }, [updateProfilePhotoURL]); // Add updateProfilePhotoURL as a dependency

  return (
    <Avatar
      src={profilePhotoURL || defaultProfilePhoto} // Fallback to default avatar
      alt="Profile Photo"
      sx={{ width: size, height: size }}
    />
  );
};

export default ProfilePhotoDisplay;
