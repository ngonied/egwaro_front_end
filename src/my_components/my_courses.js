import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Link, Button } from "@mui/material";
// import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

export default function MyCourseCard() {
  const [mycourses, setMyCourses] = useState(null);
  //const navigate = useNavigate();
  //   const location = useLocation();

  useEffect(() => {
    try {
      axiosInstance.get("/my_courses/").then((res) => {
        setMyCourses(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  function display_name(coursename) {
    return coursename.slice(0, 18) + "...";
  }

  return (
    mycourses && (
      <div>
        <Grid container spacing={4} style={{}}>
          {mycourses.map(
            (course) =>
              course.enrolled && (
                <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
                  {" "}
                  <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea
                    // onClick={() => {
                    //   navigate(location.pathname + course.id + "/");
                    // }}
                    >
                      <CardMedia
                        component="img"
                        height="140"
                        image={course.image}
                        alt={course.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {display_name(course.name)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {course.description}
                        </Typography>
                        <Typography>Subject: {course.subject_name}</Typography>
                      </CardContent>
                    </CardActionArea>
                    {/* <Button variant="contained" sx={{ margin: "auto" }}>
                      Continue
                    </Button> */}
                  </Card>
                </Grid>
              )
          )}
        </Grid>
        {/* <Outlet /> */}
      </div>
    )
  );
}
