import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorService,
  saveInforDoctorService,
  getAllSpecialty,
  getAllClinic,
  deleteSpeService,
  deleteClinicService,
  editSpecialtyService,
  createSpecialty,
  editClinicService,
  createClinic,
  editHandbookService,
  getAllHandbook,
  createHandbook,
} from "../../services/userService";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (e) {
      dispatch(fetchGenderFail());
      console.log(e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAIL,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (e) {
      dispatch(fetchPositionFail());
      console.log(e);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAIL,
});

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (e) {
      dispatch(fetchRoleFail());
      console.log(e);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAIL,
});

export const saveUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create User Success");
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Create User Fail");
        dispatch(saveUserfail());
      }
    } catch (e) {
      toast.error("Create User Fail");
      dispatch(saveUserfail());
      console.log(e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.SAVE_USER_SUCCESS,
});

export const saveUserfail = () => ({
  type: actionTypes.SAVE_USER_FAIL,
});

export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUSerSuccess(res.user.reverse()));
      } else {
        toast.error("Fetch All User Fail");
        dispatch(fetchAllUserFail());
      }
    } catch (e) {
      toast.error("Fetch All User Fail");
      dispatch(fetchAllUserFail());
      console.log(e);
    }
  };
};

export const fetchAllUSerSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFail = () => ({
  type: actionTypes.FETCH_ALL_USER_FAIL,
});

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete User Success");
        dispatch(deleteUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete User Fail");
        dispatch(deleteUserFail());
      }
    } catch (e) {
      toast.error("Delete User Fail");
      dispatch(deleteUserFail());
      console.log(e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAIL,
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Update User Success");
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Update User Fail");
        dispatch(editUserFail());
      }
    } catch (e) {
      toast.error("Update User Fail");
      dispatch(editUserFail());
      console.log(e);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAIL,
});

export const editSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editSpecialtyService(data);
      if (res && res.errCode === 0) {
        toast.success("Update Specialty Success");
        dispatch(editSpecialtySuccess());
      } else {
        toast.error("Update Specilaty Fail");
        dispatch(editSpecialtyFail());
      }
    } catch (e) {
      toast.error("Update Specialty Fail");
      dispatch(editSpecialtyFail());
      console.log(e);
    }
  };
};

export const editSpecialtySuccess = () => ({
  type: actionTypes.EDIT_SPECIALTY_SUCCESS,
});

export const editSpecialtyFail = () => ({
  type: actionTypes.EDIT_SPECIALTY_FAIL,
});

export const editClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editClinicService(data);
      if (res && res.errCode === 0) {
        toast.success("Update Clinc Success");
        dispatch(editClinicSuccess());
      } else {
        toast.error("Update Clinic Fail");
        dispatch(editClinicFail());
      }
    } catch (e) {
      toast.error("Update Clinic Fail");
      dispatch(editClinicFail());
      console.log(e);
    }
  };
};

export const editClinicSuccess = () => ({
  type: actionTypes.EDIT_CLINIC_SUCCESS,
});

export const editClinicFail = () => ({
  type: actionTypes.EDIT_CLINIC_FAIL,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
      });
    }
  };
};

export const fetchAllDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorService();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataAllDoctor: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
      });
    }
  };
};

export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveInforDoctorService(data);
      if (res && res.errCode === 0) {
        toast.success("Save infor doctor Success");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        toast.error("Save infor doctor fail");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
        });
      }
    } catch (e) {
      toast.error("Save infor doctor fail");
      console.log(e);
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,
      });
    }
  };
};

export const fetchAllSchduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS,
          dataTime: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL,
      });
    }
  };
};

export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_DOCTOR_INFOR_START,
      });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();

      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        dispatch(fetchAllRequiredDoctorSuccess(data));
      } else {
        dispatch(fetchAllRequiredDoctorFail());
      }
    } catch (e) {
      dispatch(fetchAllRequiredDoctorFail());
      console.log(e);
    }
  };
};

export const fetchAllRequiredDoctorSuccess = (
  allRequiredData
) => ({
  type: actionTypes.FETCH_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});

export const fetchAllRequiredDoctorFail = () => ({
  type: actionTypes.FETCH_DOCTOR_INFOR_FAIL,
});

export const fetchAllSpecialty = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllSpecialty();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_SUCCESS,
          dataSpecialty: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_SPECIALTY_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALL_SPECIALTY_FAIL,
      });
    }
  };
};

