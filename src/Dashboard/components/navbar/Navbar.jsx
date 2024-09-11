import "./Navbar.css";
import navLogo from "../../../assets/icons/landingLogo.svg";
import { NavLink } from "react-router-dom";
import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import ProfilePhotoDisplay from "../profilePhotoDisplay";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

export default function DashboardNav() {
  const [isFetching, setIsFetching] = useState(true);
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const fetchUserNameEmail = async (user) => {
    const userRef = ref(db, `users/${user.uid}`);
    try {
      const snapshot = await get(userRef);
      const userData = snapshot.val();
      setUserFullName(userData.fullName);
      setUserEmail(userData.emailAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserNameEmail(user); // Fetch user data only if user is logged in
      } else {
        setIsFetching(false); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener when the component unmounts
  }, []);

  return (
    <>
      {/* Nav Bar */}
      <nav
        className="navbar navbar-expand-lg px-3 px-lg-5"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        <div className="container-fluid p-0">
          <img src={navLogo} alt="" id="navLogo" />
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-4 gap-3">
              <li className="nav-item dropdown">
                <p
                  className="nav-link dropdown-toggle m-0"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Challenges
                </p>
                <ul
                  className="dropdown-menu rounded-0 border-0 px-3"
                  style={{ backgroundColor: "#f0f0f0" }}
                >
                  <li>
                    <NavLink
                      to="all-challenges"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item activeLink" : "dropdown-item"
                      }
                    >
                      All Challenges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="enrolled-challenges"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item activeLink" : "dropdown-item"
                      }
                    >
                      Enrolled Challenges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="pending-challenges"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item activeLink" : "dropdown-item"
                      }
                    >
                      Pending Challenges
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="completed-challenges"
                      className={({ isActive }) =>
                        isActive ? "dropdown-item activeLink" : "dropdown-item"
                      }
                    >
                      Completed Challenges
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink
                  to="profile"
                  className={({ isActive }) =>
                    isActive ? "nav-link activeLink" : "nav-link"
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="leaderboard"
                  className={({ isActive }) =>
                    isActive ? "nav-link activeLink" : "nav-link"
                  }
                >
                  Leaderboard
                </NavLink>
              </li>
            </ul>
          </div>
          <NavLink to="profile" className="d-none d-lg-block">
            <ProfilePhotoDisplay size={40} />
          </NavLink>
          <MenuOpenRoundedIcon
            className="d-block d-lg-none"
            style={{ cursor: "pointer" }}
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasExample"
            aria-controls="offcanvasExample"
          />
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close shadow-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="p-0 d-flex flex-column" id="mobileNavList">
            <li>
              <NavLink
                to="profile"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                <div id="mobileNavProfile">
                  <ProfilePhotoDisplay size={100} />
                  <ul>
                    <li>
                      {isFetching ? (
                        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
                      ) : (
                        userFullName
                      )}
                    </li>
                    <li>
                      {isFetching ? (
                        <Skeleton variant="text" sx={{ fontSize: ".7rem" }} />
                      ) : (
                        userEmail
                      )}
                    </li>
                    <li>
                      <p data-bs-dismiss="offcanvas">View Profile </p>
                    </li>
                  </ul>
                </div>
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink
                to="all-challenges"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                All Challenges
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink
                to="enrolled-challenges"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                Enrolled Challenges
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink
                to="pending-challenges"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                Pending Challenges
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink
                to="completed-challenges"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                Completed Challenges
              </NavLink>
            </li>
            <li data-bs-dismiss="offcanvas">
              <NavLink
                to="leaderboard"
                className={({ isActive }) =>
                  isActive ? "activeLinkMobile" : ""
                }
              >
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
