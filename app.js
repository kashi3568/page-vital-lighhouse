import express, { json } from "express";
const app = express();
import { schedule } from 'node-cron';
//middleware
app.use(json());
import urlRequest from "./routes/UrlRoutes.js";
import pageVitalsRoute from "./routes/PageVitalRoutes.js";
import axios from 'axios';

import pkg from 'mongoose';
const { connect, connection } = pkg;
//configure mongoose
connect(process.env.MONGODB_URI || "mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});
 
app.listen(3004, () => {
  console.log("Server is running on port 3004");
});

schedule('0 3 * * *', () => {
  console.log('running a task every minute');
  // axios.get('http://localhost:3004/api/pageVitals/generateData').then((res)=> {
  //   console.log(res)
  // })
  console.log('running a task every minute');
});
app.use("/api/urls", urlRequest);
app.use("/api/pageVitals", pageVitalsRoute);
export default app;