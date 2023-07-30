import React, { Component } from "react";
import { connect } from "react-redux";
import "./medicalFecility.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";
import {
  FormattedMessage,
  injectIntl,
  intlShape,
  formatMessag,
} from "react-intl";
class MedicalFecility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
      searchInput: "",
      clinicCount: 0,
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
        clinicCount: res.clinicCount,
      });
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let { dataClinics, clinicCount } = this.state;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      beforeChange: (current, next) =>
        this.setState({ slideIndex: current }),
    };
    let { formatMessage } = this.props.intl;
    let { language } = this.props;
    return (
      <>
        <div className='fecility-container'>
          <div className='fecility-content'>
            <div className='fecility-header'>
              <span className='title'>
                <FormattedMessage id='homepage.spe' />
                {/* {clinicCount} */}
              </span>
              {/* <div className='search'>
                <i className='fas fa-search'></i>
                <input
                  type='text'
                  placeholder={formatMessage({
                    id: "placeholder.facility",
                  })}
                  value={this.state.searchInput}
                  onChange={(e) => {
                    this.setState({
                      searchInput: e.target.value,
                    });
                    this.slider.slickGoTo(0);
                  }}
                ></input>
              </div> */}
            </div>
            <div className='fecility-body'>
              <Slider
                ref={(slider) => (this.slider = slider)}
                {...settings}
              >
                {dataClinics &&
                  dataClinics.length > 0 &&
                  dataClinics
                    .filter((item) =>
                      item.name
                        .toLowerCase()
                        .includes(
                          this.state.searchInput.toLowerCase()
                        )
                    )
                    .map((item, index) => {
                      return (
                        <div
                          className='fecility-img'
                          key={index}
                          onClick={() =>
                            this.handleViewDetailClinic(
                              item
                            )
                          }
                        >
                          <img
                            src={item.image}
                            alt='clinic'
                          />
                          <div className='name-cli'>
                            {language === LANGUAGES.VI
                              ? item.name
                              : item.value_en}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(MedicalFecility))
);
