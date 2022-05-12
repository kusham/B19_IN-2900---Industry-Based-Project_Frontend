import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8070" });
// candidate API
export const createCandidate = (candidateData) =>
  API.post("/recruitment/candidate/create", candidateData);
export const searchCandidate = (NIC) =>
  API.get(`/recruitment/candidate/${NIC}`);
export const updateCandidate = (candidateData, candidateId) =>
  API.put(`/recruitment/candidate/${candidateId}`, candidateData);
export const fetchCandidates = () => API.get(`/recruitment/candidates`);

// Interview API
export const fetchEmployees = () => API.get(`/employee/`);
export const createInterview = (interviewData) =>
  API.post(`/recruitment/interview/create`, interviewData);

export const getInterviewList = (employeeID) =>
  API.get(`/recruitment/interview/${employeeID}`);
export const updateInterview = (interview, interviewID) =>
  API.put(`/recruitment/interview/${interviewID}`, interview);
export const cancelInterview = (interviewID) =>
  API.delete(`/recruitment/interview/${interviewID}`);
export const markedCandidate = (marks, interviewID) => {
  return API.put(`/recruitment/interview/start/${interviewID}`, marks);
};
// LogIn API
export const userLogin = (user) => API.post("/login", user);

// Assets API

export const availableAssets = () => API.get("/assets/available");
export const nonavailableAssets = () => API.get("/assets/unavailable");
export const allAssets = () => API.get("/assets/");
export const eachAssetDetails = (id) => API.get("/assets/detail/" + id);
export const unassign = (id) => API.patch("/assets/unassign/" + id);
export const releaseFault = (id) => API.patch("/assets/releaseFault/" + id);
export const createFault = (id) => API.patch("/assets/fault/" + id);
export const assignAsset = (assignAsset, employee) =>
  API.patch("/assets/assign/" + assignAsset, employee);
export const searchAssetCategory = (assetCategory) =>
  API.get("/assets/category/" + assetCategory);
export const insertAsset = (asset) => API.post("/assets/add", asset);
export const updateAsset = (id, asset) =>
  API.patch("/assets/update/" + id, asset);

//Current Salary API
export const viewCurrentSalarySheet = () => API.get("/salary/currentSalary");
export const createCurrentSalarySheet = (newCurruntSalarySheet) =>
  API.post("/salary/currentSalary/create", newCurruntSalarySheet);
export const findCurrentSalarySheet = (EmployeeID) =>
  API.get(`/salary/currentSalary/${EmployeeID}`);
export const updateCurrentSalarySheet = (updatedData, EmployeeID) =>
  API.patch(`/salary/currentSalary/update/${EmployeeID}`, updatedData);
export const deleteCurrentSalarySheet = (EmployeeID) =>
  API.delete(`/salary/currentSalary/delete/${EmployeeID}`);

//Summary salary payment API
export const viewSummarySalarySheet = () => API.get("/salary/summarySalary");
export const findSummarySalarySheetByEid = (EmployeeID) =>
  API.get(`/salary/${EmployeeID}`);

//Employee salary sheet API
export const viewCurrentEmployeeSalarySheet = (EmployeeID) =>
  API.get(`/salary/employeeSalary/${EmployeeID}`);
export const findEmployeeSalarySheetByMonth = (EmployeeID, Month) =>
  API.get(`/salary/employeeSalary/${EmployeeID}/${Month}`);

//Questions API
export const viewAllQuestions = () => API.get("/promotion/Questions/");
export const createQuestions = (newQuestion) =>
  API.post("/promotion/Questions/create", newQuestion);

//Paper API
export const viewAllPapersList = () => API.get("/promotion/Paper");
export const createPaper = (newPaper) =>
  API.post("/promotion/Paper/createPaper", newPaper); //check
export const addMoreQuestions = (PaperID, [Questions]) =>
  API.get(`/promotion/Paper/addMoreQuestions/${PaperID}`, [Questions]); //check
export const updatePaperDetails = (PaperID, updatedData) =>
  API.get(`/promotion/Paper/updatePaperDetails/${PaperID}`, updatedData); //check
export const deletePaper = (PaperID) =>
  API.get(`/promotion/Paper/delete/${PaperID}`); //check

// employee's paper API
export const displayPaper = (EmployeeID) =>
  API.get(`/promotion/Paper/${EmployeeID}`);

//ratings  for employee API
export const submitPaper = (EmployeeID) =>
  API.post(`/promotion/submitPaper/${EmployeeID}`); //check
export const displayFeedback = (EmployeeID) =>
  API.get(`/promotion/evaluation/mySubmissions/${EmployeeID}`);

//team leads API
export const allSubmissions = () =>
  API.get("/promotion/evaluation/allSubmissions");
export const displayTeamMemberSubmissions = (TeamLeadID) =>
  API.get(`/promotion//evaluation/allSubmissions/${TeamLeadID}`);
export const evaluatePaper = (EmployeeID, PaperID) =>
  API.patch(`/promotion/evaluation/evaluatePaper/${EmployeeID}/${PaperID}`); //check

export const requestLeave = (leaveDetail) =>
  API.post("/leave/request", leaveDetail);
export const getLeaveList = (employeeId) => API.get("/leave/" + employeeId);
export const cancelLeave = (id, reason, employeeId) =>
  API.post(`/leave/cancel/${id}`, { reason, employeeId });
export const getRequestedleave = (employeeId) =>
  API.get("/leave/requestedLeave/" + employeeId);
export const responseRequestedLeave = (id) =>
  API.post("/leave/requestedLeave/response/" + id);

//employee api
export const createEmployee = (employee) =>
  API.post(`/employee/add/`, employee);

export const updateEmployee = (employeeData) =>
  API.put(`/employee/update/${employeeData.employeeID}`, employeeData);

export const viewAllEmployees = () => {
  return API.get(`http://localhost:8070/employee/`);
};

export const recentEmployees = () => {
  return API.get(`http://localhost:8070/employee/recentSection`);
};
//teams api
export const createTeams = (teamcreate) =>
  API.post(`http://localhost:8070/employee/teamAdd`, teamcreate);

export const updateTeam = (updateteam, id) => {
  API.put(`http://localhost:8070/employee/updateTeam/${id}`, updateteam);
};

export const getEmployeesWithoutTeam = () => {
  return API.get(`http://localhost:8070/employee/get`);
};

export const viewAllTeams = () => {
  return API.get(`http://localhost:8070/employee/viewTeam`);
};

export const getAllTeams = () => {
  return API.get(`http://localhost:8070/employee/getTeam`);
};
//product api

export const createProduct = (productcreate) => {
  API.post(`http://localhost:8070/employee/addProduct`, productcreate);
};

export const updateProduct = (updateProdData, id) => {
  API.put(`http://localhost:8070/employee/updateProduct/${id}`, updateProdData);
};

export const viewPProducts = (viewproduct) => {
  return API.get(`http://localhost:8070/employee/viewProducts`);
};
export const getLeaveBalance = (employeeID) =>
  API.get(`/leave/leaveBalance/${employeeID}`);
