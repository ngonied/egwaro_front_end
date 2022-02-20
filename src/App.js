import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./my_components/layout";
import SignIn from "./my_components/sign_in";
import SignUp from "./my_components/sign_up";

const App = () => (
  <Routes>
    <Route exact path="signin/" element={<SignIn />} />
    <Route exact path="signup/" element={<SignUp />} />
    <Route path="/*" element={<Layout />} />
  </Routes>
);

export default App;
