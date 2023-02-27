const express = require("express");
const app = express();
const moongoose = require("mongoose");
const dotenv = require ("dotenv");
const helmet = require ("helmet");
const morgan = require ("morgan");
const bodyParser = require("body-parser")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts");
dotenv.config()
require('./config/moongoose.config');
app.use(express.json())
app.use(helmet());
app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts", postRoute);

app.listen(8800,()=>{
    console.log("Backend server is running")
})