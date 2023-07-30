import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHomePage from "../../Home_Page/HeaderHomePage";
import "./DetailDoctor.scss";
import { Col, Row } from "antd";
import { getDetailInforDoctorService } from "../../../services/userService";
import no_img from "../../../assets/images/noimg.jpg";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import { FacebookShareButton } from "react-share";
import { FacebookProvider, Comments } from "react-facebook";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
      isLiked: false,
      totalLikes: 0,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idDoc = this.props.match.params.id;
      this.setState({
        currentDoctorId: idDoc,
      });
      let res = await getDetailInforDoctorService(idDoc);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnClickLike = () => {
    this.setState((prevState) => ({
      isLiked: !prevState.isLiked,
      totalLikes: prevState.isLiked
        ? prevState.totalLikes - 1
        : prevState.totalLikes + 1, // Toggle the like status
    }));
  };

  render() {
    let { detailDoctor, isLiked, totalLikes } = this.state;
    let { language } = this.props;
    let nameVi,
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.value_vi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.value_en} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    return (
      <>
        <HeaderHomePage isShowBanner={false} />
        <Row className='doctor-detail-container'>
          <Row className='intro-doctor'>
            <Col className='content-left' span={4}>
              <img
                src={
                  detailDoctor && detailDoctor.image
                    ? detailDoctor.image
                    : no_img
                }
                alt='doctor'
              />
            </Col>
            <Col className='content-right' span={20}>
              <div className='name-and-position'>
                {language === LANGUAGES.VI
                  ? nameVi
                  : nameEn}
              </div>
              <div className='information'>
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>
                      {language === LANGUAGES.VI
                        ? detailDoctor.Markdown.description
                        : detailDoctor.Markdown.value_en}
                    </span>
                  )}
                <div className='like-share'>
                  <div
                    className='like'
                    onClick={this.handleOnClickLike}
                  >
                    <i
                      style={{
                        fontSize: "15px",
                        color: isLiked ? "blue" : "white",
                      }}
                      className='fa fa-thumbs-up'
                    ></i>
                    <span>
                      {totalLikes}{" "}
                      {isLiked ? "Liked" : "Like"}
                    </span>
                  </div>
                  <FacebookShareButton
                    url='https://www.facebook.com/profile.php?id=100022115310234&mibextid=LQQJ4d'
                    quote='Hello'
                    hashtag='#React'
                  >
                    <div id='fb-share-button'>
                      <svg
                        viewBox='0 0 10 10'
                        preserveAspectRatio='xMidYMid meet'
                      >
                        <path
                          class='svg-icon-path'
                          d='M9.1,0.1V2H8C7.6,2,7.3,2.1,7.1,2.3C7,2.4,6.9,2.7,6.9,3v1.4H9L8.8,6.5H6.9V12H4.7V6.5H2.9V4.4h1.8V2.8 c0-0.9,0.3-1.6,0.7-2.1C6,0.2,6.6,0,7.5,0C8.2,0,8.7,0,9.1,0.1z'
                        ></path>
                      </svg>
                      <span>Share</span>
                    </div>
                  </FacebookShareButton>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className='schedule-doctor' span={24}>
              <Row>
                <Col span={12}>
                  <DoctorSchedule
                    doctorIdFromParent={
                      this.state.currentDoctorId
                    }
                  />
                </Col>
                <Col span={12}>
                  <DoctorExtraInfor
                    doctorIdFromParent={
                      this.state.currentDoctorId
                    }
                  />
                </Col>
              </Row>
            </Col>
            <Col className='doctor-infor-detail' span={24}>
              {detailDoctor &&
                detailDoctor.Markdown &&
                detailDoctor.Markdown.contentHtml && (
                  <>
                    {" "}
                    {language === LANGUAGES.VI ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            detailDoctor.Markdown
                              .contentHtml,
                        }}
                      ></div>
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            detailDoctor.Markdown.htmlEn,
                        }}
                      ></div>
                    )}
                  </>
                )}
            </Col>
            <Col className='comment-from-patient' span={24}>
              <FacebookProvider appId='828641228665832'>
                <Comments
                  href='http://localhost:3000/detail-doctor'
                  width='100%'
                  numPosts={5}
                />
              </FacebookProvider>
            </Col>
          </Row>
        </Row>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailDoctor);
