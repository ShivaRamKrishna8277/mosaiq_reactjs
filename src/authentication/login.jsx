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
import { signIn } from "../auth";

export default function Login() {
  const navigate = useNavigate();
  const [isVisible, setVisibility] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [isSpinnerActive, setSpinnerStatus] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertDetails, setAlertDetails] = useState({ message: "", type: "" });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (emailValue === "" || passwordValue === "") {
      setAlertDetails({
        message: "Please fill all the fields.",
        type: "error",
      });
      setShowAlert(true);
    } else {
      setSpinnerStatus(true);
      try {
        await signIn(emailValue, passwordValue);
        navigate("/dashboard");
      } catch (error) {
        let errorMessage = "";
        switch (error.message) {
          case "Firebase: Error (auth/invalid-credential).":
            errorMessage = "Email and Password do not match.";
            break;
          case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            errorMessage =
              "Too many failed attempts, Account temporatily disabled. Reset your password and try again.";
            break;
          default:
            errorMessage = "Something went wrong.";
        }
        console.log(error.message);
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
          <p className="auth_title">Login to your Account</p>
          <p className="auth_subtitle">Welcome back! select method to login:</p>
        </div>
        <div className="row g-0 m-auto">
          <div className="col p-0">
            <Form
              className="auth_form mb-4"
              id="login_form"
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
                  "Login"
                )}
              </Button>
            </Form>
            <p className="fs-6 text-center">
              Don't have an Accout?{" "}
              <span>
                <Link to={"/signup"} className="linkText">
                  Create now
                </Link>
              </span>
            </p>
            <p className="text-center linkText">forgot password</p>
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
