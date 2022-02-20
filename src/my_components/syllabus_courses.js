import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function LevelsList() {
  const [levels, setLevels] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/levels/")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLevels(data);
        console.log(levels);
      });
  }, []);

  return <div> Hello World Futi</div>;
}
