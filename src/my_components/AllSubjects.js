import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

export default function SubjectCard() {
  const [allsubjects, setAllSubjects] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(location.pathname)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setAllSubjects(data);
  //     });
  // }, []);
  useEffect(() => {
    try {
      axiosInstance.get(location.pathname).then((res) => {
        setAllSubjects(res.data);
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
    allsubjects && (
      <div>
        <Grid container spacing={4} style={{}}>
          {allsubjects.map((subject) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={subject.id}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => {
                    navigate(location.pathname + subject.code + "/");
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={subject.image}
                    alt={subject.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {subject.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {subject.description}
                    </Typography>
                    <Typography>Syllabus: {subject.syllabus_name}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
}
