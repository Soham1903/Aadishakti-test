import Carousel from "./imageCarousel";
import GradientCards from "./AstroCards";
import VideoSection from "./VideoSection";
import TopCourses from "./TopCourses";
import Stats from "./Stats";
import FAQ from "./FAQ";
import Reviews from "./Reviews";
import About from "./About";

const Home = () => {
  return (
    <>
      <div className="w-full">
        <Carousel />
        <About />
        <GradientCards />
        <VideoSection />
        <Stats />
        <TopCourses />
        <Reviews />
        <FAQ />
      </div>
    </>
  );
};

export default Home;
