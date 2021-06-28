var express = require("express");
var router = express.Router();

var tickesRouter = require("./tickes/index");


router.use("/tickes", tickesRouter);

module.exports = router;