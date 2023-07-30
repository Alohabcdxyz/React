import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import Userredux from "../containers/System/Admin/Userredux";
import ManageDoctor from "../containers/System/Admin/ManageDoctor";
import Header from "../containers/Header/Header";
import ManageSpecialty from "../containers/System/Admin/Specialty/ManageSpecialty";
import ManageClinic from "../containers/System/Admin/Clinic/ManageClinic";
import EditSpecialty from "../containers/System/Admin/Specialty/EditSpecialty";
import EditClinic from "../containers/System/Admin/Clinic/EditClinic";
import ManageHandbook from "../containers/System/Admin/HandBook/ManageHandbook";
import EditHandbook from "../containers/System/Admin/HandBook/EditHandbook";
import Profile from "../containers/System/Admin/Profile";
import Dashboard from "../containers/System/Admin/Dashboard";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className='system-container'>
          <div className='system-list'>
            <Switch>
              <Route
                path='/system/user-manage'
                component={UserManage}
              />
              <Route
                path='/system/user-redux'
                component={Userredux}
              />
              <Route
                path='/system/manage-admin-pro'
                component={Profile}
              />
              <Route
                path='/system/manage-doctor'
                component={ManageDoctor}
              />
              <Route
                path='/system/manage-specialty'
                component={ManageSpecialty}
              />
              <Route
                path='/system/manage-clinic'
                component={ManageClinic}
              />
              <Route
                path='/system/edit-specialty'
                component={EditSpecialty}
              />
              <Route
                path='/system/edit-clinic'
                component={EditClinic}
              />
              <Route
                path='/system/manage-hand-book'
                component={ManageHandbook}
              />
              <Route
                path='/system/edit-hand-book'
                component={EditHandbook}
              />
              <Route
                path='/system/dashboard'
                component={Dashboard}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
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
)(System);
