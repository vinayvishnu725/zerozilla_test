const express = require("express");
const router = express.Router();

const clientAndAgencyController = require("../controllers/client_and_agency_controller")

const jwtTokenController = require("../middleware/jwtToken");

//generateToken
router.post("/generateToken",jwtTokenController.generateToken);

//createAgencyAndClient
router.post("/createAgencyAndClient",jwtTokenController.verifyToken,clientAndAgencyController.createAgencyAndClient);
//updateClient
router.post("/updateClient",jwtTokenController.verifyToken,clientAndAgencyController.updateClient);
//getMaxBillClientAndAgent
router.get("/getMaxBillClientAndAgent",jwtTokenController.verifyToken,clientAndAgencyController.getMaxBillClientAndAgent);

module.exports = router;