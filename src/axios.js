import axios from "axios";
import _ from "lodash";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  //   withCredentials: true,
});

//   httpStatusCode,
//   statusCode,
//   errorMessage,
//   problems,
//   errorCode = ""
// ) => {
//   const error = new Error();
//   error.httpStatusCode = httpStatusCode;
//   error.statusCode = statusCode;
//   error.errorMessage = errorMessage;
//   error.problems = problems;
//   error.errorCode = errorCode + "";
//   return error;
// };

// export const isSuccessStatusCode = (s) => {

//   const statusType = typeof s;
//   return (
//     (statusType === "number" && s === 0) ||
//     (statusType === "string" && s.toUpperCase() === "OK")
//   );
// };

instance.interceptors.response.use((response) => {
  const { data } = response;
  return response.data;
});

export default instance;