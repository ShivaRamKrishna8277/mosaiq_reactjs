import { Container } from "react-bootstrap";
import heroBanner from "../../assets/images/landing_hero_banner.svg";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div
      style={{
        backgroundColor: "var(--landingBG)",
        minHeight: "70vh",
      }}
      className="d-flex align-items-center justify-content-center"
    >
      <Container className="p-0">
        <div className="hero_section d-flex justify-content-between align-items-center">
          <div className="container-fluid w-1300">
            <div className="row g-5 py-5 justify-content-between align-items-center flex-md-row-reverse">
              <div className="col-md-4 banner_img_wrapper">
                <img
                  src={heroBanner}
                  alt=""
                  className="img-fluid"
                  id="banner_hero_img"
                />
              </div>
              <div className="col-md-7 text-md-start text-center">
                <p className="sub_title small_text m-0">Together is better.</p>
                <p className="title" style={{ color: "var(--primaryColor)" }}>
                  mosaiq
                </p>
                <p className="title">Collective creation.</p>
                <p className="desc small_text mt-1 mb-5">
                  Turn your ideas into reality. Collaborate with a global
                  community of creators on Mosaiq. From designers and writers to
                  programmers and musicians, bring your projects to life
                  together.
                </p>
                <Link to={"/login"}>
                  <button
                    className="ctaButtons text-white"
                    style={{
                      backgroundColor: "var(--primaryColorDark)",
                    }}
                  >
                    Login Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
