import app from "../src/app";
import ServerlessHttp from "serverless-http";
import combinedRouter from "../src/routers";

app.use('/.netlify/functions/api', combinedRouter)
module.exports.handler = ServerlessHttp(app)