// import Campains from "../campains/Campains";
import Description from "./components/Description/text.js";
import Button from "./components/ButtonDonation/button.js";
const Home = () => {
  return (
    <>
      <div className="home-container" role="main">
        <Description />
        {/* <Campains /> */}
        <Button />
      </div>
    </>
  );
};

export default Home;
