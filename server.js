const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

const app = express();

app.use(cors());

app.use(express.json());

// middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/user", require("./routes/userRoutes"));
// app.use("https://doctor-appointment-management-system-1.onrender.com", require("./routes/userRoutes"));

const port = 9090 || process.env.PORT
//listen port
app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`)
})