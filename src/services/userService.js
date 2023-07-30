import axios from "../axios";

export const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", {
    email: userEmail,
    password: userPassword,
  });
};

export const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-user?id=${inputId}`, {
    id: inputId,
  });
};

export const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

export const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    data: { id: userId },
  });
};

export const editUserService = (newData) => {
  return axios.put("/api/edit-user", newData);
};

export const editSpecialtyService = (newData) => {
  return axios.put("/api/edit-specialty", newData);
};

export const editClinicService = (newData) => {
  return axios.put("/api/edit-clinic", newData);
};

export const getAllCodeService = (inpType) => {
  return axios.get(`/api/allcode?type=${inpType}`);
};

export const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

export const getAllDoctorService = () => {
  return axios.get(`/api/get-all-doctor`);
};

export const saveInforDoctorService = (data) => {
  return axios.post(`/api/save-infor-doctor`, data);
};

export const getDetailInforDoctorService = (inpId) => {
  return axios.get(`/api/get-infor-doctor?id=${inpId}`);
};

export const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

export const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export const getScheduleDoctorBookingByDate = (
  doctorId,
  date
) => {
  return axios.get(
    `/api/get-schedule-doctor-booking-by-date?doctorId=${doctorId}&date=${date}`
  );
};

export const getExxtraInforDoctorById = (doctorId) => {
  return axios.get(
    `/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`
  );
};

export const getProfileDoctorById = (doctorId) => {
  return axios.get(
    `/api/get-profile-doctor?doctorId=${doctorId}`
  );
};

export const postPatientBooking = (data) => {
  return axios.post(`/api/patient-book-schedule`, data);
};

export const verifyPatientBooking = (data) => {
  return axios.post(
    `/api/verify-patient-book-schedule`,
    data
  );
};

export const createSpecialty = (data) => {
  return axios.post(`/api/create-specialty`, data);
};

export const getAllSpecialty = () => {
  return axios.get(`/api/get-all-specialty`);
};

export const getDoctorSpecialty = (data) => {
  return axios.get(
    `/api/get-detail-specialty-doctor?id=${data.id}&location=${data.location}`
  );
};

export const getDetailHandbook = (id) => {
  return axios.get(`/api/get-detail-handbook?id=${id}`);
};

export const createClinic = (data) => {
  return axios.post(`/api/create-clinic`, data);
};

export const getAllClinic = () => {
  return axios.get(`/api/get-all-clinic`);
};

export const getDoctorClinic = (data) => {
  return axios.get(
    `/api/get-detail-clinic-doctor?id=${data.id}`
  );
};

export const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-booking?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export const getAllPatientForDoctorNotConfirm = (data) => {
  return axios.get(
    `/api/get-list-not-confirm-booking?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export const getAllPatientForDoctorDoneBooking = (data) => {
  return axios.get(
    `/api/get-list-done-booking?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export const getAllPatientForDoctorCancelBooking = (
  data
) => {
  return axios.get(
    `/api/get-list-booking-cancel?doctorId=${data.doctorId}&date=${data.date}`
  );
};

export const sendRemedyDetail = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

export const sendCancelDetail = (data) => {
  return axios.post(`/api/send-cancel`, data);
};

export const deleteSpeService = (speId) => {
  return axios.delete("/api/delete-specialty", {
    data: { id: speId },
  });
};

export const deleteClinicService = (cliId) => {
  return axios.delete("/api/delete-clinic", {
    data: { id: cliId },
  });
};

export const createHandbook = (data) => {
  return axios.post(`/api/create-handbook`, data);
};

export const getAllHandbook = () => {
  return axios.get(`/api/get-all-handbook`);
};

export const editHandbookService = (newData) => {
  return axios.put("/api/edit-handbook", newData);
};
