import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/";

// import style manually
import "react-markdown-editor-lite/lib/index.css";

class TableAmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  handleDeleteUser = (users) => {
    this.props.deleteUserRedux(users.id);
  };

  hadldeEditUser = (users) => {
    this.props.handleEditUserToChild(users);
  };

  render() {
    let arrUser = this.state.usersRedux;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone Number</th>
              <th>Gender</th>
              <th>Option</th>
            </tr>
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                return (
                  <>
                    {item.roleId === "R1" && (
                      <tr key={index}>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.email}</td>
                        <td>{item.address}</td>
                        <td>{item.phoneNumber}</td>
                        <td>
                          {item.gender === "M"
                            ? "Male"
                            : item.gender === "F"
                            ? "Female"
                            : "Other"}
                        </td>
                        <td>
                          <button
                            className='btn-edit'
                            onClick={() =>
                              this.hadldeEditUser(item)
                            }
                          >
                            <i className='fas fa-pencil-alt'></i>
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () =>
      dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) =>
      dispatch(actions.deleteUser(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableAmin);
