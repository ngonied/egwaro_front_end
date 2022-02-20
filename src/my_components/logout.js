import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./services/axiosapis";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    // this.redirectAfterLogOut = this.redirectAfterLogOut.bind(this);
  }

  async handleLogout() {
    try {
      const response = await axiosInstance.post("logout/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;

      return response;
    } catch (e) {
      console.log(e);
    }
  }

  //   redirectAfterLogOut() {
  //     navigate = useNavigate();
  //     navigate("signin/");
  //   }

  componentDidMount() {
    this.handleLogout();
  }

  render() {
    return (
      <div>
        <Typography variant="h2">e-Gwaro</Typography>
        <Typography variant="h5">logging out</Typography>
      </div>
    );
  }
}
export default Logout;
