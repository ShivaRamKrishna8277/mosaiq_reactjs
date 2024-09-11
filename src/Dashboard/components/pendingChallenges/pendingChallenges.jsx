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
import PendingModal from "../detailsModal/PendingModal";
import { auth, db } from "../../../firebase";
import { get, ref } from "firebase/database";

export default function PendingChallenges() {
  const [displayType, setDisplayType] = useState(
    window.innerWidth < 655 ? "Grid" : "Table"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  // Fetch Pending Challenge Data
  const user = auth.currentUser;
  const userPCRef = ref(db, `users/${user.uid}/pendingChallenges`);
  const [isFetching, setIsFetching] = useState(true);
  const [pendingChallengesData, setPendingChallengesData] = useState([]);
  async function fetchPendingChallenges() {
    try {
      const pendingSnapshot = await get(userPCRef);
      const pendingData = pendingSnapshot.val();
      const pendingChallengesArray = [];
      for (const id in pendingData) {
        pendingChallengesArray.push({ id, ...pendingData[id] });
      }
      setPendingChallengesData(pendingChallengesArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  }
  useEffect(() => {
    fetchPendingChallenges();
  }, []);

  const filteredChallenges = pendingChallengesData.filter((challenge) => {
    const title = challenge.title || "";
    const matchesSearch = title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="d-flex gap-4" style={{ maxHeight: "100vh" }}>
      <div className="allChallengesContentSection w-100 d-flex flex-column border overflow-hidden rounded-2">
        <div className="p-3">
          <div className="allChallengesLeftHeader">
            <h3 className="m-0 w-100">Pending Challenges</h3>
            <span
              className="badge fs-6"
              style={{ color: "white", backgroundColor: "#ff8800" }}
            >
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
            <NoData text="Sorry, No Pending Challenges Found" />
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
                  actionBtnText="View Solution"
                  type="Pending"
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
                  actionBtnText="View Solution"
                  type="Pending"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      <PendingModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        challenge={selectedChallenge}
      />
    </div>
  );
}
