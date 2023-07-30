import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManageBooking from "../containers/System/Doctor/ManageBooking";
import ManageNotConfirm from "../containers/System/Doctor/ManageNotConfirm";
import ManageDoneBooking from "../containers/System/Doctor/ManageDoneBooking";
import ManageCancelBooking from "../containers/System/Doctor/ManageCancelBooking";
import ManageProfilr from "../containers/System/Doctor/ManageProfilr";
import ManageExtraProfile from "../containers/System/Doctor/ManageExtraProfile";
class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route
                path='/doctor/manage-schedule'
                component={ManageSchedule}
              />
              <Route
                path='/doctor/manage-booking'
                component={ManageBooking}
              />
              <Route
                path='/doctor/manage-not-confirm-booking'
                component={ManageNotConfirm}
              />
              <Route
                path='/doctor/manage-done-booking'
                component={ManageDoneBooking}
              />
              <Route
                path='/doctor/manage-cancel-booking'
                component={ManageCancelBooking}
              />
              <Route
                path='/doctor/manage-profile'
                component={ManageProfilr}
              />
              <Route
                path='/doctor/manage-profile-extra'
                component={ManageExtraProfile}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doctor);
