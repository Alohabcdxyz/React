import React, { Component } from "react";
import { connect } from "react-redux";
import "./handBook.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllHandbook } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import { LANGUAGES } from "../../../utils";
class HandBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataHandbook: [],
    };
  }

  async componentDidMount() {
    let res = await getAllHandbook();
    if (res && res.errCode === 0) {
      this.setState({
        dataHandbook: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailHandbook = (item) => {
    if (this.props.history) {
      this.props.history.push(
        `/detail-handbook/${item.id}`
      );
    }
  };

  render() {
    let { dataHandbook } = this.state;
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
    };
    let { language } = this.props;
    return (
      <>
        <div className='handbook-container'>
          <div className='handbook-content'>
            <div className='handbook-header'>
              <span className='title'>
                <FormattedMessage id='homepage.handbook' />
              </span>
            </div>
            <div className='handbook-body'>
              <Slider {...settings}>
                {dataHandbook &&
                  dataHandbook.length > 0 &&
                  dataHandbook.map((item, index) => {
                    return (
                      <>
                        {item.status === 1 && (
                          <div
                            className='handbook-img'
                            onClick={() =>
                              this.handleViewDetailHandbook(
                                item
                              )
                            }
                          >
                            <img
                              src={item.image}
                              alt='handbookgout'
                            />
                            <div className='handbook-name'>
                              {language === LANGUAGES.VI
                                ? item.name
                                : item.value_en}
                            </div>
                          </div>
                        )}
                      </>
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
  connect(mapStateToProps, mapDispatchToProps)(HandBook)
);
