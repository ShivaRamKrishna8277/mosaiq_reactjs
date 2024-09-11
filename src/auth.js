import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, set } from "firebase/database";

// Sign-up Function
export const signUp = async (email, password) => {
    try {
        // Create a new user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Extract username from email
        let username = email.split("@")[0];

        // Save user data to the Realtime Database
        await set(ref(db, 'users/' + user.uid), {
            userId: user.uid,
            fullName: "",
            emailAddress: email,
            mobileNumber: "",
            userName: username,
            district: "",
            state: "",
            pincode: "",
            linkedin: "",
            github: "",
            instagram: "",
            enrolledChallenges: [],
            pendingChallenges: [],
            completedChallenges: [],
            profilePhoto: "",
            xp: 0,
        });
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign-In Function
export const signIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw new Error(error.message);
    }
};

// Sign-out Function
export const logOut = async () => {
    try {
        sessionStorage.removeItem("profilePhotoURL");
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};