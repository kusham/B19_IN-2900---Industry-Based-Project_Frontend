import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
  Alert,
  Stack,
  AlertTitle,
} from "@mui/material";
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@mui/styles";
import { useParams } from "react-router-dom";

import { updateExamDetailsApi } from "../../../Api/PromotionModule/ExamApi/updateExamDetailsApi";
import { viewAllPapersListApi } from "../../../Api/PromotionModule/PaperApi/viewAllPapersListApi";
import { viewOneExamApi } from "../../../Api/PromotionModule/ExamApi/viewOneExamApi";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(3),
    margin: theme.spacing(3),
    "& .MuiTextField-root": {
      margin: theme.spacing(2),
    },
  },
  formHeader: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    "& .MuiTypography-h4": {
      margin: theme.spacing(1, 1),
      fontWeight: 500,
    },
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(5),
      marginLeft: theme.spacing(2),
    },
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(2),
    justifyContent: "flex-start",
    "& .MuiTextField-root": {
      width: theme.spacing(30),
    },
  },
  texFieldLabel: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& .MuiFormLabel-root": {
      fontWeight: 600,
      fontSize: 19,
    },
  },

  createButton: {
    display: "flex",
    justifyContent: "flex-end",
    margin: theme.spacing(2, 5, 1),
  },
}));
function UpdateExamForm() {
  const [ExamName, setExamName] = useState("");
  const [DateScheduled, setDateScheduled] = useState(null);
  const [JobRole, setJobRole] = useState("");
  const [PaperID, setPaperID] = useState("");
  const [organizerID, setOrganizerID] = useState("");
  const [error, seterror] = useState(false);
  const [added, setadded] = useState(false);
  const [PaperList, setPaperList] = useState([]);

  const { EmployeeID } = useParams();
  const { ExamID } = useParams();

  useEffect(() => {
    async function fetchData() {
      setPaperList(await viewAllPapersListApi());
    }
    fetchData();
  }, []);

  const [record, setRecord] = useState({
    organizerID: "",
    ExamID: "",
    ExamName: "",
    DateCreated: "",
    DateScheduled: "",
    PaperID: "",
    JobRole: "",
  });

  useEffect(() => {
    async function fetchData() {
      const result = await viewOneExamApi(EmployeeID, ExamID);
      setRecord(result, record);
      setExamName(result.ExamName, ExamName);
      setOrganizerID(result.organizerID, organizerID);
      setDateScheduled(result.DateScheduled, DateScheduled);
      setJobRole(result.JobRole, JobRole);
      setPaperID(result.PaperID, PaperID);
    }
    fetchData();
  }, []);
  //console.log("paper fetched", record);

  const sendData = async (e) => {
    e.preventDefault();

    const examDetails = { ExamID, ExamName, DateScheduled, JobRole, PaperID };
    if (ExamID && ExamName && DateScheduled && JobRole && PaperID) {
      const response = await updateExamDetailsApi(
        EmployeeID,
        ExamID,
        examDetails
      );
      if (response.success === true) {
        // setExamID("");
        setExamName("");
        setDateScheduled("");
        setJobRole("");
        setPaperID("");
        setadded(true);
        setTimeout(() => {
          setadded(false);
        }, 2000);
      }
    } else {
      seterror(true);
      setTimeout(() => {
        seterror(false);
      }, 2000);
    }
  };
  const classes = useStyles();
  return (
    <Box>
      <Grid item sm={12} md={12} className={classes.createButton}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() =>
            window.open(
              ` /promotion/evaluation/exam/viewExam/${EmployeeID}`,
              "_self"
            )
          }
        >
          View Exams
        </Button>
      </Grid>

      <Paper elevation={5} className={classes.form}>
        <Grid container>
          <Grid item sm={12} md={12} className={classes.formHeader}>
            <EventNoteRoundedIcon />
            <Typography variant="h4">Update Exam</Typography>
          </Grid>

          <Grid item sm={12} md={12}>
            <Divider variant="middle" />
            <Divider variant="middle" />
          </Grid>

          <Grid item sm={12} md={12}>
            <form autoComplete="off" onSubmit={sendData}>
              <Grid container>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Exam ID</InputLabel>
                    </Grid>
                    <TextField
                      label="ID"
                      variant="outlined"
                      disabled={true}
                      name="ExamID"
                      value={ExamID}
                      fullWidth
                    />
                  </Grid>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>organizer ID</InputLabel>
                    </Grid>
                    <TextField
                      label="ID"
                      variant="outlined"
                      disabled={true}
                      name="organizerID"
                      value={organizerID}
                      fullWidth
                    />
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Job Role</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        Job Role
                      </InputLabel>

                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={JobRole}
                        label="Job Role"
                        onChange={(e) => {
                          setJobRole(e.target.value);
                        }}
                      >
                        <MenuItem value="SE">SE</MenuItem>
                        <MenuItem value="BA">BA</MenuItem>
                        <MenuItem value="QA">QA</MenuItem>
                        <MenuItem value="HR">HR</MenuItem>
                        <MenuItem value="SSE">SSE</MenuItem>
                      </Select>

                      <FormHelperText>
                        Job Role for which exam is scheduling to
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Date Scheduled</InputLabel>
                    </Grid>
                    {/* <TextField
                      label="Date Scheduled"

                      name="DateScheduled"
                      value={DateScheduled}
                      onChange={(e) => {
                        setDateScheduled(e.target.value);
                      }}
                      fullWidth
                    /> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Schedule date"
                        variant="outlined"
                        value={DateScheduled}
                        onChange={(date) => {
                          setDateScheduled(date);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {/* value.format("YYYY-MM-DD HH:mm:ss"), "Asia/Singapore" */}
                  </Grid>

                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Exam Name</InputLabel>
                    </Grid>
                    <TextField
                      label="Exam Name"
                      variant="outlined"
                      name="ExamName"
                      value={ExamName}
                      onChange={(e) => {
                        setExamName(e.target.value);
                      }}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item sm={12} md={6} className={classes.inputs}>
                  <Grid container>
                    <Grid item sm={4} md={4} className={classes.texFieldLabel}>
                      <InputLabel>Paper ID</InputLabel>
                    </Grid>
                    <FormControl sx={{ m: 2, minWidth: 120 }}>
                      <InputLabel id="demo-simple-select-helper-label">
                        PaperID
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={PaperID}
                        label="PaperID"
                        onChange={(e) => {
                          setPaperID(e.target.value);
                        }}
                      >
                        {PaperList.map((option, key) => (
                          <MenuItem value={option.PaperID} key={key}>
                            {option.PaperID}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={12} md={12} className={classes.createButton}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                >
                  Schedule
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
      {added ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            The new Exam is successfully scheduled!
          </Alert>{" "}
        </Stack>
      ) : null}
      {error ? (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert variant="filled" severity="error">
            Please enter all the details!
          </Alert>
        </Stack>
      ) : null}
    </Box>
  );
}

export default UpdateExamForm;
