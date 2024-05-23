import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import BecomeACCA from "./components/BecomeACCA";
import WhyChooseUs from "./components/WhyChooseUs";
import Eligibility from "./components/Eligibility";
import LearnACCA from "./components/LearnACCA";
import PlacementAssistance from "./components/PlacementAssistance";
import KickoffJourney from "./components/KickoffJourney";
import "./App.css";

const App = () => {
  return (
    <div>
      <Header />
      <BecomeACCA />
      <WhyChooseUs />
      <Eligibility />
      <LearnACCA />
      <PlacementAssistance />
      <KickoffJourney />
    </div>
  );
};

export default App;
