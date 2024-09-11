import { ProfilePhotoProvider } from "./components/profilePhotoContext";
import DashboardNav from "./components/navbar/Navbar";
import "./dashboard.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./components/profile/Profile";
import AllChallenges from "./components/allChallenges/AllChallenges";
import EnrolledChallenges from "./components/enrolledChallenges/enrolledChallenges";
import PendingChallenges from "./components/pendingChallenges/pendingChallenges";
import CompletedChallenges from "./components/completedChallenges/completedChallenges";
import Leaderboard from "./components/leaderboard/Leaderboard";
import ProtectedRoute from "../protectedRoute";

export default function Dashboard() {
  return (
    <ProfilePhotoProvider>
      <DashboardNav />
      <div className="dashboardContent px-3 px-lg-5 py-3 py-lg-4">
        <Routes>
          <Route path="/" element={<Navigate to="all-challenges" />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="all-challenges"
            element={
              <ProtectedRoute>
                <AllChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="enrolled-challenges"
            element={
              <ProtectedRoute>
                <EnrolledChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="pending-challenges"
            element={
              <ProtectedRoute>
                <PendingChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="completed-challenges"
            element={
              <ProtectedRoute>
                <CompletedChallenges />
              </ProtectedRoute>
            }
          />
          <Route
            path="leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ProfilePhotoProvider>
  );
}
