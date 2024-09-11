import "./Profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import { useEffect, useState } from "react";
import InputField from "../inputs/input";
import bronzeMedal from "../../../assets/icons/bronze_medal.svg";
import silderMedal from "../../../assets/icons/silver_medal.svg";
import goldMedal from "../../../assets/icons/gold_medal.svg";
import expertMedal from "../../../assets/icons/expert_medal.svg";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";
import { get, ref, update } from "firebase/database";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../../../auth";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProfilePhotoUploader from "../profilePhotoUploader";
import ProfilePhotoDisplay from "../profilePhotoDisplay";
import ResultModal from "../resultModal/ResultModal";

export default function Profile() {
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [newDetails, setNewDetails] = useState({
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    userName: "",
    district: "",
    state: "",
    pincode: "",
    linkedin: "",
    instagram: "",
    github: "",
  });
  const navigate = useNavigate();

  // Resutl Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [status, setStatus] = useState("success"); // 'success' or 'error'
  const [message, setMessage] = useState("Operation was successful!");
  const handleShowModal = (newStatus, newMessage) => {
    setStatus(newStatus);
    setMessage(newMessage);
    setModalVisible(true);
  };

  // Logout Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Logout Modal - End

  // To fetch user data
  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          setUserDetails(userData);
          // Initialize newDetails with the existing data
          setNewDetails((prev) => ({ ...prev, ...userData }));
        } else {
          console.log("User data not found");
        }
      } else {
        navigate("/login");
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  // To fetch user data - End

  // To update new details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const updateNewInfo = async () => {
    const user = auth.currentUser;
    setIsUpdating(true);
    if (user) {
      const userId = user.uid;
      const userRef = ref(db, `users/${userId}`);

      // Merge newDetails with existing userDetails to keep unchanged fields intact
      const updatedDetails = {
        ...userDetails, // Keep previous details
        ...newDetails, // Apply new changes
      };

      try {
        await update(userRef, updatedDetails);
        handleShowModal("success", "Updated Successfully!");
        fetchUserData(); // Fetch the latest data after updating
      } catch (error) {
        console.log(error);
      } finally {
        setIsUpdating(false);
        setIsInputDisabled(true);
      }
    } else {
      alert("Update Failed");
    }
  };
  // To update new details - End

  // Define personalDetailsInputs and socialLinksInputs based on userDetails
  const personalDetailsInputs = [
    {
      id: "fullNameInput",
      labelText: "Full Name",
      inputGroupText: "FN",
      type: "text",
      placeholder: "Full Name",
      value: userDetails ? userDetails.fullName : "",
      name: "fullName",
    },
    {
      id: "emailAddressInput",
      labelText: "Email Address",
      inputGroupText: "EA",
      type: "email",
      placeholder: "Email Address",
      value: userDetails ? userDetails.emailAddress : "",
      name: "emailAddress",
    },
    {
      id: "mobileNumberInput",
      labelText: "Mobile Number",
      inputGroupText: "MN",
      type: "tel",
      placeholder: "Mobile Number",
      value: userDetails ? userDetails.mobileNumber : "",
      name: "mobileNumber",
    },
    {
      id: "userNameInput",
      labelText: "Username",
      inputGroupText: "UN",
      type: "text",
      placeholder: "Username",
      value: userDetails ? userDetails.userName : "",
      name: "userName",
    },
    {
      id: "districtInput",
      labelText: "District",
      inputGroupText: "DI",
      type: "text",
      placeholder: "District",
      value: userDetails ? userDetails.district : "",
      name: "district",
    },
    {
      id: "stateInput",
      labelText: "State",
      inputGroupText: "ST",
      type: "text",
      placeholder: "State",
      value: userDetails ? userDetails.state : "",
      name: "state",
    },
    {
      id: "pincodeInput",
      labelText: "Pincode",
      inputGroupText: "PI",
      type: "number",
      placeholder: "Pincode",
      value: userDetails ? userDetails.pincode : "",
      name: "pincode",
    },
  ];
  let socialLinksInputs = [
    {
      name: "Linkedin",
      link: userDetails ? userDetails.linkedin : "",
      fieldName: "linkedin",
    },
    {
      name: "Instagram",
      link: userDetails ? userDetails.instagram : "",
      fieldName: "instagram",
    },
    {
      name: "Github",
      link: userDetails ? userDetails.github : "",
      fieldName: "github",
    },
  ];

  const xp = userDetails ? userDetails.xp : 0;
  let badge, badgeIcon, nextBadge, lowerBound, upperBound;

  if (xp < 500) {
    badge = "Bronze";
    badgeIcon = bronzeMedal;
    nextBadge = "Silver";
    lowerBound = 0;
    upperBound = 500;
  } else if (xp >= 500 && xp < 2000) {
    badge = "Silver";
    badgeIcon = silderMedal;
    nextBadge = "Gold";
    lowerBound = 500;
    upperBound = 2000;
  } else if (xp >= 2000 && xp < 5000) {
    badge = "Gold";
    badgeIcon = goldMedal;
    nextBadge = "Expert";
    lowerBound = 2000;
    upperBound = 5000;
  } else if (xp >= 5000) {
    badge = "Expert";
    badgeIcon = expertMedal;
    nextBadge = "Expert";
    lowerBound = 5000;
    upperBound = 5000;
  } else {
    badge = "Bronze";
    badgeIcon = bronzeMedal;
    nextBadge = "Silver";
    lowerBound = 0;
    upperBound = 500;
  }
  let xpDiff = upperBound - lowerBound;
  let currectBadgeXp = xp - lowerBound;
  let innerBarWidth;
  if (xp >= 0 && xp < 5000) {
    innerBarWidth = (currectBadgeXp / xpDiff) * 100;
  } else if (xp >= 5000) {
    innerBarWidth = 100;
  } else {
    innerBarWidth = 0;
  }

  return (
    <>
      <div
        id="profileHeader"
        className="d-flex flex-column flex-md-row gap-3 align-items-center justify-content-between border-bottom pb-3"
      >
        <div>
          <h3 className="m-0">Profile Details</h3>
          <p className="m-0 opacity-75">
            Update your photo and personal details here.
          </p>
        </div>
        <div className="d-flex gap-2">
          {isInputDisabled ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsInputDisabled(false)}
            >
              <FontAwesomeIcon icon={faPenToSquare} />{" "}
              <span className="text-white">Edit Info</span>
            </button>
          ) : (
            <button
              className="btn btn-success btn-sm"
              onClick={() => updateNewInfo()}
            >
              {!isUpdating ? (
                <>
                  <FontAwesomeIcon icon={faPenToSquare} />{" "}
                  <span className="text-white">Save Changes</span>
                </>
              ) : (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  <span role="status" className="ms-1">
                    Updating...
                  </span>
                </>
              )}
            </button>
          )}
          <button className="btn btn-danger btn-sm" onClick={handleShow}>
            <FontAwesomeIcon icon={faRightFromBracket} />{" "}
            <span className="text-white">Logout</span>
          </button>
        </div>
      </div>
      <div id="profileContent" className="py-3 d-lg-flex gap-lg-5 w-100">
        <div className="profileContentSection w-50" id="profileContentLeft">
          <div>
            <p className="mb-3">Profile Photo</p>
            <div className="profilePhotoSection">
              <ProfilePhotoDisplay size={150} />
              <div className="profilePhotoBtns flex-grow-1">
                <ProfilePhotoUploader />
              </div>
            </div>
          </div>
          <div className="personalInfoSection pt-5">
            <p className="mb-3">Personal Info</p>
            <form action="" className="personalInfoForm">
              {personalDetailsInputs.map((input) => (
                <InputField
                  key={input.id}
                  id={input.id}
                  labelText={input.labelText}
                  inputGroupText={input.inputGroupText}
                  type={input.type}
                  placeholder={input.placeholder}
                  value={input.value}
                  isDisabled={isInputDisabled}
                  name={input.name}
                  onchange={handleChange}
                />
              ))}
            </form>
          </div>
        </div>
        <div className="profileContentSection w-50" id="profileContentRight">
          <div>
            <p className="mb-3">Badge</p>
            <div className="badgeSection">
              <div className="badgePhotoWrapper">
                <img src={badgeIcon} alt={badge} id="badgePhoto" />
              </div>
              <div className="badgeText flex-grow-1">
                <p className="badgeTitle">{badge}</p>
                <div className="badgeProgressBarWrapper">
                  <div className="badgeProgressBarOuter mb-1">
                    <div
                      className="badgeProgressBarInner"
                      style={{ width: `${innerBarWidth}%` }}
                    ></div>
                  </div>
                  <div className="badgeProgressBarPoints d-flex align-items-center justify-content-between">
                    <p>{xp}xp</p>
                    <p>{upperBound}xp</p>
                  </div>
                </div>
                {badge !== "Expert" ? (
                  <p style={{ fontSize: ".85rem" }}>
                    Earn <b>{upperBound - xp}</b> more xp to achieve{" "}
                    <b>{nextBadge}</b> badge.{" "}
                  </p>
                ) : (
                  <p
                    style={{
                      fontSize: ".85rem",
                      color: "var(--primaryColor) !important",
                      marginTop: "10px",
                    }}
                  >
                    Bravo! You've achieved the Expert badge and are now among
                    the elite!
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="pt-5">
            <p className="mb-3">Social Links</p>
            <div className="socialLinksSection">
              {socialLinksInputs.map((socialLink) => {
                return (
                  <InputField
                    key={socialLink.name}
                    id={socialLink.name}
                    labelText={socialLink.name}
                    inputGroupText={
                      <Link to={socialLink.link} className="socialLinkWrapper">
                        <OpenInNewRoundedIcon sx={{ fontSize: 18 }} />
                      </Link>
                    }
                    type={"text"}
                    placeholder={socialLink.name}
                    value={socialLink.link}
                    isDisabled={isInputDisabled}
                    name={socialLink.fieldName}
                    onchange={handleChange}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Body className="text-center">
            <p>Are you sure? You want to logout.</p>
            <div className="d-flex gap-3 justify-content-center mt-3">
              <Button variant="danger" size="sm" onClick={logOut}>
                Logout
              </Button>
              <Button variant="success" size="sm" onClick={handleClose}>
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>

      {/* Result Modal */}
      <ResultModal
        status={status}
        message={message}
        show={modalVisible}
        onHide={() => setModalVisible(false)}
        menuIndex={0}
      />
    </>
  );
}
