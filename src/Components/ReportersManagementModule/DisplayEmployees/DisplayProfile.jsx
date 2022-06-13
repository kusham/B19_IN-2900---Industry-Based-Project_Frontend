// import useStyles from "./DisplayProfileCardStyles";
import {
  Divider,
  Typography,
  Button,
  Avatar,
  Card,
  Grid,
  FormLabel,
} from "@mui/material";
import { Link } from "react-router-dom";
import moment from "moment";
import ProgressBar from "./ProgressBar";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import CakeIcon from "@mui/icons-material/Cake";
import PlaceIcon from "@mui/icons-material/Place";
import React, { useEffect, useState } from "react";
import { getAllTeams } from "../../../Api/ReportersManagementModule/TeamsApi";


function DisplayProfile({ employee }) {
  const [teams, setTeams] = useState();
  const jobRole = JSON.parse(sessionStorage.getItem("user")).jobRole; //profile should change to user
  // const handleUpdate = () => {
  //   setUpdateEmployee(profile);
  //   setUpdateState(true);
  // };

  const { user, EmployeeWithAcc, EmpWithProf } = employee;
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      setTeams(await getAllTeams());
    }
    fetchData();
  }, []);

  return (
    <div>
      <Card
        sx={{
          borderRadius: 5,
          marginBottom: 5,
          padding: 5,
          maxWidth: 750,
          minWidth: 750,
          minHeight: 450,
          // backgroundColor: "#e4ecf7",
          cursor: "pointer",
        }}
      >
        <Grid container>
          <Grid item md={9}>
            <Typography
              variant="h6"
              textAlign="left"
              sx={{
                mb: 1,
                fontWeight: "bold",
                color: "#183d78",
                fontFamily: "Kdam Thmor Pro",
              }}
            >
              {/* {user &&
                user.employeeFirstName[0].toUpperCase() +
                  user.employeeFirstName.slice(1) +
                  " " +
                  user.employeeLastName[0].toUpperCase() +
                  user.employeeLastName.slice(1) +
                  " | " +
                  user.jobRole.replace(/\w\S* */}
              {user &&
                user.employeeFirstName +
                  " " +
                  user.employeeLastName +
                  " | " +
                  user.jobRole}
            </Typography>
          </Grid>
          <Grid item md={3}>
            {teams &&
              user &&
              teams.map((team) => {
                if (team._id === user.teamID) {
                  return (
                    <Typography
                      variant="h6"
                      textAlign="center"
                      key={team._id}
                      sx={{ color: "#8385a8" }}
                    >
                      {team.teamName}
                    </Typography>
                  );
                }
              })}
          </Grid>
        </Grid>
        <Grid container>
          <Grid item md={6} padding={1}>
            <Grid sx={{ justifyContent: "center", display: "flex" }}>
              <Avatar
                sx={{ width: 100, height: 100, border: "0.5px solid #1b529e" }}
                src={user.profilePic}
                alt={user.employeeFirstName + " " + user.employeeLastName}
              ></Avatar>
            </Grid>
            <Grid md={12}>
              <ProgressBar
                EmployeeWithAcc={EmployeeWithAcc}
                EmpWithProf={EmpWithProf}
                user={user}
                // birthday={user.birthday}
                // streetNo={user.streetNo}
                // city={user.city}
                // phoneNumber={user.phoneNumber}
              />
              <Typography
                textAlign="center"
                sx={{ fontWeight: "bold", color: "#183d78", mb: 1 }}
              >
                Completeness of the Profile
              </Typography>
            </Grid>
            {/* <Typography>{moment("lastSeen", "YYYYMMDD").fromNow()}</Typography> */}
            <Typography>
              {moment(user.lastSeen).format("ddd MMM DD YYYY hh:mm:ss")}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Profile Info
            </Typography>
            <Grid>
              {user.streetNo && (
                <Typography>
                  <PlaceIcon sx={{ color: "#183d78" }} />
                  &nbsp; {user.streetNo + " " + user.city}
                </Typography>
              )}
              {user.phoneNumber && (
                <Typography>
                  <ContactPhoneIcon sx={{ color: "#183d78" }} />
                  &nbsp; {user.phoneNumber}
                </Typography>
              )}
              <Typography>
                <ContactMailIcon sx={{ color: "#183d78" }} />
                &nbsp;&nbsp;{user.companyEmail}
              </Typography>
              {jobRole === "HR Manager" && (
                <Grid>
                  {user.birthday && (
                    <Typography>
                      <CakeIcon sx={{ color: "#183d78" }} />
                      &nbsp; {new Date(user.birthday).toDateString()}
                      {/* {momen{user.birthday).format("MMM DD YYYY")} */}
                    </Typography>
                  )}
                  <Typography>
                    <PermIdentityIcon sx={{ color: "#183d78" }} />
                    &nbsp;{user.NIC}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item md={6} padding={1}>
            <Divider sx={{ mt: 1, mb: 1 }}></Divider>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Job Type :&nbsp;
              </FormLabel>
              {user.jobType}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Status :&nbsp;
              </FormLabel>
              {user.status}
            </Typography>

            {/* <Typography>Team :{user.teamID}</Typography> */}
            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Accademic Qulaifications
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                O/L Results :{" "}
              </FormLabel>

              {EmployeeWithAcc &&
                EmployeeWithAcc.ordinaryLevelResult.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <Grid cotainter>
                <Grid item md={5}></Grid>
                <Grid item md={7}></Grid>
              </Grid>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                A/L Results :&nbsp;
              </FormLabel>
              {EmployeeWithAcc &&
                EmployeeWithAcc.advancedLevelResults.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Achievements :&nbsp;
              </FormLabel>

              {EmployeeWithAcc &&
                EmployeeWithAcc.achievements.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Divider sx={{ mt: 2, mb: 2 }}></Divider>
            <Typography sx={{ fontWeight: "bold", mb: 1, color: "#183d78" }}>
              Professional Qualifications
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                {" "}
                Degree : &nbsp;
              </FormLabel>
              {EmpWithProf &&
                EmpWithProf.degree.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                Courses :&nbsp;
              </FormLabel>

              {EmpWithProf &&
                EmpWithProf.course.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
            <Typography>
              <FormLabel sx={{ color: "#9098a6", fontWeight: "bold" }}>
                {" "}
                Languages :&nbsp;
              </FormLabel>

              {EmpWithProf &&
                EmpWithProf.language.map((result, i) => {
                  return (
                    <Typography component={"span"} key={i}>
                      {result + " "}
                    </Typography>
                  );
                })}
            </Typography>
          </Grid>
        </Grid>

        {/* <Button onClick={handleUpdate} sx={{ mt: 5 }} fullWidth  variant="contained" size="medium">
          Update
        </Button> */}
        {jobRole === "HR Manager" && (
          <Button
            component={Link}
            to={`/profile/update`}
            state={{ employee }}
            sx={{ mt: 5, backgroundColor: "#183d78" }}
            fullWidth
            variant="contained"
            size="medium"
          >
            Update
          </Button>
        )}
      </Card>
    </div>
  );
}

export default DisplayProfile;
