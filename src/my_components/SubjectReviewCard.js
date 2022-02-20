import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import axiosInstance from "./services/axiosapis";

export default function SubjectReviewCard({ syllabus_name }) {
  const [subjects, setSubjects] = useState(null);
  const syllabus_arg = syllabus_name + "/";

  // useEffect(() => {
  //   fetch(
  //     "http://127.0.0.1:8000/syllabuses/" +
  //       new URLSearchParams({ syllabus: syllabus_arg })
  //   )
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setSubjects(data);
  //       console.log(subjects);
  //     });
  // }, []);
  useEffect(() => {
    try {
      axiosInstance
        .get(
          "http://127.0.0.1:8000/syllabuses/" +
            new URLSearchParams({ syllabus: syllabus_arg })
        )
        .then((res) => {
          setSubjects(res.data);
        });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  return (
    subjects && (
      <div>
        {subjects.map((subject) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="/static/images/cards/contemplative-reptile.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {subject.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    )
  );
}

// fetch('https://example.com?' + new URLSearchParams({
//     foo: 'value',
//     bar: 2,
// }))
