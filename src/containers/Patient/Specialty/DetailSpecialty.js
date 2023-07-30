import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HeaderHomePage from "../../Home_Page/HeaderHomePage";
import "./DetailSpe.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import { Col, Row } from "antd";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDoctorSpecialty,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isShowDetail: false,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idDoc = this.props.match.params.id;
      let res = await getDoctorSpecialty({
        id: idDoc,
        location: "ALL",
      });
      let resProvince = await getAllCodeService("PROVINCE");
      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            value_vi: "Toàn quốc",
            value_en: "Nationwide",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handelOnchangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let idDoc = this.props.match.params.id;
      let location = event.target.value;

      let res = await getDoctorSpecialty({
        id: idDoc,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  showHide = (status) => {
    this.setState({
      isShowDetail: status,
    });
  };

  render() {
    let {
      arrDoctorId,
      dataDetailSpecialty,
      listProvince,
      isShowDetail,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className='father'>
          <HeaderHomePage />
          <Row className='specialty-description'>
            {isShowDetail === false ? (
              <div>
                <Col className='detail-spe-des-1'>
                  {language === LANGUAGES.VI ? (
                    <>
                      {dataDetailSpecialty &&
                        !_.isEmpty(dataDetailSpecialty) && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                dataDetailSpecialty.descriptionHtml,
                            }}
                          ></div>
                        )}
                    </>
                  ) : (
                    <>
                      {dataDetailSpecialty &&
                        !_.isEmpty(dataDetailSpecialty) && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                dataDetailSpecialty.htmlEn,
                            }}
                          ></div>
                        )}
                    </>
                  )}
                </Col>
                <button
                  className='hide'
                  onClick={() => this.showHide(true)}
                >
                  <FormattedMessage id='menu.admin.more' />
                </button>
              </div>
            ) : (
              <div>
                <Col className='detail-spe-des'>
                  {language === LANGUAGES.VI ? (
                    <>
                      {dataDetailSpecialty &&
                        !_.isEmpty(dataDetailSpecialty) && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                dataDetailSpecialty.descriptionHtml,
                            }}
                          ></div>
                        )}
                    </>
                  ) : (
                    <>
                      {dataDetailSpecialty &&
                        !_.isEmpty(dataDetailSpecialty) && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                dataDetailSpecialty.htmlEn,
                            }}
                          ></div>
                        )}
                    </>
                  )}
                </Col>
                <button
                  className='hide'
                  onClick={() => this.showHide(false)}
                >
                  <FormattedMessage id='menu.admin.less' />
                </button>
              </div>
            )}
          </Row>
          <Row className='search-doctor-location'>
            <Col className='detail-spe-search'>
              <select
                onChange={(event) =>
                  this.handelOnchangeSelect(event)
                }
              >
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option
                        key={index}
                        value={item.keyMap}
                      >
                        {language === LANGUAGES.VI
                          ? item.value_vi
                          : item.value_en}
                      </option>
                    );
                  })}
              </select>
            </Col>
          </Row>

          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <Row className='list-doctor' key={index}>
                  <Col
                    span={12}
                    className='spe-content-left'
                  >
                    <div className='spe-content-left-content'>
                      <ProfileDoctor
                        doctorId={item}
                        isShowInfor={true}
                        isShowLinkDetail={true}
                        isSHowPrice={false}
                        //  dataScheduleModal={dataScheduleModal}
                      />
                    </div>
                  </Col>
                  <Col
                    span={12}
                    className='spe-content-right'
                  >
                    <div className='spe-content-right-up'>
                      <DoctorSchedule
                        doctorIdFromParent={item}
                      />
                    </div>
                    <div className='spe-content-right-down'>
                      <DoctorExtraInfor
                        doctorIdFromParent={item}
                      />
                    </div>
                  </Col>
                </Row>
              );
            })}
        </div>
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
)(DetailSpecialty);