export const fetchAllCLinic = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_SUCCESS,
          dataClinic: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_CLINIC_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALL_CLINIC_FAIL,
      });
    }
  };
};

export const saveSpecialty = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createSpecialty(data);
      if (res && res.errCode === 0) {
        toast.success("Create Specialty Success");
        dispatch(saveSpecialtySuccess(res.data));
      } else {
        toast.error("Create Specialty Fail");
        dispatch(saveSpecialtyFail());
      }
    } catch (e) {
      toast.error("Create Specialty Fail");
      dispatch(saveSpecialtyFail());
      console.log(e);
    }
  };
};

export const saveSpecialtySuccess = () => ({
  type: actionTypes.SAVE_SPECIALTY_SUCCESS,
});

export const saveSpecialtyFail = () => ({
  type: actionTypes.SAVE_SPECIALTY_FAIL,
});

export const saveClinic = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createClinic(data);
      if (res && res.errCode === 0) {
        toast.success("Create Clinic Success");
        dispatch(saveClinicSuccess(res.data));
      } else {
        toast.error("Create Clinic Fail");
        dispatch(saveClinicFail());
      }
    } catch (e) {
      toast.error("Create Clinic Fail");
      dispatch(saveClinicFail());
      console.log(e);
    }
  };
};

export const saveClinicSuccess = () => ({
  type: actionTypes.SAVE_CLINIC_SUCCESS,
});

export const saveClinicFail = () => ({
  type: actionTypes.SAVE_CLINIC_FAIL,
});

export const deleteSpe = (speId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteSpeService(speId);
      if (res && res.errCode === 0) {
        toast.success("Delete Specialty Success");
        dispatch(deleteSpeSuccess(res.data));
      } else {
        toast.error("Delete Specialty Fail");
        dispatch(deleteSpeFail());
      }
    } catch (e) {
      toast.error("Delete Specialty Fail");
      dispatch(deleteSpeFail());
      console.log(e);
    }
  };
};

export const deleteSpeSuccess = () => ({
  type: actionTypes.DELETE_SPE_SUCCESS,
});

export const deleteSpeFail = () => ({
  type: actionTypes.DELETE_SPE_FAIL,
});

export const deleteCli = (cliId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteClinicService(cliId);
      if (res && res.errCode === 0) {
        toast.success("Delete Clinic Success");
        dispatch(deleteCliSuccess(res.data));
      } else {
        toast.error("Delete Clinic Fail");
        dispatch(deleteCliFail());
      }
    } catch (e) {
      toast.error("Delete Clinic Fail");
      dispatch(deleteCliFail());
      console.log(e);
    }
  };
};

export const deleteCliSuccess = () => ({
  type: actionTypes.DELETE_SPE_SUCCESS,
});

export const deleteCliFail = () => ({
  type: actionTypes.DELETE_SPE_FAIL,
});

export const editHandbook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editHandbookService(data);
      if (res && res.errCode === 0) {
        toast.success("Update Handbook Success");
        dispatch(editHandbookSuccess());
      } else {
        toast.error("Update Handbook Fail");
        dispatch(editHandbookFail());
      }
    } catch (e) {
      toast.error("Update Handbook Fail");
      dispatch(editHandbookFail());
      console.log(e);
    }
  };
};

export const editHandbookSuccess = () => ({
  type: actionTypes.EDIT_HANDBOOK_SUCCESS,
});

export const editHandbookFail = () => ({
  type: actionTypes.EDIT_HANDBOOK_FAIL,
});

export const fetchAllHandbook = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllHandbook();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_HANDBOOK_SUCCESS,
          dataHandbook: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_HANDBOOK_FAIL,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ALL_HANDBOOK_FAIL,
      });
    }
  };
};

export const saveHandbook = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createHandbook(data);
      if (res && res.errCode === 0) {
        toast.success("Create HandBook Success");
        dispatch(saveHandbookSuccess(res.data));
      } else {
        toast.error("Create HandBook Fail");
        dispatch(saveHandbookFail());
      }
    } catch (e) {
      toast.error("Create HandBook Fail");
      dispatch(saveHandbookFail());
      console.log(e);
    }
  };
};

export const saveHandbookSuccess = () => ({
  type: actionTypes.SAVE_HANDBOOK_SUCCESS,
});

export const saveHandbookFail = () => ({
  type: actionTypes.SAVE_HANDBOOK_FAIL,
});
