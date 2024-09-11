import React, { createContext, useState, useContext } from "react";

// Create context
const ProfilePhotoContext = createContext();

// Create a custom hook to use the context
export const useProfilePhoto = () => useContext(ProfilePhotoContext);

// Create a provider component
export const ProfilePhotoProvider = ({ children }) => {
    const [profilePhotoURL, setProfilePhotoURL] = useState(null);

    // Method to update profile photo URL
    const updateProfilePhotoURL = (url) => {
        setProfilePhotoURL(url);
        sessionStorage.setItem("profilePhotoURL", url); // Also set in session storage
    };

    return (
        <ProfilePhotoContext.Provider value={{ profilePhotoURL, updateProfilePhotoURL }}>
            {children}
        </ProfilePhotoContext.Provider>
    );
};
