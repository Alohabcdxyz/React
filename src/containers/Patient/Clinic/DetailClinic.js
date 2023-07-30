import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import HeaderHomePage from "../../Home_Page/HeaderHomePage";
import "./DetailCli.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import { Col, Row } from "antd";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDoctorClinic,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
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
      let res = await getDoctorClinic({
        id: idDoc,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHide = (status) => {
    this.setState({
      isShowDetail: status,
    });
  };

  render() {
    let { arrDoctorId, dataDetailClinic, isShowDetail } =
      this.state;
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
                      {dataDetailClinic &&
                        !_.isEmpty(dataDetailClinic) && (
                          <>
                            <div className='cli-name'>
                              {dataDetailClinic.name}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  dataDetailClinic.descriptionHtml,
                              }}
                            ></div>
                          </>
                        )}
                    </>
                  ) : (
                    <>
                      {dataDetailClinic &&
                        !_.isEmpty(dataDetailClinic) && (
                          <>
                            <div className='cli-name'>
                              {dataDetailClinic.value_en}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  dataDetailClinic.htmlEn,
                              }}
                            ></div>
                          </>
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
                      {dataDetailClinic &&
                        !_.isEmpty(dataDetailClinic) && (
                          <>
                            <div className='cli-name'>
                              {dataDetailClinic.name}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  dataDetailClinic.descriptionHtml,
                              }}
                            ></div>
                          </>
                        )}
                    </>
                  ) : (
                    <>
                      {dataDetailClinic &&
                        !_.isEmpty(dataDetailClinic) && (
                          <>
                            <div className='cli-name'>
                              {dataDetailClinic.value_en}
                            </div>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  dataDetailClinic.htmlEn,
                              }}
                            ></div>
                          </>
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
)(DetailClinic);
