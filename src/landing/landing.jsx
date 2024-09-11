import "./landing.css";
import Banner from "./components/banner";
import Categories from "./components/categories";
import Cta from "./components/cta";
import Benefits from "./components/benefits";
import LandingNavBar from "./components/navbar";

export default function Landing() {
  return (
    <>
      <LandingNavBar />

      <Banner />

      <div className="bg-body-secondary pb-3">
        <Categories />
      </div>

      <Cta />

      <Benefits />
    </>
  );
}
