import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./outStandingDoctor.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  async componentDidMount() {
    this.props.loadTopDoctors();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.topDoctorsRedux !==
      this.props.topDoctorsRedux
    ) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(
        `/detail-doctor/${doctor.id}`
      );
    }
  };

  render() {
    let { language } = this.props;
    let arrDoctors = this.state.arrDoctors;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };

    return (
      <>
        <div className='doctor-container'>
          <div className='doctor-content'>
            <div className='doctor-header'>
              <span className='title'>
                <FormattedMessage id='homepage.outstanding-doctor' />
              </span>
            </div>
            <div className='doctor-body'>
              <Slider {...settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(
                        item.image,
                        "base64"
                      ).toString("binary");
                    }
                    let nameVi = `${item.positionData.value_vi}, ${item.lastName} ${item.firstName}`;
                    let nameEn = `${item.positionData.value_en}, ${item.firstName} ${item.lastName}`;
                    return (
                      <div
                        className='doctor-img'
                        key={index}
                        onClick={() =>
                          this.handleViewDetailDoctor(item)
                        }
                      >
                        <img
                          src={imageBase64}
                          alt='doctor'
                        />
                        <div className='doctor-name'>
                          {language === LANGUAGES.VI
                            ? nameVi
                            : nameEn}
                        </div>
                        <div className='doctor-spe'>
                          {language === LANGUAGES.VI
                            ? item.Doctor_Infor
                                .specialtyData.name
                            : item.Doctor_Infor
                                .specialtyData.value_en}
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () =>
      dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(OutstandingDoctor)
);
