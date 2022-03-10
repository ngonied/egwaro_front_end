import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
//import FormControlLabel from "@mui/material/FormControlLabel";
//import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axiosInstance from "./services/axiosapis";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/">
        eGwaro
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Profile() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   // eslint-disable-next-line no-console
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const [userData, setUserData] = useState(null);
  // data pulled from the server

  const [email, setEmail] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [surname, setSurname] = useState(null);
  const [image, setImage] = useState(null);
  const [firstname, setFirstname] = useState(null);
  var my_dict = {};
  var my_image = null;

  //data to post below
  // const [phone_number1, setPhone1] = useState(null);
  // const [surname1, setSurname1] = useState(null);
  // const [image1, setImage1] = useState(null);
  // const [first_name1, setFirstName1] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const user_data = await axiosInstance.get("/users/profile/");
      setUserData(user_data.data);

      return user_data;
    }
    fetchUserData();
  }, []);

  const navigate = useNavigate();

  const handleClick = (e) => {
    handleSubmit(e);
  };
  // alternatively, create an empty dict
  // onChange adds a key-value pair to the the dict
  //see below

  const handleChange = (event) => {
    my_dict[event.target.name] = event.target.value;
    console.log(my_dict);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = axiosInstance.patch("/users/profile/", my_dict);
      navigate("/profile/");
      return response;
    } catch (error) {
      console.log(error.stack);
    }
  };

  // // setUserData(res.data);
  // // setUserAttr();

  //sx={{ m: 1, bgcolor: "secondary.main" }}

  const handleFileChange = (event) => {
    event.preventDefault();
    console.log(event);
    my_image = event.target.file[0];
    handleFileUpload(my_image);
  };

  const handleFileUpload = (my_image) => {
    const formData = new FormData();
    formData.append("image", my_image, my_image.name);
    axiosInstance.patch("/users/profile/", formData);
  };

  return (
    userData && (
      <ThemeProvider theme={theme}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar
                alt="Profile picture"
                src={userData.image}
                sx={{ width: 90, height: 90 }}
              />

              <Button variant="contained" component="label">
                Change Picture
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={(event) => handleFileChange(event)}
                />
              </Button>

              <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={userData.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      name="phone_number"
                      defaultValue={userData.phone_number}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="first_name"
                      label="First Name"
                      defaultValue={userData.first_name}
                      id="firstName"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="surname"
                      label="Surname"
                      defaultValue={userData.surname}
                      id="firstName"
                      onChange={(e) => handleChange(e)}
                    />
                  </Grid>
                  {/* FIELDS:  */}

                  {/* <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={(event) => handleClick(event)}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </Container>
        </form>
      </ThemeProvider>
    )
  );
}

// const getUserData = async () => {
//   try {
//     await axiosInstance.get(` `).then((res) => {

//       console.log(userData);
//     });
//     // .then((value) => {
//     //   setEmail(userData.email);
//     //   setFirstname(userData.first_name);
//     //   setPhoneNumber(userData.phone_number);
//     //   setSurname(userData.surname);
//     //   setImage(userData.image);
//     // });
//   } catch (error) {
//     console.log("Error: ", JSON.stringify(error, null, 4));
//     throw error;
//   }
// };

// const setUserAttr = () => {
//   setEmail(userData.email);
//   setFirstname(userData.first_name);
//   setPhoneNumber(userData.phone_number);
//   setSurname(userData.surname);
//   setImage(userData.image);
// };

// useEffect(() => {
//   try {
//     getUserData();
//     setUserAttr();
//   } catch (error) {
//     throw error;
//   }
// }, []);
