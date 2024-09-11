import LandingNavBar from "./landing/components/navbar";
import "./aboutus_contactus.css";
import founderProfile from "./assets/images/founder_profile.png";

export default function Aboutus() {
  return (
    <div style={{ backgroundColor: "#fff6ee" }}>
      <LandingNavBar />
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <p className="opacity-50 fw-semibold">mosaiq</p>
        <section className="mb-5">
          <p className="sectionTitleNoto">About Us</p>
          <p className="sectionContentNoto">
            Welcome to Mosaiq, your partner in skill enhancement through
            practical, real-world tasks. Our mission is to bridge the gap
            between traditional learning and hands-on experience, providing
            opportunities to upskill in diverse fields such as programming,
            designing, SEO, video editing, writing, music, and audio. <br />
            <br /> At Mosaiq, we believe that learning by doing is the most
            effective way to acquire and retain new skills. That's why we've
            designed a platform that allows you to tackle real-world microtasks
            that not only build your expertise but also give you a taste of what
            working in these industries is truly like. <br />
            <br /> Whether you're a student looking to gain practical
            experience, a professional aiming to expand your skill set, or
            someone with a passion for continuous learning, Mosaiq is here to
            support you. Our approach is hands-on, flexible, and designed to fit
            into your busy schedule. By solving real-world challenges, you not
            only learn but also contribute to meaningful projects.
            <br />
            <br /> Join us at Mosaiq and take the next step in your learning
            journey. Empower yourself with the skills and experience you need to
            succeed in today's fast-paced and ever-evolving world.
          </p>
        </section>
        <section>
          <p className="sectionTitleNoto">Meet the Founder</p>
          <div className="container-fluid p-0">
            <div className="row g-0">
              <div className="col-lg-3 col-12 p-0 pt-2 text-center">
                <img
                  src={founderProfile}
                  alt="Founder"
                  id="founder_photo"
                  className="img-fluid rounded-2"
                />
              </div>
              <div className="col-lg-9 col-12 py-2 ps-lg-4 ps-0 text-center text-lg-start">
                <p id="founder_name">Shiva Ram Krishna Yadav</p>
                <p id="founder_qualification">
                  Bachelor's in Computer Applications (BCA)
                </p>
                <p id="about_founder">
                  Hello, I'm the founder of Mosaiq. With a passion for learning
                  and a commitment to helping others grow, I created Mosaiq to
                  provide opportunities for skill development and practical
                  experience. Join me in this journey to upskill and achieve
                  your full potential.
                </p>
                <p id="quote">
                  -When you're young, the price of risk is time. As you grow
                  older, failure carries a heavier burden.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
