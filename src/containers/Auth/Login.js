import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";
import Logo from "../../assets/images/bookingcare.svg";
import { handleLoginAPI } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPass: false,
      errMess: "",
    };
  }
  handleChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMess: "",
    });
    try {
      let data = await handleLoginAPI(
        this.state.username,
        this.state.password
      );
      if (data && data.errCode !== 0) {
        this.setState({
          errMess: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMess: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowPass = () => {
    this.setState({
      isShowPass: !this.state.isShowPass,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <>
        <div className='login-background'>
          <div className='login-container'>
            <div className='login-content'>
              <div className='col-12 text-login'>Login</div>
              <div className='logo-img'>
                <img src={Logo} alt='logo' />
              </div>
              <div className='col-12 form-group login-input'>
                <label>Username:</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Enter your usernname'
                  value={this.state.username}
                  onChange={(event) => {
                    this.handleChangeUsername(event);
                  }}
                />
              </div>
              <div className='col-12 form-group login-input'>
                <label>Password:</label>
                <input
                  type={
                    this.state.isShowPass
                      ? "text"
                      : "password"
                  }
                  className='form-control'
                  placeholder='Enter your password'
                  value={this.state.passwoord}
                  onChange={(event) => {
                    this.handleChangePassword(event);
                  }}
                  onKeyDown={(event) =>
                    this.handleKeyDown(event)
                  }
                />
                <span
                  onClick={() => {
                    this.handleShowPass();
                  }}
                >
                  <i
                    className={
                      this.state.isShowPass
                        ? "fas fa-eye-slash"
                        : "fas fa-eye"
                    }
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div
                className='col-12'
                style={{ color: "red" }}
              >
                {this.state.errMess}
              </div>
              <button
                type='button'
                style={{ cursor: "pointer" }}
                className='btn-login'
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
              <div className='col-12'>
                <span className='remember-pass'>
                  <input type='checkbox' /> Stay signed in
                </span>
                <span className='forgot-pass'>
                  Need help?
                </span>
              </div>
              <div className='col-12 loginwithAPI'>
                <p>Or login with</p>
              </div>
              <div className='col-12 social-login'>
                <i className='fab fa-google-plus-g google'></i>
                <i className='fab fa-facebook-f face'></i>
              </div>
              <div className='col-12 note'>
                <p>
                  After logging in, you can see the
                  instructions for going to the doctor and
                  receive notifications from your doctor or
                  medical facility
                </p>
              </div>
            </div>
          </div>
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
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
