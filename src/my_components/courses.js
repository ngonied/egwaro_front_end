import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Link, Button } from "@mui/material";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

export default function CoursePreviewCard() {
  const [allcourses, setAllCourses] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   fetch(location.pathname)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAllCourses(data);
  //       console.log(allcourses);
  //     });
  // }, []);
  useEffect(() => {
    try {
      axiosInstance.get(location.pathname).then((res) => {
        setAllCourses(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  function display_name(coursename) {
    return coursename.slice(0, 18) + "...";
  }

  function get_course_id(course) {
    return course.id;
  }

  function handleEnrol(event, course_name) {
    event.preventDefault();
    try {
      axiosInstance.post("/enrol/", { course: course_name });
    } catch (error) {
      alert(error);
    }
  }

  return (
    allcourses && (
      <div>
        <Grid container spacing={4} style={{}}>
          {allcourses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course.id}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => {
                    navigate(location.pathname + course.id + "/");
                  }}
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
                    <Typography>Enrolled: {course.enrolled}</Typography>
                  </CardContent>
                </CardActionArea>
                <Button
                  variant="contained"
                  sx={{ margin: "auto" }}
                  onClick={(e) => handleEnrol(e, get_course_id(course))}
                  // onClick={() => {
                  //   axios
                  //     .post("http://127.0.0.1:8000/enrol/", {course : course})
                  //     .then((response) => {
                  //       console.log(response.status);
                  //       console.log(response.data);
                  //     });
                  // }}
                >
                  Start Course
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Outlet /> */}
      </div>
    )
  );
}
