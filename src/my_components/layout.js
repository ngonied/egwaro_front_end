import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShowChart from "@material-ui/icons/ShowChart";
import MailIcon from "@material-ui/icons/Mail";
// import CoursesReviewCard from "./my_components/courses";
import EventNote from "@material-ui/icons/EventNote";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Group from "@material-ui/icons/Group";
import Book from "@material-ui/icons/Book";
import Person from "@material-ui/icons/Person";
import Flag from "@material-ui/icons/Flag";
import Category from "@material-ui/icons/Category";
import SyllabusesList from "./syllabuses";
import axiosInstance from "./services/axiosapis";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { useNavigate } from "react-router-dom";

import SubjectCard from "./AllSubjects";
import CoursePreviewCard from "./courses";
import TopicPreviewCard from "./topics";
import LevelsView from "./levels";
import TopicDetail from "./topicdetail";
import MyCourseCard from "./my_courses";
import Profile from "./profile";
import Logout from "./logout";
import CourseDetail from "./course_detail";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
    color: theme.palette.text.secondary,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate("/signin/");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            e-Gwaro
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {["My Profile", "My Courses", "Assignments", "Discussions"].map(
            (text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            )
          )} */}
          <ListItem button component={Link} to="profile/">
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItem>

          <ListItem button component={Link} to="my_courses/">
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary={"My Courses"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <EventNote />
            </ListItemIcon>
            <ListItemText primary={"My Assignments"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Group />
            </ListItemIcon>
            <ListItemText primary={"My Discussions"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="syllabuses/">
            <ListItemIcon>
              <Flag />
            </ListItemIcon>

            <ListItemText primary={"Syllabuses"} />
          </ListItem>
          <ListItem button component={Link} to="kanji/">
            <ListItemIcon>
              <Category />
            </ListItemIcon>

            <ListItemText primary={"Subjects"} />
          </ListItem>

          <ListItem button component={Link} to="courses/">
            <ListItemIcon>
              <Book />
            </ListItemIcon>

            <ListItemText primary={"Explore Courses"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* {["Statistics", "Messages", "Tutors"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem button>
            <ListItemIcon>
              <ShowChart />
            </ListItemIcon>
            <ListItemText primary={"Statistics"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={"Messages"} />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary={"My Tutors"} />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button component={Link} to="logout/">
            <ListItemIcon>
              <Book />
            </ListItemIcon>

            <ListItemText primary={"Log out"} />
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {/* Routes go here */}

        <Routes>
          <Route path="profile/" element={<Profile />} />
          <Route path="logout" element={<Logout />} />
          <Route path="courses/" element={<CoursePreviewCard />} />
          <Route path="my_courses/" element={<MyCourseCard />} />
          <Route path="courses/:course_id/" element={<CourseDetail />} />

          <Route path="syllabuses/" element={<SyllabusesList />} />
          <Route path="syllabuses/:syllabus/" element={<LevelsView />} />
          <Route path="syllabuses/:syllabus/:id/" element={<SubjectCard />} />
          <Route
            path="syllabuses/:syllabus/:id/:code/"
            element={<CoursePreviewCard />}
          />
          <Route
            path="syllabuses/:syllabus/:id/:code/:course_id"
            element={<TopicPreviewCard />}
          />
          <Route
            path="syllabuses/:syllabus/:id/:code/:course_id/:pk/"
            element={<TopicDetail />}
          />
          <Route path="kanji/" element={<SubjectCard />} />
          <Route
            path="*"
            element={
              <Typography variant="h5">
                Ooops, I'm confused, there's nothing here
              </Typography>
            }
          />
          {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        </Routes>
      </Box>
    </Box>
  );
}
