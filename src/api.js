import express from "express";
import serverless from "serverless-http";
import { generateLightHouseReport } from "./scripts/genrateLightHouseReport.js";

// Create an instance of the Express app
const app = express();

// Create a router to handle routes
const router = express.Router();

// Define a route that responds with a JSON object when a GET request is made to the root path
router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});


router.get("/data", async (req, res) => {

    try {
        let response = await generateLightHouseReport();
        console.log('finished')
        res.json({ data: JSON.parse(response), status: "success" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    // res.json({
    //   hello: "hi!"
    // });
  });  
// Use the router to handle requests to the `/.netlify/functions/api` path
app.use(`/.netlify/functions/api`, router);

// Export the app and the serverless function
export default app;
export const handler = serverless(app);