var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));

// Allow CORS for API routes
app.use(cors({
  origin: ["http://localhost:5173", "https://magicshot-ai-pink.vercel.app/"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
    },
  })
);

module.exports = app;
