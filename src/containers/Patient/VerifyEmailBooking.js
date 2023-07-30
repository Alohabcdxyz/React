import React, { Component } from "react";
import { connect } from "react-redux";
import HeaderHomePage from "../Home_Page/HeaderHomePage";
import { LANGUAGES } from "../../utils";
import { FormattedMessage } from "react-intl";
import { verifyPatientBooking } from "../../services/userService";
import like from "../../assets/images/like.svg";
import warn from "../../assets/images/warn.svg";
import "./Verify.scss";
class VerifyEmailBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(
        this.props.location.search
      );
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await verifyPatientBooking({
        token: token,
        doctorId: doctorId,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HeaderHomePage />
        {statusVerify === false ? (
          <div className='loading-data'>Loading data</div>
        ) : (
          <div>
            {errCode === 0 ? (
              <div className='verify-success'>
                <img src={like} />
                Đặt lịch khám thành công
              </div>
            ) : (
              <div className='verify-fail'>
                <img src={warn} />
                Đặt lịch khám thất bại hoặc đã tồn tại lịch
                khám
              </div>
            )}
          </div>
        )}
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
)(VerifyEmailBooking);
