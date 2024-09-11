import { Button, Form, InputGroup } from "react-bootstrap";
import "./authentication.css";
import emailIcon from "../assets/icons/Email.png";
import passwordIcon from "../assets/icons/Password.png";
import { useState } from "react";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icons/landingLogo.svg";
import Spinner from "react-bootstrap/Spinner";
import CustomModal from "../components/CustomModal";
import { signUp } from "../auth";

export default function Signup() {
  const navigate = useNavigate();
  const [isVisible, setVisibility] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmpasswordValue, setConfirmPasswordValue] = useState("");
  const [isSpinnerActive, setSpinnerStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ message: "", type: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (emailValue === "" || passwordValue === "") {
      setAlertDetails({
        message: "Please fill in all the fields.",
        type: "error",
      });
      setShowAlert(true);
    } else if (passwordValue !== confirmpasswordValue) {
      setAlertDetails({
        message: "Passwords do not match.",
        type: "error",
      });
      setShowAlert(true);
    } else {
      setSpinnerStatus(true);

      try {
        await signUp(emailValue, passwordValue);
        setAlertDetails({
          message:
            "Account Created Successfully. Redirecting to Login Page....",
          type: "success",
        });
        setShowAlert(true);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        let errorMessage = "An unexpected error occurred. Please try again.";
        // Map Firebase error codes to custom messages
        switch (error.message) {
          case "Firebase: Error (auth/email-already-in-use).":
            errorMessage =
              "The email address is already in use by another account.";
            break;
          case "Firebase: Error (auth/invalid-email).":
            errorMessage = "The email address is not valid.";
            break;
          case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            errorMessage = "The password should be at least 6 characters.";
            break;
          case "auth/operation-not-allowed":
            errorMessage =
              "Email/password sign-up is disabled. Contact support.";
            break;
          default:
            errorMessage = "An unexpected error occurred. Please try again.";
        }
        console.log(error);
        setAlertDetails({
          message: errorMessage,
          type: "error",
        });
        setShowAlert(true);
      } finally {
        setSpinnerStatus(false);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="auth_container container-fluid p-0">
        <div className="row g-0 text-center mb-4">
          <img src={logo} alt="" className="auth_logo" />
          <p className="auth_title">Create New Account</p>
          <p className="auth_subtitle">Join us and start your journey today!</p>
        </div>
        <div className="row g-0 m-auto">
          <div className="col p-0">
            <Form
              className="auth_form mb-4"
              id="signup_form"
              onSubmit={handleFormSubmit}
            >
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <img
                    src={emailIcon}
                    className="inputGroupIcons"
                    alt="Email"
                  />
                </InputGroup.Text>
                <Form.Control
                  className="inputFields"
                  type="email"
                  placeholder="Email Address"
                  aria-label="emailAddress"
                  aria-describedby="emailInput"
                  onChange={(e) => setEmailValue(e.target.value)}
                  disabled={isSpinnerActive}
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <img
                    src={passwordIcon}
                    className="inputGroupIcons"
                    alt="Password"
                  />
                </InputGroup.Text>
                <Form.Control
                  className="inputFields"
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  aria-label="password"
                  aria-describedby="password"
                  onChange={(e) => setPasswordValue(e.target.value)}
                  disabled={isSpinnerActive}
                />
                <InputGroup.Text
                  onClick={() => setVisibility(!isVisible)}
                  style={{ cursor: "pointer" }}
                >
                  {isVisible ? (
                    <VisibilityTwoToneIcon fontSize="small" />
                  ) : (
                    <VisibilityOffTwoToneIcon fontSize="small" />
                  )}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <img
                    src={passwordIcon}
                    className="inputGroupIcons"
                    alt="Comfirm Password"
                  />
                </InputGroup.Text>
                <Form.Control
                  className="inputFields"
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="confirmpassword"
                  aria-describedby="confirmpassword"
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                  disabled={isSpinnerActive}
                />
              </InputGroup>
              <Button
                type="submit"
                className="w-100 border-0 inputFields text-white rounded-1"
                style={{ backgroundColor: "var(--primaryColor)" }}
                disabled={isSpinnerActive}
              >
                {isSpinnerActive ? (
                  <Spinner
                    animation="border"
                    size="sm"
                    className="text-white"
                  />
                ) : (
                  "Signup"
                )}
              </Button>
            </Form>
            <p className="fs-6 text-center">
              Already have an Accout?{" "}
              <span>
                <Link to={"/login"} className="linkText">
                  Login now
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Render the CustomModal outside the form but within the component */}
      <CustomModal
        show={showAlert}
        onClose={() => setShowAlert(false)}
        message={alertDetails.message}
        type={alertDetails.type}
      />
    </div>
  );
}
