import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import { updateEmployee } from "../../../Api/ReportersManagementModule/EmployeeApi";

function EditEmployee() {
  const jobRole = JSON.parse(localStorage.getItem("profile")).jobRole; //profile should change to user
  const location = useLocation();
  const { employee } = location.state;
  console.log({ employee: employee, mes: "hi" });
  // const id = useParams().empID;
  const [inputs, setInputs] = useState({
    // employeeID: employee.user.employeeID,
    employeeFirstName: employee.user.employeeFirstName,
    employeeLastName: employee.user.employeeLastName,
    streetNo: employee.user.streetNo ? employee.user.streetNo : "",
    phoneNumber: employee.user.phoneNumber ? employee.user.phoneNumber : "",
    companyEmail: employee.user.companyEmail,
    profilePic: employee.user.profilePic,
    NIC: employee.user.NIC ? employee.user.NIC : "",
    city: employee.user.city ? employee.user.city : "",
    birthday: new Date(employee.user.birthday)
      ? new Date(employee.user.birthday)
      : "",
    //------------------------------------
    status: employee.user.status ? employee.user.status : "",
    employeeID: employee.user.employeeID ? employee.user.employeeID : "",
    jobRole: employee.user.jobRole ? employee.user.jobRole : "",
    jobType: employee.user.jobType ? employee.user.jobType : "",

    //-------------------------------------------------------------
    ordinaryLevelResult: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.ordinaryLevelResult
      : " ",
    advancedLevelResults: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.advancedLevelResults
      : " ",
    achievements: employee.EmployeeWithAcc
      ? employee.EmployeeWithAcc.achievements
      : " ",
    degree: employee.EmpWithProf ? employee.EmpWithProf.degree : " ",
    language: employee.EmpWithProf ? employee.EmpWithProf.language : " ",
    course: employee.EmpWithProf ? employee.EmpWithProf.course : " ",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await updateEmployee(inputs);
    console.log(response);
  };

  const Input = styled("input")({
    display: "none",
  });

  const uploadProfilePhoto = (event) => {
    const fileType = ["image/png"];
    let selectedFile = event.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = (event) => {
        setInputs({
          ...inputs,
          profilePic: event.target.result,
        });
      };
    } else {
      console.log("Please select valid image file");
    }
  };
  return (
    <div>
      {inputs && (
        <form>
          <Box>
            <Paper elevation={3} style={{ padding: 20 }}>
              <Grid container>
                <Grid item sm={12} md={12}>
                  <Typography variant="h5">
                    <PersonIcon sx={{ width: 50, height: 50 }} />
                    MY PROFILE
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={12}
                  md={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    src={inputs.profilePic}
                    sx={{
                      mt: 5,
                      mb: 5,
                      width: 150,
                      height: 150,
                      border: "0.5px solid #1b529e",
                    }}
                  />

                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={uploadProfilePhoto}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera sx={{ mt: 10, width: 30, height: 30 }} />
                    </IconButton>
                  </label>

                  {/* </Avatar> */}
                </Grid>
                <Grid item sm={12} md={12}>
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6} sx={{ mb: 5 }}>
                      <Button
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                      >
                        UPDATE
                      </Button>
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <Button
                        LinkComponent={Link}
                        to={`/dashboard`}
                        variant="contained"
                        fullWidth
                      >
                        CANCEL
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={12}>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            First Name :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" First Name "
                            variant="filled"
                            name="employeeFirstName"
                            value={inputs.employeeFirstName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Last Name :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="  Last Name"
                            variant="filled"
                            name="employeeLastName"
                            value={inputs.employeeLastName}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Email :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Email"
                            variant="filled"
                            name="companyEmail"
                            value={inputs.companyEmail}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            NIC :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR" ? (
                            <TextField
                              id="filled-basic"
                              variant="filled"
                              name="NIC"
                              value={inputs.NIC}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            <TextField
                              disabled
                              id="outlined-disabled"
                              variant="filled"
                              name="NIC"
                              value={inputs.NIC}
                              onChange={handleChange}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Phone Number :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Phone Number "
                            variant="filled"
                            name="phoneNumber"
                            value={inputs.phoneNumber}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Birthday :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                              <DatePicker
                                label="Birthday"
                                name="birthday"
                                inputFormat="dd/MM/yyyy"
                                value={inputs.birthday}
                                onChange={(newValue) => {
                                  setInputs({
                                    ...inputs,
                                    birthday: newValue,
                                  });
                                }}
                                renderInput={(params) => (
                                  <TextField variant="filled" {...params} />
                                )}
                              />
                            </Stack>
                          </LocalizationProvider>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Street No :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" Street No"
                            variant="filled"
                            name="streetNo"
                            value={inputs.streetNo}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            City :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="City"
                            variant="filled"
                            name="city"
                            value={inputs.city}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR" && (
                            <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                              Employee ID :
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR" && (
                            <TextField
                              id="filled-basic"
                              label=" Employee ID"
                              variant="filled"
                              name="employeeID"
                              value={inputs.employeeID}
                              onChange={handleChange}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR" && (
                            <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                              Job Type:
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR" && (
                            <TextField
                              id="filled-basic"
                              label=" Job Type"
                              variant="filled"
                              name="jobType"
                              value={inputs.jobType}
                              onChange={handleChange}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR" && (
                            <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                              Status :
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR" && (
                            <TextField
                              id="filled-basic"
                              label=" Status"
                              variant="filled"
                              name="Status"
                              value={inputs.status}
                              onChange={handleChange}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          {jobRole === "HR" && (
                            <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                              Job Role :
                            </FormLabel>
                          )}
                        </Grid>
                        <Grid item xs={6} md={9}>
                          {jobRole === "HR" && (
                            <TextField
                              id="filled-basic"
                              label="Job Role"
                              variant="filled"
                              name="city"
                              value={inputs.jobRole}
                              onChange={handleChange}
                              fullWidth
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={12} md={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid></Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Degree :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Degree"
                            variant="filled"
                            name="degree"
                            value={inputs.degree || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Languages :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Languages"
                            variant="filled"
                            name="language"
                            value={inputs.language || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Courses :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Courses"
                            variant="filled"
                            name="course"
                            value={inputs.course || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6} sx={{ mb: 1 }}></Grid>
                    <Grid item sm={12} md={12}>
                      <Divider variant="middle" />
                    </Grid>
                    <Grid item xs={6} sx={{ mt: 1 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            A/L Results :{" "}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label=" A/L Results"
                            variant="filled"
                            name="advancedLevelResults"
                            value={inputs.advancedLevelResults || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            Achievements :{" "}
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="Achievements"
                            variant="filled"
                            name="achievements"
                            value={inputs.achievements || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      style={{
                        marginBlockStart: "20px",
                        marginBlockEnd: "20px",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                          <FormLabel sx={{ ml: 1, mt: 2 }} className="label">
                            O/L Results :
                          </FormLabel>
                        </Grid>
                        <Grid item xs={6} md={9}>
                          <TextField
                            id="filled-basic"
                            label="O/L Results"
                            variant="filled"
                            name="ordinaryLevelResult"
                            value={inputs.ordinaryLevelResult || " "}
                            onChange={handleChange}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </form>
      )}
    </div>
  );
}

export default EditEmployee;
