import { Box, Grid } from "@mui/material";
import React, { useState } from "react";
import AllEmployees from "../../../Components/ReportersManagementModule/DisplayEmployees/AllEmployees";
import DisplayProfile from "../../../Components/ReportersManagementModule/DisplayEmployees/DisplayProfile";

function DisplayAllEmployees({ profiles }) {
  const [employee, setEmployee] = useState(profiles[0]);

  return (
    <Box sx={{ backgroundColor: "#d7dde0", padding: 2 }}>
      <Grid container>
        <Grid item md={4} xs={12}>
          <AllEmployees setEmployee={setEmployee} profiles={profiles} />
        </Grid>
        <Grid item md={8} xs={12} sx={{ padding: 1 }}>
          {employee && <DisplayProfile employee={employee} />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default DisplayAllEmployees;
