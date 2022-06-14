import React from "react";
import { Grid, Button,Box} from "@mui/material";
import {Link} from 'react-router-dom'
import ViewAllProducts from "../../../Components/ReportersManagementModule/ProductDisplay/ViewAllProducts";
function ProductPage() {
  return (
    <div>
      <Box padding={4}>
      <Grid item sm={12} md={12} sx={{ mb: 3 }}>
        <Grid container>
          <Grid item md={6}>
          <Link to="/products/create">
          <Button type="button" variant="contained" sx={{backgroundColor:"#183d78"}} >
           Create New Product
          </Button>
        </Link>
          </Grid>
          <Grid item md={6}>
            {/* <SearchProduct /> */}
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} sx={{ mb: 2 }}>
        {/* <DisplayProducts /> */}
        <ViewAllProducts/>
      </Grid>
      </Box>
    </div>
  );
}

export default ProductPage;
