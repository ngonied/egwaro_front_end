import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Link } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

export default function TopicPreviewCard() {
  const [topics, setTopics] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axiosInstance.get(location.pathname).then((res) => {
        setTopics(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  return (
    topics && (
      <div>
        <Grid container spacing={4} style={{}}>
          {topics.map((topic) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={topic.id}>
              {" "}
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea
                  onClick={() => {
                    navigate(location.pathname + topic.id + "/");
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={topic.image}
                    alt={topic.name}
                  />
                  <CardContent>
                    <Typography>{topic.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {topic.description}
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
