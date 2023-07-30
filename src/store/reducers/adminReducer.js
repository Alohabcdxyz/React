import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfor: [],
  allSpecialty: [],
  allClinic: [],
  allHandbook: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIL:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIL:
      state.positions = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIL:
      state.roles = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAIL:
      state.users = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctors = action.dataDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAIL:
      state.topDoctors = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataAllDoctor;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTOR_FAIL:
      state.allDoctors = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOUR_FAIL:
      state.allScheduleTime = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_INFOR_SUCCESS:
      state.allRequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_INFOR_FAIL:
      state.allRequiredDoctorInfor = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_SUCCESS:
      state.allSpecialty = action.dataSpecialty;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SPECIALTY_FAIL:
      state.allSpecialty = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_HANDBOOK_SUCCESS:
      state.allHandbook = action.dataHandbook;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_HANDBOOK_FAIL:
      state.allHandbook = [];
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_SUCCESS:
      state.allClinic = action.dataClinic;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_CLINIC_FAIL:
      state.allClinic = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
