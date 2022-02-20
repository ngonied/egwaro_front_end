import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  Typography,
  CardContent,
} from "@mui/material";
import axiosInstance from "./services/axiosapis";

export default function LevelsView() {
  const location = useLocation();
  const [levels, setLevels] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axiosInstance.get(location.pathname).then((res) => {
        setLevels(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  return (
    levels && (
      <div>
        <Grid container spacing={4} style={{}}>
          {levels.map((level) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={level.id}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => {
                    navigate(location.pathname + level.id + "/");
                  }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {level.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* <Outlet /> */}
      </div>
    )
  );
}
