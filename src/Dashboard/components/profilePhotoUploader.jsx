import React, { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useProfilePhoto } from "./profilePhotoContext";

const ProfilePhotoUploader = () => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { updateProfilePhotoURL } = useProfilePhoto(); // Get the update function from context

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && file) {
      const storage = getStorage();
      const storageRef = ref(storage, `profilePhotos/${user.uid}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(0));
        },
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const db = getDatabase();
            const userProfileRef = dbRef(db, `users/${user.uid}/profilePhoto`);
            set(userProfileRef, downloadURL);

            // Update the context state and session storage
            updateProfilePhotoURL(downloadURL);

            setShowFileInput(false);
            setFile(null);
            setUploadProgress(0);
          });
        }
      );
    }
  };

  return (
    <div>
      {!showFileInput ? (
        <>
          <h6 style={{ fontSize: "var(--small_txt)", fontWeight: "400" }}>
            Change Profile Photo:
          </h6>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setShowFileInput(true)}
          >
            Change Photo
          </button>
        </>
      ) : (
        <form onSubmit={handleUpload}>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control shadow-none"
              accept="image/*"
              id="inputGroupFile02"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => setShowFileInput(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-success btn-sm"
              disabled={!file}
            >
              {uploadProgress ? `Uploaded - ${uploadProgress}%` : "Submit"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
