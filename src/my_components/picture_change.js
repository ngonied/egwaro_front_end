// import React, { useState, useEffect } from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// //import FormControlLabel from "@mui/material/FormControlLabel";
// //import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import axiosInstance from "./services/axiosapis";
// import { useNavigate } from "react-router-dom";

// const theme = createTheme();

// export default function ChangeButton() {
//   const handleFileChange = (event) => {
//     event.preventDefault();
//     console.log(event);
//     my_image = event.target.file[0];
//     handleFileUpload(my_image);
//   };

//   const handleFileUpload = (my_image) => {
//     const formData = new FormData();
//     formData.append("image", my_image, my_image.name);
//     axiosInstance.patch("/users/profile/", formData);
//   };

//   return (
//     <Button variant="contained" component="label">
//       Change Picture
//       <input
//         type="file"
//         name="image"
//         hidden
//         onChange={(event) => handleFileChange(event)}
//       />
//     </Button>
//   );
// }
//export default function Profile() {
// const handleSubmit = (event) => {
//   event.preventDefault();
//   const data = new FormData(event.currentTarget);
//   // eslint-disable-next-line no-console
//   console.log({
//     email: data.get("email"),
//     password: data.get("password"),
//   });
// };
