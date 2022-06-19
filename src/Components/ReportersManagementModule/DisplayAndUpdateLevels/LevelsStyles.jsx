import { makeStyles } from "@mui/styles";
import { margin } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  button: {
    mt: 2,
    backgroundColor: "#183d78",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#4d5575",
      color: "#fff",
    },
    // display:"flex",
    // justifyContent:"center"
  },
  paper: {
    color: "#183d78",
    fontWeight: "bold",
    padding:25,
    backgroundColor:"#58a9cc",
    marginTop:8,
    maxWidth:250,
    minWidth:250,
    minHeight:300,
    maxHeight:400,
    display:"flex"
    
    
  },
}));
export default useStyles;
