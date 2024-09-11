import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./AllChallenges.css";
import allIcon from "../../../assets/icons/all_icon.png";
import categoriesData from "../../../assets/data/categoriesData";
import {
  faMagnifyingGlass,
  faTableList,
  faTableCellsLarge,
  faFilter,
  faTag,
  faFileLines,
  faStopwatch,
  faGaugeHigh,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import AllChallengesRow from "./AllChallengesRow";
import AllChallengesGrid from "./AllChallengesGrid";
import NoData from "../NoData/noData";
import StudentRankings from "../Rankings/StudentsRanking";
import CollegeRankings from "../Rankings/CollegeRanking";
import DetailsModal from "../detailsModal/DetailsModal";
import { db } from "../../../firebase";
import { get, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import ResultModal from "../resultModal/ResultModal";

export default function AllChallenges() {
  const [displayType, setDisplayType] = useState(
    window.innerWidth < 655 ? "Grid" : "Table"
  );
  const [modalShow, setModalShow] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Result Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("success"); // 'success' or 'error'
  const [message, setMessage] = useState("Operation was successful!");
  const handleShowModal = (newStatus, newMessage) => {
    setStatus(newStatus);
    setMessage(newMessage);
    setModalVisible(true);
  };

  // Current user ref
  const auth = getAuth();
  const user = auth.currentUser;
  const userdbRef = ref(db, `users/${user.uid}/enrolledChallenges`);

  // Fetch challenges data.
  const [isFetching, setIsFetching] = useState(true);
  const [challengesData, setChallengesData] = useState([]);
  const [enrolledChallengesData, setEnrolledChallengesData] = useState([]);
  const fetchChallenges = async () => {
    try {
      // Fetch All Challenges
      const snapshot = await get(ref(db, "challenges"));
      const data = snapshot.val();
      const challengesArray = [];
      for (const id in data) {
        challengesArray.push({ id, ...data[id] });
      }
      setChallengesData(challengesArray);

      // Fetch Enrolled Challenges
      const enrolledSnapshot = await get(userdbRef);
      const enrolledData = enrolledSnapshot.val();
      const enrolleChallengesArray = [];
      for (const id in enrolledData) {
        enrolleChallengesArray.push({ id, ...enrolledData[id] });
      }
      setEnrolledChallengesData(enrolleChallengesArray);
    } catch (error) {
      console.error("Error fetching challenges data: ", error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  // Search and Categories filter.
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const enrolledChallengeIds = new Set(
    enrolledChallengesData.map((challenge) => challenge.id)
  );
  const filteredChallenges = challengesData.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      challenge.category.split(" ")[0] === selectedCategory;
    const isNotEnrolled = !enrolledChallengeIds.has(challenge.id);

    return matchesSearch && matchesCategory && isNotEnrolled;
  });

  // Enroll to a challenge.
  const [isEnrolling, setIsEnrolling] = useState(false);

  async function enrollToChallenge(challenge) {
    setIsEnrolling(true);
    try {
      // Using set to save the challenge with its id as the key
      const challengeRef = ref(
        db,
        `users/${user.uid}/enrolledChallenges/${challenge.id}`
      ); // Use challenge.id as the key
      await set(challengeRef, challenge);

      setIsEnrolling(false);
      setModalShow(false);
      handleShowModal("success", "Enrolled Successfully!");
      fetchChallenges(); // Refresh the challenges list if needed
    } catch (error) {
      handleShowModal("error", "Something went wrong!");
      setIsEnrolling(false);
      console.log(error);
    }
  }

  return (
    <div
      className="d-flex flex-column flex-lg-row gap-4 w-100"
      style={{ maxHeight: "100vh" }}
    >
      <div className="allChallengesContentSection w-75 d-flex flex-column border overflow-hidden rounded-2">
        <div className="p-3">
          <div className="allChallengesLeftHeader">
            <h3 className="m-0">All Challenges</h3>
            <button
              className="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#categoriesModal"
            >
              <FontAwesomeIcon icon={faFilter} />{" "}
              <span className="d-sm-inline-block d-none">Categories</span>
            </button>
          </div>
          <hr />
          <div className="allChallengesLeftUtilityBar">
            <div className="input-group w-50" id="searchBar">
              <span className="input-group-text" id="basic-addon1">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </span>
              <input
                type="search"
                className="form-control shadow-none"
                placeholder="Search Challenges"
                aria-label="searchBar"
                aria-describedby="searchBar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="d-flex align-items-center gap-lg-3 gap-2">
              <button
                type="button"
                className={`btn btn-sm border ${
                  displayType === "Grid" ? "btn-light blackBtn" : "btn-dark"
                }`}
                onClick={() => setDisplayType("Table")}
              >
                <FontAwesomeIcon icon={faTableList} />{" "}
                <span className="d-sm-inline-block d-none">List View</span>
              </button>
              <button
                type="button"
                className={`btn btn-sm border ${
                  displayType === "Table" ? "btn-light blackBtn" : "btn-dark"
                }`}
                onClick={() => setDisplayType("Grid")}
              >
                <FontAwesomeIcon icon={faTableCellsLarge} />{" "}
                <span className="d-sm-inline-block d-none">Grid View</span>
              </button>
            </div>
          </div>
        </div>
        <div className="allChallengesContentWrapper mt-2 overflow-y-auto thinScroll flex-grow-1">
          {isFetching ? (
            <div className="text-center m-5">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredChallenges.length === 0 ? (
            <NoData text="Sorry, No Challenges Found" />
          ) : displayType === "Table" ? (
            <table className="table table-bordered m-0 allChallengesTable">
              <thead className="position-sticky top-0">
                <tr>
                  <th className="tenPercentCol" scope="col">
                    <div>
                      <FontAwesomeIcon icon={faTableCellsLarge} />{" "}
                      <span>Category</span>
                    </div>
                  </th>
                  <th className="titleCol">
                    <div>
                      <FontAwesomeIcon icon={faTag} /> <span>Title</span>
                    </div>
                  </th>
                  <th className="descCol">
                    <div>
                      <FontAwesomeIcon icon={faFileLines} />{" "}
                      <span>Description</span>
                    </div>
                  </th>
                  <th className="tenPercentCol" scope="col">
                    <div>
                      <FontAwesomeIcon icon={faStopwatch} />{" "}
                      <span>Posted On</span>
                    </div>
                  </th>
                  <th className="tenPercentCol">
                    <div>
                      <FontAwesomeIcon icon={faStopwatch} />{" "}
                      <span>Ends On</span>
                    </div>
                  </th>
                  <th className="tenPercentCol">
                    <div>
                      <FontAwesomeIcon icon={faGaugeHigh} />{" "}
                      <span>Difficulty</span>
                    </div>
                  </th>
                  <th className="tenPercentCol">
                    <div>
                      <FontAwesomeIcon icon={faLocationCrosshairs} />{" "}
                      <span>Action</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AllChallengesRow
                  challenges={filteredChallenges}
                  showModal={(challenge) => {
                    setSelectedChallenge(challenge);
                    setModalShow(true);
                  }}
                  actionBtnText="Details"
                  type="All"
                />
              </tbody>
            </table>
          ) : (
            <div className="allChallengesGrid px-3 pb-3">
              {filteredChallenges.length === 0 ? (
                <NoData
                  type="Grid"
                  Colspan={0}
                  text="Sorry, No Challenges Found"
                />
              ) : (
                <AllChallengesGrid
                  challenges={filteredChallenges}
                  showModal={(challenge) => {
                    setSelectedChallenge(challenge);
                    setModalShow(true);
                  }}
                  actionBtnText="Details"
                  type="All"
                />
              )}
            </div>
          )}
        </div>
      </div>
      <div className="allChallengesContentSection w-25">
        <StudentRankings />
        <CollegeRankings />
      </div>

      {/* Categories Modal */}
      <div
        className="modal fade"
        id="categoriesModal"
        tabIndex="-1"
        aria-labelledby="categoriesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable thinScroll">
          <div className="modal-content p-2">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="categoriesModalLabel">
                Choose Category
              </h1>
              <button
                type="button"
                className="btn-close shadow-none"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <div className="row categories_grid">
                  <div
                    className={`col category_card ${
                      selectedCategory === "All" ? "activeCategory" : ""
                    }`}
                    onClick={() => setSelectedCategory("All")}
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    <div className="category_card_img">
                      <img src={allIcon} alt="All" />
                    </div>
                    <div className="category_card_details">
                      <p className="card_title">All</p>
                      <p className="card_desc">All Challenges</p>
                    </div>
                  </div>
                  {categoriesData.map((category, index) => (
                    <div
                      className={`col category_card ${
                        selectedCategory === category.Category.split(" ")[0]
                          ? "activeCategory"
                          : ""
                      }`}
                      key={index}
                      onClick={() =>
                        setSelectedCategory(category.Category.split(" ")[0])
                      }
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <div className="category_card_img">
                        <img src={category.imgSrc} alt={category.Category} />
                      </div>
                      <div className="category_card_details">
                        <p className="card_title">{category.Category}</p>
                        <p className="card_desc">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <DetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        challenge={selectedChallenge}
        type="Enroll"
        enrollToChallenge={enrollToChallenge}
        isEnrolling={isEnrolling}
      />

      {/* Result Modal */}
      <ResultModal
        status={status}
        message={message}
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        menuIndex={0}
      />
    </div>
  );
}
