import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../allChallenges/AllChallenges.css";
import {
  faMagnifyingGlass,
  faTableList,
  faTableCellsLarge,
  faTag,
  faFileLines,
  faStopwatch,
  faGaugeHigh,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AllChallengesRow from "../allChallenges/AllChallengesRow";
import AllChallengesGrid from "../allChallenges/AllChallengesGrid";
import NoData from "../NoData/noData";
import DetailsModal from "../detailsModal/DetailsModal";
import { auth, db } from "../../../firebase";
import { get, push, ref, remove, set } from "firebase/database";
import ResultModal from "../resultModal/ResultModal";

export default function EnrolledChallenges() {
  const [displayType, setDisplayType] = useState(
    window.innerWidth < 655 ? "Grid" : "Table"
  );
  const [searchQuery, setSearchQuery] = useState("");
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

  // Fetch Enrolled Challenges
  const [isFetching, setIsFetching] = useState(true);
  const [enrolledChallengesData, setEnrolledChallengesData] = useState([]);
  const user = auth.currentUser;
  const userECRef = ref(db, `users/${user.uid}/enrolledChallenges`);
  const fetchEnrolledChallenges = async () => {
    try {
      const enrolledSnapshot = await get(userECRef);
      const enrolledData = enrolledSnapshot.val();
      const enrolledChallengesArray = [];
      for (const id in enrolledData) {
        enrolledChallengesArray.push({ id, ...enrolledData[id] });
      }
      setEnrolledChallengesData(enrolledChallengesArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchEnrolledChallenges();
  }, []);

  // Submit Solution
  const [isSubmitting, setIsSubmitting] = useState(false);
  async function submitSolution(challenge, link) {
    setIsSubmitting(true);
    challenge.Link = link;
    const currentDate = new Date();
    challenge.submittedOn = currentDate.toISOString().split("T")[0];
    try {
      const challengePCRef = ref(
        db,
        `users/${user.uid}/pendingChallenges/${challenge.id}`
      );
      const challengeECRef = ref(
        db,
        `users/${user.uid}/enrolledChallenges/${challenge.id}`
      );

      await set(challengePCRef, challenge); // Use ref for setting the challenge
      await remove(challengeECRef);
      fetchEnrolledChallenges();
      setIsSubmitting(false);
      setModalShow(false);
      handleShowModal("success", "Solution Submitted Successfully!");
    } catch (error) {
      handleShowModal("error", "Something went wrong!");
      console.log(error);
    }
  }

  // Search Filter
  const filteredChallenges = enrolledChallengesData.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="d-flex gap-4" style={{ maxHeight: "100vh" }}>
      <div className="allChallengesContentSection w-100 d-flex flex-column border overflow-hidden rounded-2">
        <div className="p-3">
          <div className="allChallengesLeftHeader">
            <h3 className="m-0 w-100">Enrolled Challenges</h3>
            <span className="badge text-bg-success fs-6">
              {filteredChallenges.length}
            </span>
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
            <NoData text="Sorry, No Enrolled Challenges Found" />
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
                  actionBtnText="Submit"
                  type="Enrolled"
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
                  actionBtnText="Submit"
                  type="Enrolled"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <DetailsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        challenge={selectedChallenge}
        type="Submit"
        submitSolution={submitSolution}
        isSubmitting={isSubmitting}
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
