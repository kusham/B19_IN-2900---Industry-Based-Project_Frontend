import React, { useState } from "react";
import { CssBaseline, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./Components/Navigation/NavBar/NavBar";
import SideBar from "./Components/Navigation/SideBar/SideBar";
import CreateCandidate from "./Pages/RecruitmentModule/CreateCandidateProfile/CreateCandidate";
import ViewAsset from "./Components/AssetManagementModule/ViewAsset";
// import ViewAsset from './Pages/AssetManagementModule/ViewAsset'
import Login from "./Components/Login/Login";
import EditEmployee from "./Components/ReportersManagementModule/UpdateEmployeesForm/EditEmployee";
import DashBord from "./Pages/ReportersManagementModule/DashBoard/DashBord";
import TeamPage from "./Pages/ReportersManagementModule/Teams/TeamPage";
import ProductPage from "./Pages/ReportersManagementModule/Products/ProductPage";
import CreateProduct from "./Components/ReportersManagementModule/ProductCreate/CreateProduct";
import UserProfile from "./Components/ReportersManagementModule/UserProfile/UserProfile";
import EditProduct from "./Components/ReportersManagementModule/ProductUpdate/EditProduct";
import ProgressBar from "./Components/ReportersManagementModule/DisplayEmployees/ProgressBar";
import EditTeam from "./Components/ReportersManagementModule/TeamUpdate/EditTeam";
import CreateTeamPage from "./Pages/ReportersManagementModule/Teams/CreateTeamPage";
import CreateProductPage from "./Pages/ReportersManagementModule/Products/CreateProductPage";
import CreateEmployeePage from "./Pages/ReportersManagementModule/DashBoard/CreateEmployeePage";

import Interviews from "./Pages/RecruitmentModule/Interviews/Interviews";
import AssetInsertion from "./Components/AssetManagementModule/AssetInsertion";

import RequestLeaves from "./Pages/LeaveManagementModule/RequestLeaves/RequestLeaves";

import CreateUpdateInterview from "./Pages/RecruitmentModule/Interviews/CreateUpdateInterview/CreateUpdateInterview";
import LeaveHistory from "./Pages/LeaveManagementModule/RequestLeaves/LeaveHistory";
import StartInterview from "./Pages/RecruitmentModule/StartInterview/StartInterview";
import CountUpStack from "./Components/ReportersManagementModule/CountUps/CountUpStack";
import OrganizationStructure from "./Components/ReportersManagementModule/OrganizationStructure/OrganizationStructure";
import CustomizedTeamView from "./Components/ReportersManagementModule/CustomizedTemView/CustomizedTeamView";

function App() {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(true);
  // const data = JSON.parse(localStorage.getItem("apiData"));
  // const [user, setUser] = useState(data.employeeFirstName);
  // const [role, setRole] = useState(data.jobRole);
  // const [profileImage, setProfileImage] = useState(data.profilePic);
  // console.log(data.employeeFirstName);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {user && (
        <SideBar open={open} toggleDrawer={toggleDrawer} setUser={user} />
      )}
      <Grid container>
        <Grid item sm={12} md={12}>
          {user && <NavBar open={open} toggleDrawer={toggleDrawer} />}
        </Grid>
        <Grid item sm={12} md={12}>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login setUser={setUser} />} />
              <Route path="/dashboard" element={<DashBord />} />
              <Route path="/profile/update/" element={<EditEmployee />} />
              <Route path="dashboard/create" element={<CreateEmployeePage />} />

              <Route path="/teams" element={<TeamPage />} />
              <Route path="/teams/update/:id" element={<EditTeam />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/products/create" element={<CreateProductPage />} />
              <Route path="teams/create" element={<CreateTeamPage />} />
              {/* <Route path="/createteams" element={<CreateTeams />} /> */}
              <Route path="/pro" element={<CreateProduct />} />
              <Route path="/user" element={<UserProfile user={user} />} />
              <Route path="/products/update/:id" element={<EditProduct />} />
              <Route path="progress" element={<ProgressBar />} />
              

              <Route path="/candidate" element={<CreateCandidate />} />
              <Route path="/interview" element={<Interviews open={open} />} />
              <Route
                path="/interview/create"
                element={<CreateUpdateInterview />}
              />
              <Route
                path="/interview/update"
                element={<CreateUpdateInterview />}
              />
              <Route path="/interview/start" element={<StartInterview />} />

              <Route path="/asset" element={<ViewAsset />} />
              <Route path="/assetInsertion" element={<AssetInsertion />} />

              <Route path="/requestLeave" element={<RequestLeaves />} />
              <Route path="/myLeaveHistory" element={<LeaveHistory />} />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
