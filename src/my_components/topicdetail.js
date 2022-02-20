import { React, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import { Button, Grid } from "@mui/material";
// import ReactPlayer from "react-player";
import YouTube from "react-youtube";
import axiosInstance from "./services/axiosapis";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 1500,
//     [theme.breakpoints.up("sm")]: {
//       width: 550,
//     },

//     [theme.breakpoints.up("md")]: {
//       width: 900,
//     },

//     [theme.breakpoints.up("lg")]: {
//       width: 1200,
//     },

//     [theme.breakpoints.up("xl")]: {
//       width: 1870,
//     },
//   },
// }));

export default function TopicDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [topicdetail, setTopicdetail] = useState(null);
  // const [url, setUrl] = useState(null);
  //const url =
  //"https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf"
  // const classes = useStyles();

  useEffect(() => {
    try {
      axiosInstance.get(location.pathname).then((res) => {
        setTopicdetail(res.data);
      });
    } catch (error) {
      console.log("Error: ", JSON.stringify(error, null, 4));
      throw error;
    }
  }, []);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }
  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  const widthStyle = {
    width: 1024,
    "@media max-width: 900": {
      width: 300,
    },
    "@media orientation: landscape": {
      width: 400,
    },
  };

  return (
    topicdetail && (
      <div>
        <p variant="h4">{topicdetail.name}</p>
        <div>
          <YouTube videoId={topicdetail.video} xs={6} sm={6} md={6} lg={6} />
        </div>

        <Grid item className="main" xs={12} sm={12} md={12} lg={12} id="viewer">
          <Document
            file={topicdetail.file1}
            onLoadSuccess={onDocumentLoadSuccess}
            style={{ textAlign: "center" }}
          >
            <Page pageNumber={pageNumber} size="A4" width={widthStyle.width} />
          </Document>
          <div>
            <div className="pagec">
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </div>
            <div className="buttonc">
              <Button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="Pre"
                variant="outlined"
              >
                Previous
              </Button>
              <Button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
                variant="outlined"
              >
                Next
              </Button>
            </div>
          </div>
        </Grid>
      </div>
    )
  );
}
