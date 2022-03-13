import { React, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import axiosInstance from "./services/axiosapis";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { Button, CardActionArea, CardActions } from "@mui/material";

export default function SubjectDetailView(props) {
  const location = useLocation();
  const [fetchedUserData, setFetchedUserData] = useState(null);

  useEffect(() => {
    async function GetSubjectData() {
      const subjectData = await axiosInstance.get(location.pathname);
      setFetchedUserData(subjectData.data);
      return subjectData;
    }
    GetSubjectData();
  }, []);

  return (
    fetchedUserData && (
      <div>
        <Typography variant="h4"></Typography>
        <Grid container spacing={4}>
          {fetchedUserData.map((course) => (
            <Grid item sx={12} sm={6} md={4} lg={3}>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={course.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {course.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {course.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Enrol
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  );
}
