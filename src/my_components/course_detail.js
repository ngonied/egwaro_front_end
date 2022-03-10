import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "./services/axiosapis";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ArrowRight from "@material-ui/icons/ArrowRight";
// course key points gets key points
//topics gets topics in course
//course overview are just that

function TopicList(props) {
  const foundTopics = props.data;
  return (
    foundTopics && (
      <div>
        {foundTopics.map((topic) => (
          <div>
            <Typography variant="h5">{topic.name}</Typography>
            <Typography>Description: {topic.description}</Typography>
          </div>
        ))}
      </div>
    )
  );
}

function CourseKeyPoints(props) {
  const foundKeyPoints = props.data;
  return (
    foundKeyPoints && (
      <div>
        {foundKeyPoints.map((keypoint) => (
          <div>
            <Typography>
              <ArrowRight />
              {keypoint.description}
            </Typography>{" "}
            <Typography>{keypoint.covered}</Typography>{" "}
            <Typography>{keypoint.average_course_score}</Typography>
          </div>
        ))}
      </div>
    )
  );
}

function handleEnrol(event, course) {
  event.preventDefault();
  try {
    axiosInstance.post("/enrol/", { course: course });
  } catch (error) {
    alert(error);
  }
}

function EnrolButton(props) {
  const course = props.course;
  return (
    <Button
      onClick={(e) => {
        handleEnrol(e, course);
      }}
      variant="contained"
    >
      Enrol
    </Button>
  );
}
function CourseDetail() {
  const location = useLocation();
  const [courseData, setCourseData] = useState({
    id: "",
    name: "",
    image: "",
    description: "",
    subject: "",
    created_by: "",
    subject_name: "",
    written_by: "",
    enrolled: false,
  });

  const [topics, setTopics] = useState(null);
  const [keyPoints, setKeyPoints] = useState(null);

  useEffect(() => {
    async function fetchData() {
      console.log(location.pathname);
      const result = await axiosInstance.get(location.pathname);
      const newCourseData = result.data;
      setCourseData(newCourseData);
      console.log(courseData);
      return result;
    }
    async function loadTopics() {
      const get_topics = await axiosInstance.get(
        location.pathname + "topiclist/"
      );
      setTopics(get_topics.data);
      console.log(get_topics.data);
    }
    async function getKeyPoints() {
      const get_key_points = await axiosInstance.get(
        location.pathname + "keypoints/"
      );
      setKeyPoints(get_key_points.data);
    }
    fetchData();
    loadTopics();
    getKeyPoints();
  }, [courseData]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "50vh" }}
    >
      <Grid xs={12}>
        <div>
          <Typography variant="h3">{courseData.name}</Typography>
          <Typography> </Typography>
          <Typography variant="h6"> {courseData.subject_name}</Typography>
          <Typography> </Typography>
          <Typography variant="h4">Overview</Typography>
          <Typography> </Typography>
          <Typography>{courseData.description}</Typography>
        </div>

        <div>
          <Typography variant="h5">
            Here are topics I found on this course
          </Typography>
          <TopicList data={topics} />
        </div>
        <div>
          <Typography variant="h5">Learning objectives:</Typography>
          <CourseKeyPoints data={keyPoints} />
        </div>
        {courseData.enrolled ? (
          <Typography>You are enrolled for this course.</Typography>
        ) : (
          <EnrolButton course={courseData.id} />
        )}
      </Grid>
    </Grid>
  );
}
export default CourseDetail;
