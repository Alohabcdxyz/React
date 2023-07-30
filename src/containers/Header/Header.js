import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import VNam from "../../assets/images/vietnamflag.png";
import Usa from "../../assets/images/americanflag.jpg";
import { LANGUAGES, USER_ROLE } from "../../utils";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    this.setState({
      menuApp: menu,
    });
  }
  render() {
    const { processLogout, userInfo } = this.props;
    return (
      <div className='header-container'>
        {/* thanh navigator */}
        <div className='header-tabs-container'>
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className='flag'>
          <span className='welcome'>
            <FormattedMessage id='homeheader.welcome' />
            {userInfo.firstName ? userInfo.firstName : " "}
          </span>
          <span>
            <img
              className='VietNam'
              src={VNam}
              alt='VietNam'
              onClick={() => {
                this.changeLanguage(LANGUAGES.VI);
              }}
            />{" "}
          </span>
          |
          <span>
            {" "}
            <img
              className='USA'
              src={Usa}
              alt='USA'
              onClick={() => {
                this.changeLanguage(LANGUAGES.EN);
              }}
            />
          </span>
        </div>
        <div
          className='btn btn-logout'
          onClick={processLogout}
          title='Log out'
        >
          <i className='fas fa-sign-out-alt'></i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLaguageApp(language)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
