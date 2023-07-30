import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage, injectIntl } from "react-intl";
import { getAllSpecialty } from "../../../services/userService";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
      searchInput: "",
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(
        `/detail-specialty/${item.id}`
      );
    }
  };

  render() {
    let { dataSpecialty } = this.state;
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
        <div className='specialty-container'>
          <div className='specialty-content'>
            <div className='specialty-header'>
              <span className='title'>
                <FormattedMessage id='homepage.specialty' />
              </span>
              <div className='search'>
                <i className='fas fa-search'></i>
                <input
                  type='text'
                  placeholder={formatMessage({
                    id: "placeholder.spe-place",
                  })}
                  value={this.state.searchInput}
                  onChange={(e) => {
                    this.setState({
                      searchInput: e.target.value,
                    });
                    this.slider.slickGoTo(0);
                  }}
                ></input>
              </div>
            </div>
            <div className='specialty-body'>
              <Slider
                ref={(slider) => (this.slider = slider)}
                {...settings}
              >
                {dataSpecialty &&
                  dataSpecialty.length > 0 &&
                  dataSpecialty
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
                          className='specialty-img'
                          key={index}
                          onClick={() =>
                            this.handleViewDetailSpecialty(
                              item
                            )
                          }
                        >
                          <img
                            src={item.image}
                            alt='chuyenkhoa'
                          />
                          <div className='specialty-name'>
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
  )(injectIntl(Specialty))
);
