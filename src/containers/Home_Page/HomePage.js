import React, { Component } from "react";

import { connect } from "react-redux";
import Header from "./HeaderHomePage";
import Specialty from "./Section/specialty";
import MedicalFecility from "./Section/medicalFecility";
import OutstandingDoctor from "./Section/outStandingDoctor";
import HandBook from "./Section/HandBook";
import AboutUs from "./Section/AboutUs";
import HomeFooter from "./HomeFooter";
import ChatBot from "../ChatBot";
class HomePage extends Component {
  render() {
    return (
      <>
        <Header isShowBanner={true} />
        <Specialty />
        <MedicalFecility />
        <OutstandingDoctor />
        <HandBook />
        <AboutUs />
        <HomeFooter />
        <ChatBot />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
