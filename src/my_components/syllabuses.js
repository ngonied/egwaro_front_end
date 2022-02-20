import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

export default function SyllabusList() {
  const [syllabuslist, setSyllabusList] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/syllabuses/")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSyllabusList(data);
  //     });
  // }, []);

  useEffect(() => {
    try {
      axiosInstance.get("/syllabuses/").then((res) => {
        setSyllabusList(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  return (
    syllabuslist && (
      <div>
        <Grid container spacing={4} style={{}}>
          {syllabuslist.map((syllabus) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={syllabus.id}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => {
                    navigate(location.pathname + syllabus.name + "/");
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={syllabus.logo}
                    alt={syllabus.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {syllabus.name}
                    </Typography>
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
