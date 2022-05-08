import { React, useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import { Grid, Card, Divider } from "@mui/material";
import DisplayProduct from "./DisplayProduct";
import { viewProducts } from "../../../Api/ReportersManagementModule/ProductApi";
// const fetchHandler = async () => {
//   return await axios
//     .get("http://localhost:8070/employee/viewProducts")
//     .then((res) => res.data.data)
//     .catch((err) => {
//       console.log(err);
//     });
// };
//------------------

function DisplayProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setProducts(await viewProducts());
    }
    fetchData();
  }, []);

  return (
    <div component="div">
      <Grid container>
        <Grid item md={1}></Grid>
        <Grid item md={11}>
          <Card sx={{ mb: 2, minWidth: 1000 }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "blueviolet" }}>
                    <TableCell align="left">Product ID </TableCell>
                    <TableCell align="left">Product Name</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Team NAme</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
          </Card>
        </Grid>
      </Grid>

      <Grid>
        {products &&
          products.map((tm, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} component="div" key={i}>
                <DisplayProduct product={tm} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

export default DisplayProducts;
