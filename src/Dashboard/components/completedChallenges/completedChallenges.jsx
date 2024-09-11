import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../allChallenges/AllChallenges.css";
import {
  faMagnifyingGlass,
  faTableList,
  faTableCellsLarge,
  faTag,
  faFileLines,
  faGaugeHigh,
  faAward,
  faFlagCheckered,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AllChallengesRow from "../allChallenges/AllChallengesRow";
import AllChallengesGrid from "../allChallenges/AllChallengesGrid";
import NoData from "../NoData/noData";
import { get, ref } from "firebase/database";
import { auth, db } from "../../../firebase";

export default function CompletedChallenges() {
  const [displayType, setDisplayType] = useState(
    window.innerWidth < 655 ? "Grid" : "Table"
  );

  // Fetch Completed Challenges
  const user = auth.currentUser;
  const [isFetching, setIsFetching] = useState(true);
  const [completedChallengesData, setCompletedChallengesData] = useState([]);
  const userCCRef = ref(db, `users/${user.uid}/completedChallenges`);

  const fetchCompletedChallenges = async () => {
    try {
      const completedSnapshot = await get(userCCRef);
      const completedData = completedSnapshot.val();
      const completedChallengesArray = [];
      for (const id in completedData) {
        completedChallengesArray.push({ id, ...completedData[id] });
      }
      setCompletedChallengesData(completedChallengesArray);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };
  useEffect(() => {
    fetchCompletedChallenges();
  }, [fetchCompletedChallenges]);

  // Search Filter
  const [searchQuery, setSearchQuery] = useState("");
  const filteredChallenges = completedChallengesData.filter((challenge) => {
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
            <h3 className="m-0 w-100">Completed Challenges</h3>
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
            <NoData text="Sorry, No Completed Challenges Found" />
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
                  <th className="tenPercentCol">
                    <div>
                      <FontAwesomeIcon icon={faGaugeHigh} />{" "}
                      <span>Difficulty</span>
                    </div>
                  </th>
                  <th className="tenPercentCol">
                    <div>
                      <FontAwesomeIcon icon={faFlagCheckered} />{" "}
                      <span>Result</span>
                    </div>
                  </th>
                  <th className="tenPercentCol" scope="col">
                    <div>
                      <FontAwesomeIcon icon={faAward} /> <span>Reward</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <AllChallengesRow
                  challenges={filteredChallenges}
                  actionBtnText="Submit"
                  type="Completed"
                />
              </tbody>
            </table>
          ) : (
            <div className="allChallengesGrid px-3 pb-3">
              {filteredChallenges.length === 0 ? (
                <NoData
                  type="Grid"
                  Colspan={0}
                  text="Sorry, No Completed Challenges Found"
                />
              ) : (
                <AllChallengesGrid
                  challenges={filteredChallenges}
                  actionBtnText="Submit"
                  type="Completed"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
