import express from "express";
const app = express();
const port = 3000;
import appRoot from "app-root-path";

app.use(express.static("dist"));
app.use(express.static("assets"));

app.get("/", (req, res) => res.sendFile(appRoot + "/src/index.html"));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
